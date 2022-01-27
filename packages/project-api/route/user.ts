import Router from 'koa-router';
import * as server from '../server/user';
import checkLogin from '~lib/utils/checkLogin';
import * as formatter from '~lib/utils/formatter';
import * as result from '~lib/utils/result';

const router = new Router({
  prefix: '/api/user',
});

router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body || ({} as any);
  const info = await server.login({
    username: formatter.toString(username),
    password: formatter.toString(password),
  });
  if (info) {
    ctx.session!.user_id = info.id;
    ctx.response.body = result.success(info);
  } else {
    ctx.response.body = result.error('用户名或密码错误');
  }
});

router.get('/logout', async (ctx) => {
  ctx.session!.user_id = null;
  ctx.response.body = result.success();
});

router.use(checkLogin);

router.get('/info', async (ctx) => {
  const { user_id } = ctx.session!;
  const info = await server.info(formatter.toNumber(user_id));
  ctx.response.body = info ? result.success(info) : result.error();
});

export default router;
