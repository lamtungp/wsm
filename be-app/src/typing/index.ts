// declare namespace Express {
//   export interface Response {
//     responseSuccess(data: any): this;
//   }
// }

import { response } from 'express';

// augment the `express-serve-static-core` module
declare module 'express-serve-static-core' {
  // first, declare that we are adding a method to `Response` (the interface)
  export interface Response {
    success(data: any): this;
  }
}

response.success = function (data) {
  return this.json({ errors: null, data: data });
};
