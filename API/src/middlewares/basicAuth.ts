import { NextFunction, Request, Response } from 'express';
import basicAuth from 'basic-auth';
import { server } from '../config/config';

export const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = basicAuth(req);
        if (!user || user.name !== server.USERNAME || user.pass !== server.PASSWORD) {
            res.set('WWW-Authenticate', 'Basic realm="example"');
            return res.status(401).send('Authentication required.');
        }
        console.log('User authenticated:', user.name);
        next();
    }
}