export interface EnlargerOptions {
  container: HTMLElement | string
  src: string
  alt?: string
  width?: number
  height?: number
  autoSize?: boolean
  magnifyImgScaleUpTimes?: number
  maskColor?: string
  maskSizeRatio?: number
  maskCursor?: string
  maskBorderWidth?: string
  maskBorderColor?: string
  maskBorderStyle?: string
}

export interface EnlargerInstance {
  userOptions: EnlargerOptions
  options: Required<EnlargerOptions>
  maskWidth: number
  maskHeight: number
  maskVisible: boolean
  imgNaturalWidth: number
  imgNaturalHeight: number

  containerEl: HTMLElement | null
  resizeObserver: ResizeObserver | null

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
  initResizeObserver(): void
  setOptions(opts: Partial<EnlargerOptions>): EnlargerInstance
  setWidth(width: number): EnlargerInstance
  setHeight(height: number): EnlargerInstance
}

export type CreateEnlarger = (opts: EnlargerOptions) => EnlargerInstance
