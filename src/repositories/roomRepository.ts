import { AppDataSource } from "../data-source";
import { Room } from "../entities/Room";

export const RoomReposity = AppDataSource.getRepository(Room);
