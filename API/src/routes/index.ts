import { Router } from 'express';

import helloRoutes from './helloRouter';
import authRoutes from './authRouter';
import oauth2Routes from './oauth2Router';
import catalogRoutes from './catalogRouter';
import userRoutes from './userRouter';

const router = Router();

router.use('/healthcheck', helloRoutes);
router.use('/auth', authRoutes);
router.use('/oauth2', oauth2Routes);
router.use('/catalog', catalogRoutes);
router.use('/user', userRoutes);

export default router;
