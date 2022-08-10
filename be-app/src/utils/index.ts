import * as Minio from 'minio';
import { S3 } from 'aws-sdk';
import jwt from 'jsonwebtoken';
import * as url from 'url';
import * as crypto from 'crypto';
import config from '../../config/env';
const { aws } = config;

export const s3 = new S3({
  region: aws.region,
  endpoint: aws.endpoint,
  s3ForcePathStyle: true, // needed with minio?
  credentials: {
    accessKeyId: aws.accessKey,
    secretAccessKey: aws.secretKey,
  },
});

const minioClient = new Minio.Client({
  endPoint: aws.host,
  port: aws.port,
  useSSL: false,
  accessKey: aws.accessKey,
  secretKey: aws.secretKey,
});

const generateAvatarCode = (payload: any, secretKey: string) => {
  let code = jwt.sign(payload.toString(), secretKey).split('.')[2];
  code = code.replace(/[^a-zA-Z0-9]/g, '');
  return payload;
};

const createPathImage = (str: string) => {
  return `wsm/avatar/${str}`;
};

const createPathPublic = (objectName: string) => {
  if (process.env.NODE_ENV === 'production') {
    return `https://${aws.host}/${aws.bucket}/${objectName}`;
  }
  return `${aws.endpoint}/${aws.bucket}/${objectName}`;
};

const generateS3Url = (bucket: string, key: string): string => {
  return `${aws.endpoint}/${bucket}/${key}`;
};

const signedUrl = async (
  bucket: string,
  key: string,
  fileName: string,
  fileType: string,
  extras?: Record<string, any>,
): Promise<Record<string, any>> => {
  const s3url = generateS3Url(bucket, key);
  const params = {
    Bucket: bucket,
    Key: key,
    Expires: 60,
    ContentType: fileType,
  };

  const data = await s3.getSignedUrlPromise('putObject', params);

  const actionUrl = `${aws.endpoint}/${bucket}`;
  const signedData = url.parse(data, true).query;
  signedData.key = key;
  signedData['Content-Type'] = fileType;
  signedData.filename = fileName;
  const result = {
    actionUrl: actionUrl,
    signedRequest: data,
    signedData: signedData,
    url: s3url,
  };

  if (extras) {
    for (const attributeName in extras) {
      result[attributeName] = extras[attributeName];
    }
  }

  const secretKey = aws.secretKey;

  return signPolicy(bucket, fileType, fileName)(result, secretKey);
};

const signPolicy = (bucket: string, contentType: string, fileName: string) => {
  return function (result: Record<string, any>, secretKey: string): Record<string, any> {
    const date = new Date();
    date.setSeconds(date.getSeconds() + 60);
    const key = result.signedData.key;
    const s3Policy = {
      expiration: date.toISOString(),
      conditions: [
        { bucket: bucket },
        { key: key },
        { 'Content-Type': contentType },
        ['starts-with', '$expires', ''],
        { filename: fileName },
      ],
    };

    // stringify and encode the policy
    const stringPolicy = JSON.stringify(s3Policy);
    const base64Policy = Buffer.from(stringPolicy, 'utf-8').toString('base64');

    // sign the base64 encoded policy
    const signature = crypto.createHmac('sha1', secretKey).update(Buffer.from(base64Policy, 'utf8')).digest('base64');

    delete result.signedData.Signature; // removes the signature field from the signed url response
    result.signedData.policy = base64Policy;
    result.signedData.signature = signature;

    return result;
  };
};

const putObject = async (fileName: string, fileType: string, code: string) => {
  const result = await signedUrl(aws.bucket, `avatar/${code}/${fileName}`, fileName, fileType);

  return result;
};

const setObjectPolicy = async (pathObject: string) => {
  const { bucket } = aws;
  pathObject = `${pathObject}/*`;

  const rule = {
    Action: ['s3:GetObject', 's3:PutObject'],
    Effect: 'Allow',
    Principal: {
      AWS: '*',
    },
    Resource: `arn:aws:s3:::${pathObject}`,
  };

  const defaultPolicyJsonStr = JSON.stringify({
    Version: '2012-10-17',
    Statement: [rule],
  });

  try {
    const oldPolicy = await minioClient.getBucketPolicy(bucket);

    const newPolicy = JSON.parse(oldPolicy);
    const indexRule = newPolicy.Statement.findIndex((m: { Resource: string }) => m.Resource == rule.Resource);
    if (indexRule < 0) {
      newPolicy.Statement.push(rule);
    } else {
      newPolicy.Statement[indexRule] = rule;
    }
    await minioClient.setBucketPolicy(bucket, JSON.stringify(newPolicy));
  } catch (e) {
    await minioClient.setBucketPolicy(bucket, defaultPolicyJsonStr);
    console.log(e);
  }
};

export default {
  minioClient,
  generateAvatarCode,
  createPathImage,
  createPathPublic,
  setObjectPolicy,
  putObject,
  s3,
};
