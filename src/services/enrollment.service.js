import enrollment from '../models/enrollment.js';

const date = new Date();
const today = date.toJSON();

const createEnrollmentService = async(dados) => {

    const enrollmentCreated = new enrollment(dados);

    if(date.getTime(dados.enroll_date) > date.getTime(today)){
        throw { status: 401, message: 'The enrollment date can not be in the future"'}
    }

    await enrollmentCreated.save();
    
    return enrollmentCreated;

}

export default createEnrollmentService;