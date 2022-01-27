import Router from 'koa-router';
import { env } from '../../lib/config';
import { doExec } from '../../lib/utils/exec';

const router = new Router();

// 本地开发禁用
if (env) {
  router.get('/system/webhook', async (ctx) => {
    const res = await doExec('git pull');
    ctx.response.body = res.message;
  });
}

export default router;
