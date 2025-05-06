declare module '@vtfk/encryption' {
  export function encrypt(data: string, key: string): string;
  export function decrypt(data: string, key: string): string;
}