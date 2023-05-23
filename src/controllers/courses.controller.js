import { Router } from 'express';
import { createCourseService, updateCourseService, listCoursesService, inactivateCourseService, findCourseByNameService } from '../services/courses.service.js';
import authenticationMiddleware from '../middlewares/auth.middleware.js';
import { findProfessorByIdService } from '../services/professors.service.js';
import { listStudentsService } from '../services/student.service.js';

const coursesRoutes = Router();

coursesRoutes.post('/', authenticationMiddleware,async(req, res) => {

    const courseCreated = await createCourseService(req.body);

    return res.status(200).json(courseCreated);

})

coursesRoutes.put('/:id', authenticationMiddleware, async(req, res) => {

    const { id } = req.params;

    const courseUpdated = await updateCourseService(id, req.body);
    
    return res.status(200).json(courseUpdated);

});

coursesRoutes.get('/courses', authenticationMiddleware, async(req, res) => {

    const courses = await listCoursesService();

    return res.status(200).json(courses);
});

coursesRoutes.get('/:name', authenticationMiddleware, async(req, res) => {

    const { name }= req.params;

    const courseFound = await findCourseByNameService(name);
    const courseProfessor = await findProfessorByIdService(courseFound.professor);
    const studentsFound = await listStudentsService();

    const studentsInTheCourse = studentsFound.filter(student => student.course === name);

    return res.status(200).json(courseFound, courseProfessor, studentsInTheCourse);
});

coursesRoutes.put('/delete/:id', authenticationMiddleware, async(req, res) => {

    const { id } = req.params;
    const inactivatedCourse = await inactivateCourseService(id, req.body);

    return res.status(200).json(inactivatedCourse);

})

export default coursesRoutes;