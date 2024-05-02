/**
 * Middleware function that wraps the provided request handler in a try-catch
 * block and handles any errors that occur.
 *
 * @param {Function} requestHandler - The function to handle the request.
 * @returns {Function} The middleware function.
 */
const asyncHandler = (requestHandler) => {
    /**
     * Middleware function that handles the request.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    return (req, res, next) => {
        /**
         * Wraps the provided request handler in a promise and handles any
         * errors that occur.
         *
         * @return {Promise} A promise that resolves when the request handler
         * completes successfully, or rejects with an error.
         */
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err));
    };
};

export default asyncHandler;
