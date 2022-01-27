import { IncomingHttpHeaders } from 'http';

export default (origin?: string, headers?: IncomingHttpHeaders) => {
  return origin ?? '*';
};
