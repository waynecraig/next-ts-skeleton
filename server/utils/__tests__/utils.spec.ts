import { getRandomStr } from "../utils"

test('get random string', () => {
  expect(getRandomStr(6).length).toBe(12)
})
