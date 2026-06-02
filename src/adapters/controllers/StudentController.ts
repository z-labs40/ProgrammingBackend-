import { Request, Response } from "express";
import { StudentUseCase } from "../../application/use-cases/StudentUseCase";

export class StudentController {
  private studentUseCase: StudentUseCase;

  constructor() {
    this.studentUseCase = new StudentUseCase();
  }

  getAllStudents = async (req: Request, res: Response) => {
    try {
      const students = await this.studentUseCase.getAllStudents();
      res.json(students);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  createStudent = async (req: Request, res: Response) => {
    try {
      const student = await this.studentUseCase.createStudent(req.body);
      res.status(201).json(student);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getStudentProfile = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const student = await this.studentUseCase.getStudentProfile(id);
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
      res.json(student);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  updateStudentProfile = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const updated = await this.studentUseCase.updateStudentProfile(id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Student not found" });
      }
      res.json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
