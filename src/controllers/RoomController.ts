import { Request, Response } from "express";
import {
  RoomReposity,
  subjectRepository,
  VideoRepository,
} from "../repositories";

export class RoomController {
  constructor() {}

  async create(req: Request, res: Response) {
    const { name, description } = req.body;

    try {
      const newRoom = RoomReposity.create({ name, description });

      await RoomReposity.save(newRoom);

      res.status(201).json(newRoom);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createVideo(req: Request, res: Response) {
    const { title, url } = req.body;
    const { idRoom } = req.params;

    try {
      const room = await RoomReposity.findOneBy({ id: Number(idRoom) });

      if (!room) {
        res.status(404).json({ message: "Aula não existe." });
        return;
      }

      const newVideo = VideoRepository.create({
        title,
        url,
        room,
      });

      await VideoRepository.save(newVideo);

      res.status(201).json(newVideo);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async roomSubject(req: Request, res: Response) {
    const { subject_id } = req.body;
    const { idRoom } = req.params;

    try {
      const room = await RoomReposity.findOneBy({ id: Number(idRoom) });

      if (!room) {
        res.status(404).json({ message: "Aula não existe." });
        return;
      }

      const subject = await subjectRepository.findOneBy({
        id: Number(subject_id),
      });

      if (!subject) {
        res.status(404).json({ message: "Disciplina não existe." });
        return;
      }

      const roomUpdate = {
        ...room,
        subjects: [subject],
      };

      await RoomReposity.save(roomUpdate);

      res.status(200).json(room);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const rooms = await RoomReposity.find({
        relations: {
          subjects: true,
        },
      });

      console.log("rooms:", rooms);

      if (!rooms) {
        res.status(404).json("Não existe nenhum registro.");
      }

      res.json(rooms);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
