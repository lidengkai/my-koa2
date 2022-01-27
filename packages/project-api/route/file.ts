import Router from 'koa-router';
import * as server from '../server/file';
import checkLogin from '~lib/utils/checkLogin';
import { readFileForm } from '~lib/utils/file';

const router = new Router({
  prefix: '/api/file',
});

router.use(checkLogin);

router.post('/upload', async (ctx) => {
  const { files } = await readFileForm(ctx.req);
  ctx.response.body = await server.upload(files.file as any);
});

export default router;
