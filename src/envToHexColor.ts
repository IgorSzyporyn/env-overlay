import { stringToHexColor } from './stringToHexColor'

export const envToHexColor = (env: string) => {
  const environment = env.toLowerCase()
  let hexColor = '#000000'

  switch (environment) {
    case 'local':
      hexColor = '#780074'
      break
    case 'development':
      hexColor = '#FF990F'
      break
    case 'staging':
      hexColor = '#008E2A'
      break
    case 'demo':
      hexColor = '#006A8E'
      break
    default:
      hexColor = stringToHexColor(environment)
      break
  }

  return hexColor
}
