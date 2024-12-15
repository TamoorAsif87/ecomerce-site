import { CustomError } from "./CustomError";


export type ValidationResultError = {
      [string: string]: [string];
    };

export class ValidationErrors extends CustomError {
  validationErrors:ValidationResultError;
  constructor(
    message: string,
    statusCode: number = 404,
    validationErrors: ValidationResultError
  ) {
    super(message, statusCode);
    this.statusCode = statusCode;
    this.validationErrors = validationErrors;
  }
}
