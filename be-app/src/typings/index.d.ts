import { Response, response } from 'express';

declare module 'express' {
  export interface Response {
    success(data: any): this;
  }
}
