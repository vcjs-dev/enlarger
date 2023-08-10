<p align="center">
  <a href="https://www.npmjs.org/package/enlarger">
    <img src="https://img.shields.io/npm/v/enlarger.svg">
  </a>
  <a href="https://npmcharts.com/compare/enlarger?minimal=true">
    <img src="https://img.shields.io/npm/dm/enlarger.svg">
  </a>
  <br>
</p>

# Enlarger

A image enlarger library for web app. See [example](https://vcjs-dev.github.io/enlarger/) here.

# Features

- Make the image have a magnifying glass effect.
- Easy to use.
- Support Typescript.

# Installation

```bash
# pnpm
$ pnpm add enlarger

# yarn
$ yarn add enlarger

# npm
$ npm i enlarger
```

# Usage

1. Imports the style.

```ts
import 'enlarger/lib/style.css'
```

2. Create a image enlarger instance.

```html
<!-- Define a container -->
<div id="enlarger-container"></div>
```

```ts
// Then, initial a instance

import { createEnlarger } from 'enlarger'

const imageEnlarger = createEnlarger({
  container: '#enlarger-container',
  src: 'https://www.some.com/path/foo.png',
  width: 600
})
```

# Options

| Prop | Type | Default Value | Description |
| :---: | :---: | :---: | :---: |
| `container` | `HTMLElement`, `string` | `''` | Specify container elements. |
| `src` | `string` | `''` | Specify the `src` of `<img />`. |
| `alt` | `string` | `''` | Specify the `alt` of `<img />`. |
| `autoSize` | `boolean` | `false` | Specify whether the image is **adaptive** in size. If set to `true`, `width` and `height` config will not be available. |
| `width` | `number` | `0` | Initialize the **width** of the image. |
| `height` | `number` | `0` | Initialize the **height** of the image. **Height** is not necessary because it will automatically adapt based on the **width** value.|
| `magnifyImgScaleUpTimes` | `number` | `2` | Define the magnification of the image. |
| `maskColor` | `string` | `rgba(255, 255, 255, 0.2)` | Define the background color of the mask element. |
| `maskSizeRatio` | `number` | `0.5` | Define mask element size ratio equivalent to image size. |
| `maskCursor` | `string` | `crosshair` | Define the cursor style of the mask element. |
| `maskBorderColor` | `string` | `#bbbbbb` | Define the border color of the mask element. |
| `maskBorderWidth` | `string` | `1px` | Define the border width of the mask element. |
| `maskBorderStyle` | `string` | `solid` | Define the border width of the mask element. |


# APIs

## Methods of instance

### setOptions

You can modify the options via it after initialization.

```ts
imageEnlarger.setOptions({
  width: 500 // Set the image width to 500
})
```

### setWidth

You can modify the wdith of image via it after initialization.

```ts
imageEnlarger.setWidth(500)
```

### setHeight

You can modify the height of image via it after initialization.

> TIPS, Usually, you only need to control the width of the image, and the height is responsive.

```ts
imageEnlarger.setHeight(800) // Set the image width to 800
```

### destory

Destory the image enlarger instance.

```ts
imageEnlarger.destory()
```

# CHANGE LOG

See [here](./CHANGELOG.md).