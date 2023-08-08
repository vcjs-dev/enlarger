import type {
  CreateEnlarger,
  EnlargerOptions,
  EnlargerInstance,
} from './interfaces/core'

class Enlarger implements EnlargerInstance {
  options: Required<EnlargerOptions> = {}

  constructor(opts?: EnlargerOptions) {
    this.options = Object.assign(this.options, opts)
  }
}

const createEnlarger: CreateEnlarger = (opts) => {
  return new Enlarger(opts)
}

export { Enlarger, createEnlarger }
