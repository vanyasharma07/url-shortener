


export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    } else {
        return res.status(500).json({
            status: 'error',
            message: err.message || 'Internal Server Error'
        });
    }
}

export class AppError extends Error{
    statusCode;
    isOperational;

    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    } 

}

export class NotFoundError extends AppError{
    constructor(message = "Not Found"){
        super(message, 404);
    }
}

export class ConflictError extends AppError{
    constructor(message = "Conflict"){
        super(message, 409);
    }
} 

export class BadRequestError extends AppError{
    constructor(message = "Bad Request"){
        super(message, 400);
    }
}

export class UnauthorisedError extends AppError{
    constructor(message = "Unauthorised"){
        super(message, 401);
    }
}