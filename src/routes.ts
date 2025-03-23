import { Router } from "express";
import { SubjectController } from "./controllers/SubjectController";
import { RoomController } from "./controllers/RoomController";

const routes = Router();

const Subject = new SubjectController();
const room = new RoomController();

routes.post("/subject", Subject.create);
routes.post("/room", room.create);
routes.post("/room/:idRoom/create", room.createVideo);
routes.post("/room/:idRoom/subject", room.roomSubject);
routes.get("/room", room.list);

export default routes;
