import { CustomError } from "./CustomError";

export class UnauthorizedError extends CustomError {
  constructor(message: string, statusCode: number = 401) {
    super(message, statusCode);
  }
}
