
import crypto from 'crypto';

export const SHA512 = (data)=> {
  const hash = crypto.createHash('sha512');
  hash.update(data);
  return hash.digest('hex');
}

export const hashPassword = (pass) => SHA512(pass + '!record-shop')
