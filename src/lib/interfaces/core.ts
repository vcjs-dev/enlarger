export interface EnlargerOptions {
  container: HTMLElement | string
  src: string
  alt?: string
  width?: number
  height?: number
  maskColor?: string
  maskWidth?: number
  maskHeight?: number
  magnifyTimes?: number
}

export interface EnlargerInstance {
  options: Required<EnlargerOptions>
  maskVisible: boolean
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
}

export type CreateEnlarger = (opts: EnlargerOptions) => EnlargerInstance
