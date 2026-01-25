export class appError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public isOperational: boolean = true,
  ) {
    super(message);
    Object.setPrototypeOf(this, appError.prototype);
  }
}

export class badRequestError extends appError {
  constructor(message: string = "Bad Request") {
    super(message, 400);
  }
}

export class UnauthorizedError extends appError {
  constructor(message: string = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenError extends appError {
  constructor(message: string = "Forbidden") {
    super(message, 403);
  }
}

export class NotFoundError extends appError {
  constructor(message: string = "Not Found") {
    super(message, 404);
  }
}

export class ConflictError extends appError {
  constructor(message: string = "Conflict") {
    super(message, 409);
  }
}
