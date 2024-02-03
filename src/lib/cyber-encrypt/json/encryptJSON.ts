// FILE: json\encryptJSON.ts

import { encryptText } from "../text/encryptText";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const encryptJSON = (json: unknown): any => {
  return encryptText(JSON.stringify(json));
};
