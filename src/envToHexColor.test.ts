import { envToHexColor } from './envToHexColor'
import { createString } from './createString'

describe('envToHexColor()', () => {
  test('Empty string should return #000000', () => {
    const hexColor = envToHexColor('')
    expect(hexColor).toEqual('#000000')
  })

  test('"local" should return #780074', () => {
    const hexColor = envToHexColor('local')
    expect(hexColor).toEqual('#780074')
  })

  test('"Local" should return #780074', () => {
    const hexColor = envToHexColor('Local')
    expect(hexColor).toEqual('#780074')
  })

  test('"LOCAL" should return #780074', () => {
    const hexColor = envToHexColor('LOCAL')
    expect(hexColor).toEqual('#780074')
  })

  test('"development" should return #FF990F', () => {
    const hexColor = envToHexColor('development')
    expect(hexColor).toEqual('#FF990F')
  })

  test('"staging" should return #008E2A', () => {
    const hexColor = envToHexColor('staging')
    expect(hexColor).toEqual('#008E2A')
  })

  test('"demo" should return #006A8E', () => {
    const hexColor = envToHexColor('demo')
    expect(hexColor).toEqual('#006A8E')
  })

  test('Random string match hex color code', () => {
    const randomString = createString(10)
    const hexColor = envToHexColor(randomString)
    expect(hexColor).toMatch(/^#[0-9a-f]{3,6}$/i)
  })
})
