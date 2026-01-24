import { Buffer } from 'buffer'

export function encodeBasicAuth(username: string, password: string): string {
  const credentials = `${username}:${password}`
  return Buffer.from(credentials).toString('base64')
}
