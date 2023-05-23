import courses from '../models/courses.js';

const createCourseService = async (dados) => {
    console.log(dados);

    if(dados.role !== "Professor"){
        throw{ status: 401, message: "Only professors are allowed to create a course."};
    }

    const courseCreated = new courses(dados);
    await courseCreated.save();
    
    return courseCreated;
};

const updateCourseService = async (id, dados) => {
    const courseUpdated = await courses.findByIdAndUpdate(id, dados, { new: true });
    return courseUpdated;
};

const listCoursesService = async () => {

    const courses = await courses.find();

    return courses;

};

const findCourseByNameService = async (dados) => {

    const courseFound = await courses.findOne(dados.name, { new: true});

    return courseFound;

}

const inactivateCourseService = async (id, dados) => {
    const courseUpdated = await courses.findByIdAndUpdate(id, dados.status, { new: true });
    
    return courseUpdated;
    
  };
  

export { updateCourseService, listCoursesService, inactivateCourseService, createCourseService, findCourseByNameService };