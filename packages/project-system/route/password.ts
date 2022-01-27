import Router from 'koa-router';
import { env, PWD_CIPHER, PWD_IV } from '~lib/config';
import { encode } from '~lib/utils/password';
import * as formatter from '~lib/utils/formatter';

const router = new Router();

// 本地开发启用
if (!env) {
  router.get('/system/password', async (ctx) => {
    const { query } = ctx.request.query || {};
    const str = formatter.toString(query).trim();
    ctx.response.body = str && encode(str, PWD_CIPHER, PWD_IV);
  });
}

export default router;
