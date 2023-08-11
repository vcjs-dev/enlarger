export interface EnlargerOptions {
  container: HTMLElement | string
  src: string
  alt?: string
  width?: number
  height?: number
  autoSize?: boolean
  magnification?: number
  magnifierColor?: string
  magnifierSizeRatio?: number
  magnifierCursor?: string
  magnifierBorderWidth?: string
  magnifierBorderColor?: string
  magnifierBorderStyle?: string
}

export interface EnlargerInstance {
  userOptions: EnlargerOptions
  options: Required<EnlargerOptions>
  magnifierWidth: number
  magnifierHeight: number
  magnifierVisible: boolean
  imgNaturalWidth: number
  imgNaturalHeight: number

  containerEl: HTMLElement | null
  resizeObserver: ResizeObserver | null

  widthMagnification: number
  heightMagnification: number

  getImageNaturalSize(src: string, cb?: () => void): void
  getContainer(): HTMLElement
  render(): void
  destory(): void
  magnifierVisibleListener(): void
  getMagnifierEl(): HTMLElement
  registorListeners(): void
  removeListeners(): void
  getEnlargerImageWrapperEl(): HTMLElement
  previewListener(e: MouseEvent): void
  getPreviewEl(): HTMLElement
  getPreviewImgEl(): HTMLImageElement
  initCSSVars(): void
  initOptions(): void
  initResizeObserver(): void
  setOptions(opts: Partial<EnlargerOptions>): EnlargerInstance
  setWidth(width: number): EnlargerInstance
  setHeight(height: number): EnlargerInstance
}

export type CreateEnlarger = (opts: EnlargerOptions) => EnlargerInstance
