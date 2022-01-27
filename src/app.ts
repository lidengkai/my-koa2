import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import json from 'koa-json';
import koaStatic from 'koa-static-server';
import koaSession from 'koa-session';
import koaCors from 'koa2-cors';
import koaError from 'koa-json-error';
import path from 'path';
import 'project-api/model/Test';
import 'project-api/model/User';
import { session, publicPath, rootPath } from '~lib/config';
import checkOrigin from '~lib/utils/checkOrigin';
import tableRoute from 'project-system/route/table';
import passwordRoute from 'project-system/route/password';
import webhookRoute from 'project-system/route/webhook';
import fileRoute from 'project-api/route/file';
import userRoute from 'project-api/route/user';
import testRoute from 'project-api/route/test';

export default async () => {
  const app = new koa();

  app.use(
    koaError({
      postFormat: (e) => {
        return {
          code: e.status,
          message: e?.message,
          data: null,
        };
      },
    })
  );

  app.use(
    koaCors({
      origin: (ctx) => checkOrigin(ctx.request.headers.origin),
      maxAge: 5,
      credentials: true,
    })
  );

  app.use(
    koaStatic({
      rootDir: publicPath,
      rootPath: '/public',
    })
  );

  app.use(
    koaStatic({
      rootDir: path.join(rootPath, '../my-react/project-demo/dist'),
      rootPath: '/my-react/demo',
    })
  );

  app.use(
    koaStatic({
      rootDir: path.join(rootPath, '../my-react/container/dist'),
      rootPath: '/my-react',
    })
  );

  app.use(bodyparser());
  app.use(json());
  app.use(logger());

  app.keys = session.keys;
  app.use(koaSession(session.options, app));

  app.use(tableRoute.routes());
  app.use(passwordRoute.routes());
  app.use(webhookRoute.routes());
  app.use(fileRoute.routes());
  app.use(userRoute.routes());
  app.use(testRoute.routes());

  app.use(async (ctx) => {
    ctx.response.status = 404;
  });

  app.on('error', async (e) => {
    console.log('[error]', e);
  });

  return app;
};
