"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeNotFound = routeNotFound;
function routeNotFound(req, res, next) {
    const error = new Error('Route Not found');
    logging.warn(error);
    res.status(404).json({
        error: {
            message: error.message
        }
    });
    return;
}
