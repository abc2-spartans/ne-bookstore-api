/**
 * Standard API response format
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Response message
 * @param {Object} [data] - Response data
 * @param {Object} [error] - Error details if any
 */
export const sendResponse = (res, statusCode, message, data = null, error = null) => {
    const response = {
        success: statusCode >= 200 && statusCode < 300,
        message,
        timestamp: new Date().toISOString()
    };

    if (data) response.data = data;
    if (error && process.env.NODE_ENV === 'development') {
        response.error = {
            message: error.message,
            stack: error.stack
        };
    }

    res.status(statusCode).json(response);
};

// Common response helpers
export const success = (res, data, message = 'Operation successful') => {
    sendResponse(res, 200, message, data);
};

export const created = (res, data, message = 'Resource created successfully') => {
    sendResponse(res, 201, message, data);
};

export const notFound = (res, message = 'Resource not found') => {
    sendResponse(res, 404, message);
};

export const badRequest = (res, message = 'Bad request', error = null) => {
    sendResponse(res, 400, message, null, error);
};

export const serverError = (res, error = null) => {
    sendResponse(
        res,
        500,
        'Internal server error',
        null,
        error
    );
};
