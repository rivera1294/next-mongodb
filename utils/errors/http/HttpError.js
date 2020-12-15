import { UniversalError } from '~/utils/errors'

export class HttpError extends UniversalError {
  constructor(status, message) {
    super('HttpError')
    this.status = status
    this.message = message

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, HttpError.prototype)
  }

  getErrorMsg() {
    const normalizedName = this.getReadableCamelCase(this.name)

    return `${normalizedName} ${this.status}: ${this.message}`
  }
  get resStatus() {
    return this.status
  }
}
