import { Request, Response, NextFunction } from 'express';

export function routeNotFound(req: Request, res: Response, next: NextFunction): void {
    const error = new Error('Route Not found');
    logging.warn(error);
    res.status(404).json({
        error: {
            message: error.message
        }
    });
    return;
}
