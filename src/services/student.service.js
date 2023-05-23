import bcrypt from 'bcrypt';
import students from '../models/students.js';
import { generateJWTToken } from '../utils/jwt.js';

const createStudentService = async (dados) => {
    console.log(dados);
    dados.password = bcrypt.hashSync(dados.password, 8);
    const studentCreated = new students(dados);
    await studentCreated.save();
    
    return studentCreated;
  };

const updateStudentService = async (id, dados) => {
    dados.password = bcrypt.hashSync(dados.password, 8);
    const studentUpdated = await students.findByIdAndUpdate(id, dados, { new: true });
   
    return studentUpdated;
  };

const listStudentsService = async () => {
    const studentsFind = await students.find();
    
    return studentsFind;
  };

const inactivateStudentService = async (id, dados) => {
    const studentUpdated = await students.findByIdAndUpdate(id, dados.status, { new: true });
    
    return studentUpdated;
    
  };

const findStudentByIdService = async (id) => {

  const foundStudent = await students.findById(id, { new: true });

  return foundStudent;

}

const authentication = async ({ email, password }) => {
    if (!email || !password) {
      throw { status: 401, message: 'Missing data.' };
    }
  
    const student = await students.findOne({ email });
    console.log(student);
    const comparePassword = bcrypt.compareSync(password, student.password);
    console.log(password, student.password);
    console.log(comparePassword);
  
    if (!student || !comparePassword) {
      throw { status: 401, message: 'Invalid user or password.' };
    }
  
    const { _id, name } = student;
  
    // Generate token
    const token = generateJWTToken({ _id, name, email });
    
    return { token };
  };
  

export { authentication, createStudentService, updateStudentService, listStudentsService, inactivateStudentService, findStudentByIdService};