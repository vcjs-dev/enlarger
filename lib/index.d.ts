interface EnlargerOptions {
  container: HTMLElement | string
  src: string
  alt?: string
  width?: number
  height?: number
  magnifyImgScaleUpTimes?: number
  maskColor?: string
  maskWidth?: number
  maskHeight?: number
  maskCursor?: string
  maskBorderWidth?: string
  maskBorderColor?: string
  maskBorderStyle?: string
}

interface EnlargerInstance {
  userOptions: EnlargerOptions
  options: Required<EnlargerOptions>
  maskVisible: boolean
  imgNaturalWidth: number
  imgNaturalHeight: number

  containerEl: HTMLElement | null

  magnifyImgWidthScaleUpTimes: number
  magnifyImgHeightScaleUpTimes: number

  getImageNaturalSize(src: string, cb?: () => void): void
  getContainer(): HTMLElement
  render(): void
  destory(): void
  maskVisibleListener(): void
  getMaskEl(): HTMLElement
  registorListeners(): void
  removeListeners(): void
  getEnlargerMainEl(): HTMLElement
  magnifyListener(e: MouseEvent): void
  getMagnifyContainer(): HTMLElement
  getMagnifyImgEl(): HTMLImageElement
  initCSSVars(): void
  initOptions(): void
  setOptions(opts: EnlargerOptions): EnlargerInstance
  setWidth(width: number): EnlargerInstance
  setHeight(height: number): EnlargerInstance
}

type CreateEnlarger = (opts: EnlargerOptions) => EnlargerInstance

declare const createEnlarger: CreateEnlarger

export { EnlargerInstance, EnlargerOptions, createEnlarger };
