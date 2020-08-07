import { randomBytes } from "crypto"

export const getRandomStr = (bLen = 6) => {
  return randomBytes(bLen).toString('hex')
}
