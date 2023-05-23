import { Router } from 'express';
import { authentication, createProfessorService, updateProfessorService, listProfessorsService, inactivateProfessorService, findProfessorByIdService } from '../services/professors.service.js';
import { professorSchema } from '../utils/schemaValidation.js';
import authenticationMiddleware from '../middlewares/auth.middleware.js';

const professorsRoutes = Router();

professorsRoutes.post('/login', async (req, res) => {
    const token = await authentication(req.body);
    res.status(200).json(token);
});

// create professor
professorsRoutes.post('/', authenticationMiddleware,async (req, res) => {

    // waiting for the payload validation made by our schemaValidation
    const { error } = await professorSchema.validate(req.body);

    if (error){
        throw {status: 401, message: error.message};
    }

    const professorCreated = await createProfessorService(req.body);

    return res.status(200).json(professorCreated);

});

professorsRoutes.put('/:id', authenticationMiddleware,async (req, res) => {

    const { id } = req.params;
    // waiting for the payload validation made by our schemaValidation
    const { error } = await professorSchema.validate(req.body);

    if (error){
        throw {status: 401, message: error.message};
    }

    const professorUpdated = await updateProfessorService(id, req.body);
    return res.status(200).json(professorUpdated);

});

professorsRoutes.get('/professors', authenticationMiddleware, async(req, res) => {

    const professors = await listProfessorsService();

    return res.status(200).json(professors);

});

professorsRoutes.get('/:id', authenticationMiddleware, async(req, rew) => {

    const { id } = await findProfessorByIdService(id);

    return res.status(200).json(id);
});

professorsRoutes.put('/delete/:id', authenticationMiddleware, async(req, res) => {

    const { id } = req.params;
    const inactivateProfessor = await inactivateProfessorService(id, req.body);

    return res.status(200).json(inactivateProfessor);

});


export default professorsRoutes;