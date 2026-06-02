import { Request, Response } from "express";
import { AuthUseCase } from "../../application/use-cases/AuthUseCase";

export class AuthController {
  private authUseCase: AuthUseCase;

  constructor() {
    this.authUseCase = new AuthUseCase();
  }

  studentSignup = async (req: Request, res: Response) => {
    try {
      const result = await this.authUseCase.studentSignup(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      console.error(error);
      if (error.message === "User already exists" || error.message === "Missing required fields") {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  studentLogin = async (req: Request, res: Response) => {
    try {
      const result = await this.authUseCase.studentLogin(req.body);
      res.json(result);
    } catch (error: any) {
      console.error(error);
      if (error.message === "Invalid email or password" || error.message === "Missing required fields") {
        return res.status(401).json({ error: error.message });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  adminLogin = async (req: Request, res: Response) => {
    try {
      const result = await this.authUseCase.adminLogin(req.body);
      res.json(result);
    } catch (error: any) {
      console.error(error);
      if (error.message === "Invalid email or password" || error.message === "Missing required fields") {
        return res.status(401).json({ error: error.message });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
