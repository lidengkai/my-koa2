import * as dao from '../dao/user';
import { PWD_CIPHER, PWD_IV } from '~lib/config';
import { encode } from '~lib/utils/password';

export const login = async (opts: { username: string; password: string }) => {
  const { username, password } = opts;
  return await dao.auth({
    username,
    password: password && encode(password, PWD_CIPHER, PWD_IV),
  });
};

export const info = async (id: number) => {
  return await dao.get(id);
};
