import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const router: Router = Router();

const swaggerDocument = YAML.load(
  path.join(__dirname, '../../../docs/swagger.yaml')
);

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
