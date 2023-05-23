import { Router } from 'express';
import { createStudentService, authentication, updateStudentService, listStudentsService, inactivateStudentService, findStudentByIdService } from '../services/student.service.js';
import authenticationMiddleware from '../middlewares/auth.middleware.js';
import { studentSchema } from '../utils/schemaValidation.js';

const studentRoutes = Router();

studentRoutes.post('/login', async (req, res) => {
    const token = await authentication(req.body);
    console.log(token);
    res.status(200).json(token);
})

// create student
studentRoutes.post('/', async (req, res) => {

    // waiting for the payload validation made by our schemaValidation
    const { error } = await studentSchema.validate(req.body);

    if (error){
        throw {status: 401, message: error.message};
    }

    const studentCreated = await createStudentService(req.body);

    return res.status(200).json(studentCreated);

});

studentRoutes.put('/:id', authenticationMiddleware, async (req, res) => {
    const { id } = req.params;

    // waiting for the payload validation made by our schemaValidation
    const { error } = await studentSchema.validate(req.body);

    if (error){
        throw {status: 401, message: error.message};
    }

    const studentUpdated = await updateStudentService(id, req.body);
    return res.status(200).json(studentUpdated);

});

studentRoutes.get("/", authenticationMiddleware, async(req, res) => {
    const students = await listStudentsService();
    
    return res.status(200).json(students);
});


studentRoutes.get('/:id', authenticationMiddleware, async(req, res) => {

    const { id } = req.params;

    const studentFound = await findStudentByIdService(id);

    return res.status(200).json(studentFound);

});

studentRoutes.put('/delete/:id', authenticationMiddleware, async(req, res) => {

    const { id } = req.params;
    const inactivatedStudent = await inactivateStudentService(id, req.body);

    return res.status(200).json(inactivatedStudent);

})

studentRoutes.put('/delete/:id', authenticationMiddleware, async(req, res) => {

    const { id } = req.params;
    const studentUpdated = await updateStudentService(id, req.body);

    return res.status(200).json(studentUpdated);
    
})


export default studentRoutes;