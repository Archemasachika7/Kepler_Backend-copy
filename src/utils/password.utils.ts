import crypto from "crypto";

const SALT_LENGTH = 16;
const KEY_LENGTH = 64;
const SCRYPT_COST = 32768;

export const hashPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(SALT_LENGTH).toString("hex");
    crypto.scrypt(password, salt, KEY_LENGTH, { N: SCRYPT_COST }, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(`${salt}:${derivedKey.toString("hex")}`);
    });
  });
};

export const verifyPassword = (password: string, storedHash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const [salt, hash] = storedHash.split(":");
    if (!salt || !hash) return resolve(false);
    crypto.scrypt(password, salt, KEY_LENGTH, { N: SCRYPT_COST }, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(crypto.timingSafeEqual(Buffer.from(hash, "hex"), derivedKey));
    });
  });
};
