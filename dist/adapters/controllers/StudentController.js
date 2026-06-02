"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const StudentUseCase_1 = require("../../application/use-cases/StudentUseCase");
class StudentController {
    studentUseCase;
    constructor() {
        this.studentUseCase = new StudentUseCase_1.StudentUseCase();
    }
    getAllStudents = async (req, res) => {
        try {
            const students = await this.studentUseCase.getAllStudents();
            res.json(students);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
    createStudent = async (req, res) => {
        try {
            const student = await this.studentUseCase.createStudent(req.body);
            res.status(201).json(student);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
    getStudentProfile = async (req, res) => {
        try {
            const id = req.params.id;
            const student = await this.studentUseCase.getStudentProfile(id);
            if (!student) {
                return res.status(404).json({ error: "Student not found" });
            }
            res.json(student);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
    updateStudentProfile = async (req, res) => {
        try {
            const id = req.params.id;
            const updated = await this.studentUseCase.updateStudentProfile(id, req.body);
            if (!updated) {
                return res.status(404).json({ error: "Student not found" });
            }
            res.json(updated);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}
exports.StudentController = StudentController;
