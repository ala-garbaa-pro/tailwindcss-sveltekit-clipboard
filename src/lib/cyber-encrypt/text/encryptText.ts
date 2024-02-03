// FILE: text\encryptText.ts

import CryptoJS from "crypto-js";

import {
  CYBER_ENCRYPT_ITERATIONS,
  CYBER_ENCRYPT_PASS_KEY,
  CYBER_ENCRYPT_KEY_SIZE,
  CYBER_ENCRYPT_STR_PLUS,
  CYBER_ENCRYPT_STR_BACKSLASH,
  CYBER_ENCRYPT_STR_EQUAL,
} from "../core/config";

/**
 * Encrypts a string using the PBKDF2 algorithm.
 *
 * @param text The string to encrypt.
 * @returns The encrypted string.
 */
export const encryptText: (text: string) => string = (text: string) => {
  // Generate a random salt.
  const salt = CryptoJS.lib.WordArray.random(128 / 8);

  // Generate a key from the salt and password.
  const key = CryptoJS.PBKDF2(CYBER_ENCRYPT_PASS_KEY, salt, {
    keySize: CYBER_ENCRYPT_KEY_SIZE / 32,
    iterations: CYBER_ENCRYPT_ITERATIONS,
  });

  // Generate a random IV.
  const iv = CryptoJS.lib.WordArray.random(128 / 8);

  // Encrypt the text using the key and IV.
  const encrypted = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  // Combine the salt, IV, and encrypted text into a single string.
  const transitmessage = salt.toString() + iv.toString() + encrypted.toString();

  // Replace any special characters in the string with their corresponding escape sequences.
  return transitmessage
    .toString()
    .replace(/\+/g, CYBER_ENCRYPT_STR_PLUS)
    .replace(/\//g, CYBER_ENCRYPT_STR_BACKSLASH)
    .replace(/=/g, CYBER_ENCRYPT_STR_EQUAL);
};
