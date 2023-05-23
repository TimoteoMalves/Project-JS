import { Router } from 'express';
import createEnrollmentService from '../services/enrollment.service.js'
import authenticationMiddleware from '../middlewares/auth.middleware.js';

const enrollmentRoutes = Router();

enrollmentRoutes.post('/', authenticationMiddleware, async (req, res) => {

    const enrollmentCreated = await createEnrollmentService(req.body);

    return res.status(200).json(enrollmentCreated);

});

export default enrollmentRoutes;