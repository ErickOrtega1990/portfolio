import { Router } from 'express';
import { getHealth } from '../controllers/health.controller';
import contactRouter from './contact.routes';

/**
 * Router raíz de la API. Se monta en /api desde app.ts.
 */
const apiRouter = Router();

apiRouter.get('/health', getHealth);
apiRouter.use('/contact', contactRouter);

export default apiRouter;
