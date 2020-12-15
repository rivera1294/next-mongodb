import { getReadableCamelCase } from '~/utils/getReadableCamelCase'

export class UniversalError extends Error {
  constructor(name) {
    super()
    this.name = name

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UniversalError.prototype)
  }
  getReadableCamelCase(str) {
    return getReadableCamelCase(str)
  }
  getErrorMsg() {
    throw new Error('gerErrorMsg method should be implemented')
  }
}
