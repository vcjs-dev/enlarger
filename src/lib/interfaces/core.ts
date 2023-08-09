export interface EnlargerOptions {
  container: HTMLElement | string
  src: string
  alt?: string
  width?: number
  height?: number
  maskColor?: string
  maskWidth?: number
  maskHeight?: number
  magnifyImgScaleUpTimes?: number
}

export interface EnlargerInstance {
  options: Required<EnlargerOptions>
  maskVisible: boolean
  imgNaturalWidth: number
  imgNaturalHeight: number

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
}

export type CreateEnlarger = (opts: EnlargerOptions) => EnlargerInstance
