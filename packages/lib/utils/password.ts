import { createCipheriv, createDecipheriv } from 'crypto';

/** 加密 */
export const encode = (str: string, key: Buffer, iv: Buffer) => {
  const cipher = createCipheriv('aes-128-cbc' as any, key as any, iv as any);
  let enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
};

/** 解密 */
export const decode = (str: string, key: Buffer, iv: Buffer) => {
  const decipher = createDecipheriv('aes192' as any, key as any, iv as any);
  let dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};
