import { envToHexColor } from './envToHexColor'

export interface IEnvOverlayOptions {
  disallow?: string | string[]
  background?: { [env: string]: string }
  text?: { [env: string]: string }
  onLoaded?: (node: HTMLDivElement) => void
}

interface IEnvOverlaySettings {
  disallow: string | string[]
  background: { [env: string]: string }
  text: { [env: string]: string }
  onLoaded?: (node: HTMLDivElement) => void
}

const defaultOptions: IEnvOverlaySettings = {
  disallow: 'production',
  background: {
    local: '#780074',
    development: '#FF990F',
    staging: '#008E2A',
    demo: '#006A8E',
  },
  text: {
    local: '#FFFFFF',
    development: '#FFFFFF',
    staging: '#FFFFFF',
    demo: '#FFFFFF',
  },
}

const getDisallowStatus = (env: string, settings: IEnvOverlaySettings) => {
  let disallow = false

  if (typeof settings.disallow === 'string') {
    if (env === settings.disallow || !env) {
      disallow = true
    }
  } else {
    settings.disallow.forEach(item => {
      if (env === item.toLowerCase()) {
        disallow = true
      }
    })
  }

  return disallow
}

const createNode = (environment: string, settings: IEnvOverlaySettings) => {
  // Find the background color and text color to use
  const env = environment.toLowerCase()
  const background = settings.background[env] || envToHexColor(env)
  const color = settings.text[env] || '#FFFFFF'

  const DOMWrapperElement = document.createElement('div')
  const DomTextElement = document.createElement('div')
  const DOMTextNode = document.createTextNode(env)

  const DOMWrapperStyle = `
    align-items: flex-end;
    -ms-flex-align: end;
    -webkit-box-align: end;
    background-color: ${background};
    color: ${color};
    display: flex;
    display: -ms-flexbox;
    display: -webkit-box;
    height: 140px;
    justify-content: center;
    -ms-flex-pack: center;
    -webkit-box-pack: center;
    position: fixed;
    right: -70px;
    text-transform: uppercase;
    top: -70px;
    transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    width: 140px;
    z-index: 99999;
  `

  DOMWrapperElement.setAttribute('style', DOMWrapperStyle)

  const DOMTextStyle = `
    line-height: 3em;
    font-size: 10px;
    font-weight: 700;
  `

  DomTextElement.setAttribute('style', DOMTextStyle)

  // Append text to inner and inner to wrapper
  DomTextElement.appendChild(DOMTextNode)
  DOMWrapperElement.appendChild(DomTextElement)

  return DOMWrapperElement
}

export const envOverlay = (environment: string, options?: IEnvOverlayOptions) => {
  const settings: IEnvOverlaySettings = { ...defaultOptions, ...options }
  const env = environment.toLowerCase()
  const sufficientDOM: boolean = !!(document && document.addEventListener)
  const disallow = getDisallowStatus(env, settings)

  if (!sufficientDOM || disallow) {
    return
  }

  document.addEventListener('DOMContentLoaded', () => {
    const node = createNode(env, settings)

    document.body.appendChild(node)

    settings.onLoaded && settings.onLoaded(node)
  })

  return
}
