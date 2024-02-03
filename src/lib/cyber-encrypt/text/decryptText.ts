// FILE: text\decryptText.ts

import CryptoJS from "crypto-js";

import {
  CYBER_ENCRYPT_STR_PLUS,
  CYBER_ENCRYPT_STR_BACKSLASH,
  CYBER_ENCRYPT_STR_EQUAL,
  CYBER_ENCRYPT_PASS_KEY,
  CYBER_ENCRYPT_KEY_SIZE,
  CYBER_ENCRYPT_ITERATIONS,
} from "../core/config";

/**
 * Decrypts a string that was encrypted using the `encryptText()` function.
 *
 * @param text The encrypted string.
 * @returns The decrypted string.
 */
export const decryptText: (text: string) => string = (text: string) => {
  // Split the string into its component parts.
  const transitmessage = text
    .toString()
    .replace(new RegExp(`${CYBER_ENCRYPT_STR_PLUS}`, "g"), "+")
    .replace(new RegExp(`${CYBER_ENCRYPT_STR_BACKSLASH}`, "g"), "/")
    .replace(new RegExp(`${CYBER_ENCRYPT_STR_EQUAL}`, "g"), "=");

  const salt = CryptoJS.enc.Hex.parse(transitmessage.substring(0, 32 + 0));
  const iv = CryptoJS.enc.Hex.parse(transitmessage.substring(32, 32 + 32));
  const encrypted = transitmessage.substring(64);

  // Generate a key from the salt and password.
  const key = CryptoJS.PBKDF2(CYBER_ENCRYPT_PASS_KEY, salt, {
    keySize: CYBER_ENCRYPT_KEY_SIZE / 32,
    iterations: CYBER_ENCRYPT_ITERATIONS,
  });

  // Decrypt the text using the key and IV.
  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  // Convert the decrypted text to a string.
  return decrypted.toString(CryptoJS.enc.Utf8);
};
