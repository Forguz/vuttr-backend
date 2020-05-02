import { Router } from 'express';

import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../config/swagger.json';

import toolsRouter from './tools.routes';

const routes = Router();

routes.use('/tools', toolsRouter);

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default routes;
