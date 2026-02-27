import { Router } from 'express';
import { MetricsController } from '../controllers/metrics.controller';

const router = Router();

router.get('/live', MetricsController.getLiveMetrics);
router.get('/historical', MetricsController.getHistoricalMetrics);

export default router;
