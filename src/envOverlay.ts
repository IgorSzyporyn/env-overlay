import { envToHexColor } from './envToHexColor'

export interface IEnvOverlayOptions {
  disallow?: string | string[]
  background?: { [env: string]: string }
  color?: string
  onLoaded?: (node: HTMLDivElement) => void
}

interface IEnvOverlaySettings {
  disallow: string | string[]
  background: { [env: string]: string }
  color: string
  onLoaded: (node: HTMLDivElement) => void
}

const defaultOptions: IEnvOverlaySettings = {
  disallow: 'production',
  background: {
    local: '#780074',
    development: '#FF990F',
    staging: '#008E2A',
    demo: '#006A8E',
  },
  color: '#FFFFFF',
  onLoaded: () => {},
}

// The nitty gritty function that actually creates the DOM nodes and styles
// required for the environment overlay
const createNode = (environment: string, settings: IEnvOverlaySettings) => {
  // Find the background color and text color to use
  const env = environment.toLowerCase()
  const background = settings.background[env] || envToHexColor(env)
  const color = settings.color

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

export const envOverlay = (environment: string, options: IEnvOverlayOptions = {}) => {
  const settings: IEnvOverlaySettings = { ...{}, ...defaultOptions, ...options }
  const env = environment.toLowerCase()

  // Bailout early - remember disallow can be an array also
  if (typeof settings.disallow === 'string') {
    if (env === settings.disallow || !env) {
      return
    }
  } else {
    let disallow = false

    settings.disallow.forEach(item => {
      if (env === item.toLowerCase()) {
        disallow = true
      }
    })

    if (disallow) {
      return
    }
  }
  // Wait until the DOM is ready to continue
  document.addEventListener('DOMContentLoaded', () => {
    // Create and return the DOM node
    const node = createNode(env, settings)

    // Append the DOM node to the body
    document.body.appendChild(node)

    // Fire the courtesy callback when things are done so the
    // end user can do whatever with the DOM node delivered to him/her
    settings.onLoaded && settings.onLoaded(node)
  })

  return
}
