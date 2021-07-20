const parseJWT = (token: string) => {
    const base64Url = token.split('.')[1]; // token you get
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
    return decodedData;
};

export default parseJWT;
