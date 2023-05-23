import { Router } from "express";

// importing all controllers
import coursesRoutes from "../controllers/courses.controller.js";
import enrollmentRoutes from "../controllers/enrollment.controller.js"
import professorsRoutes from "../controllers/professors.controller.js";
import studentRoutes from "../controllers/student.controller.js";

// enables the routes usage
const routes = Router();

// routes.use creates the route and directs it to the controller
routes.use('/student', studentRoutes);
routes.use('/professor', coursesRoutes);
routes.use('/courses', professorsRoutes);
routes.use('/enrollment', enrollmentRoutes);

export default routes;