import { CustomError } from "./CustomError";

export class BadRequestError extends CustomError {
  constructor(message: string, statusCode: number = 400) {
    super(message, statusCode);
  }
}
