# env-overlay v.1.0.2

Dependency free, lightweight and simple module that will display the environment of the application as a fixed overlay.

## Installation and usage

First install the module with either yarn or npm.

**Using npm:**

`npm install env-overlay --save`

Then import or require env-overlay in your code, and invoke the funcationality from the envOverlay function by as a minimum send the environment string variable.

**Using import:**

    import { envOverlay } from 'env-overlay'

    // Here assuming the environment variable APP_ENV is set
    // And that it is accessible via process.env
    envOverlay(process.env.APP_ENV)

The module has its own typescript definitions
_So no need to look for @types/env-overlay_

## Options

The module takes 2 arguments, where the environment string is required, and the second options argument is optional.

`envOverlay(env: string, options?: IEnvOverlayOptions)`

Where the default options looks like this

```javascript
  {
    disallow: 'production',
    background: {
      local: '#780074',
      development: '#FF990F',
      staging: '#008E2A',
      demo: '#006A8E',
    },
    color: '#FFFFFF',
    onLoaded: () => {}
  }
```

### disallow

_Environment names to disable the module for_
The default bailout early environment name is "production" (case insensitive) via the disallow option - which can also be an array.

### background

_The hex color of the background_
And as you can see, there is a pre-defined color scheme as of background for the environments _"local"_, _"development"_, _"staging"_ and _"demo"_.

If you do not provide a background option for any other environment name, then the module will assign a background color calculated from the contents of the string for a reliable outcome each time.

[All credit goes to Edd Turtle for this feature](https://www.designedbyaturtle.co.uk/2014/convert-string-to-hexidecimal-colour-with-javascript-vanilla/)

### color

_The hex color of the text_
Default is white.

### onloaded

_Callback function for when the overlay is added to the DOM_
When the overlay has been added to the DOM - then this callback option will fire, and return the root node of the overlay for your DOM manipulatory pleasure.

### Options typescript interface

The typescript interface for the options (IEnvOverlayOptions) looks like this

```typescript
export interface IEnvOverlayOptions {
  disallow?: string | string[]
  // The "env" key is the name of the environment (lowercase will be forced)
  background?: { [env: string]: string }
  color?: string
  onLoaded?: (node: HTMLDivElement) => void
}
```

## Visuals

Here some visuals of the 4 different pre-defined environmentsa and a specific one named "other"

![Local Environment](/images/local.png)
![Development Environment](/images/development.png)
![Staging Environment](/images/staging.png)
![Demo Environment](/images/demo.png)
![Other Environment](/images/other.png)
