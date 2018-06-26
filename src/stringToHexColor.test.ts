import { stringToHexColor } from './stringToHexColor'
import { createString } from './createString'

describe('stringToHexColor()', () => {
  test('stringToHexColor() empty string should return #000000', () => {
    const hexColor = stringToHexColor('')
    expect(hexColor).toEqual('#000000')
  })

  test(`stringToHexColor() random string should match hex color code`, () => {
    const randomString = createString(10)
    const hexColor = stringToHexColor(randomString)
    expect(hexColor).toMatch(/^#[0-9a-f]{3,6}$/i)
  })
})
