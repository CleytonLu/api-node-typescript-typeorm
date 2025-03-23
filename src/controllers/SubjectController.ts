import { Request, Response } from "express";
import { subjectRepository } from "../repositories/subjectRepository";
import { Subject } from "../entities/Subject";

export class SubjectController {
  async create(req: Request, res: Response) {
    const { name } = req.body as Subject;

    if (!name) {
      res.status(400).json({ message: "O nome é obrigatório" });
    }

    try {
      const newSubject = subjectRepository.create({ name });

      await subjectRepository.save(newSubject);

      res.status(201).json(newSubject);
    } catch (error) {
      console.log("error:", error);
      res.status(500).json({ message: "Internal server Error" });
    }
  }
}
