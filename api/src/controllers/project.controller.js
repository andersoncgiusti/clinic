// module.exports = {
//     project: (req, res) => {
//         res.status(200).send({
//             'Login': 'Logado', 
//             // user: req.userId
//         })
//     }
// }


const Project = require('../models/project.model')
const Task = require('../models/task.model')

module.exports = { 
    projectGet: async (req, res) => {
        try {
            const projects = await Project.find().populate(['tasks']);
            return res.send({ projects });
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }         
    },
    projectGetId: async (req, res) => {
        try {
            const projects = await Project.findById({ _id: req.params.id }).populate(['tasks']);
            return res.send({ projects });
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }         
    },










    projectPost: async (req, res) => {
        try {

            const { 
                userName,
                userLastName,
                userBirth,
                userPhone,
                userEmail,
                userCpf,
                userAddress,
                userNumber,
                userComplement,
                userCity,
                userState,
                userPermission,
                tasks 
            } = req.body;

            const project = await Project.create({ 
                userName,
                userLastName,
                userBirth,
                userPhone,
                userEmail,
                userCpf,
                userAddress,
                userNumber,
                userComplement,
                userCity,
                userState,
                userPermission,
            });

            await Promise.all(tasks.map(async task => {
                const projectTask = new Task({
                    ...task,
                    project: project._id
                })

                await projectTask.save();
                project.tasks.push(projectTask);
            }));

            await project.save();

            return res.send({ project });
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    },














    projectPut: async (req, res) => {
        try {

            const { title, description, tasks } = req.body;

            const project = await Project.findByIdAndUpdate(
                req.params.id, 
                { 
                    title, 
                    description 
                }, { new: true });

            project.tasks = [];
            await Task.remove({ project: project._id });

            await Promise.all(tasks.map(async task => {
                const projectTask = new Task({
                    ...task,
                    project: project._id
                })

                await projectTask.save();
                project.tasks.push(projectTask);
            }));

            await project.save();

            return res.send({ project });
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    },
    projectDelete: async (req, res) => {
        try {
            await Project.deleteOne({_id: req.params.id}).populate(['tasks']);;
            return res.send();
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }         
    },
}
