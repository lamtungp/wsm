import * as express from 'express';

declare global {
  namespace Express {
    export interface Response {
      success(data: null): any;
    }
  }
}

express.response.success = function () {
  return this.json({});
};
