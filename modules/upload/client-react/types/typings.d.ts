declare namespace mime {
  export function lookup(filenameOrExt: string): string | false;
  export function contentType(filenameOrExt: string): string | false;
  export function extension(typeString: string): string | false;
  export function charset(typeString: string): string | false;
  export const types: { [key: string]: string };
  export const extensions: { [key: string]: string[] };
}

declare module 'react-native-mime-types' {
  export = mime;
}


