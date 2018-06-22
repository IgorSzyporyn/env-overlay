# env-overlay

Easily see what environment you are viewing your application in via a small overlay - comes with built-in visual, but can easily be overridden and customized either via CSS or options in your code.

Dependency free, lightweight, simple and with embedded TypeScript support _(no need to look for @types/env-overlay)_

## Installation

`$ npm install env-overlay --save`

## Usage

    import { envOverlay } from 'env-overlay'

    // Here assuming the environment variable NODE_ENV is set for sure
    // And that it is accessible via process.env
    envOverlay(process.env.NODE_ENV)

## Signature

`(environment: string, options?: IEnvOverlayOptions) => void`

[Click here to view IEnvOverlayOptions](#IEnvOverlayOptions)

## Options

### options.disallow

_String or array of strings_ - Name(s) of environments to exclude usage of env-overlay.
The module will bailout early if the the environment name given matches the string, or one of the strings, given.
**Default**: "production"

### options.background

_Object of key (env name) - value (any valid CSS color)_ - A map of background colors for given environment names.
There are default colors for the environments _"local"_, _"development"_, _"staging"_ and _"demo"_.

Should an environment not have a matching background color key/value provided in options, then a color will be assigned based on the environment name.

[All credit goes to Edd Turtle for this feature](https://www.designedbyaturtle.co.uk/2014/convert-string-to-hexidecimal-colour-with-javascript-vanilla/)

### options.color

_Object of key (env name) - value (any valid CSS color)_ - A map of text colors for given environment names.
There are default colors for the environments _"local"_, _"development"_, _"staging"_ and _"demo"_.

### options.onloaded

_Callback function for when the overlay is added to the DOM_
When the overlay has been added to the DOM - then this callback option will fire, and return the root node of the overlay for your DOM manipulatory pleasure.

### <a name="IEnvOverlayOptions"></a>Options typescript interface

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
