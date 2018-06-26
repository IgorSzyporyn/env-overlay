import { createString } from './createString'

describe('createString()', () => {
  test('No arguments should return string with 5 characters', () => {
    const string = createString()

    expect(string).toHaveLength(5)
  })

  test('Negative number should return string with 5 characters', () => {
    const length = Math.round((Math.random() + 1) * 200 * -1)
    const string = createString(length)

    expect(string).toHaveLength(5)
  })

  test('Random number above 0 as argument should return string with same length', () => {
    const length = Math.round((Math.random() + 1) * 200)
    const string = createString(length)

    expect(string).toHaveLength(length)
  })

  test('Floating number as argument should return string with same length rounded', () => {
    const length = (Math.random() + 1) * 200
    const string = createString(length)

    expect(string).toHaveLength(Math.round(length))
  })
})
