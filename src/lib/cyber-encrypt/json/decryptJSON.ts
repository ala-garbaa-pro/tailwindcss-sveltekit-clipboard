// FILE: json\decryptJSON.ts

import { decryptText } from "../text/decryptText";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const decryptJSON = (text: string): any => {
  const obj: string = decryptText(text);

  const returnValue = JSON.parse(obj) as JSON;

  return returnValue;
};
