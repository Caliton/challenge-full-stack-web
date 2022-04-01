import { UnprocessableEntityError } from '../errors'

export class RAAlreadyExistsError extends UnprocessableEntityError {
  constructor (ra: string) {
    super(`Academic record '${ra}' already registered for another student`)
  }
}
