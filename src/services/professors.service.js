import professors from '../models/professors.js';
import bcrypt from 'bcrypt';
import { generateJWTToken } from '../utils/jwt.js';

const createProfessorService = async (dados) => {
    console.log(dados);

    if(dados.role !== "Professor"){
      throw { status: 401, message: "Only professors are allowed to create a new professor login."};
    }
    
    dados.password = bcrypt.hashSync(dados.password, 8);
    const professorCreated = new professors(dados);
    await professorCreated.save();
    return professorCreated;
};

const updateProfessorService = async (id, dados) => {
    dados.password = bcrypt.hashSync(dados.password, 8);
    const professorUpdated = await professors.findByIdAndUpdate(id, dados, { new: true });
    return professorUpdated;
};

const listProfessorsService = async () => {
    const professors = await professors.find();

    return professors;
};

const findProfessorByIdService = async (id) => {

  const foundProfessor = await professors.findById(id, { new: true });

  return foundProfessor;

}

const inactivateProfessorService = async (id, dados) => {
  const studentUpdated = await professors.findByIdAndUpdate(id, dados.status, { new: true });
  
  return studentUpdated;
  
};

const authentication = async ({ email, password }) => {
    if (!email || !password) {
      throw { status: 401, message: 'Missing data.' };
    }
  
    const professor = await professors.findOne({ email });
  
    const comparePassword = bcrypt.compareSync(password, professor.password);
    console.log(password, professor.password);
    console.log(comparePassword);
  
    if (!user || !comparePassword) {
      throw { status: 401, message: 'Invalid user or password.' };
    }
  
    const { _id, name } = student;
  
    // Generate token
    const token = generateJWTToken({ _id, name, email });
    return { token };
};
  

export { createProfessorService, authentication, updateProfessorService, listProfessorsService, inactivateProfessorService, findProfessorByIdService };