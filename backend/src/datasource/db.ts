import { config } from "../models/types.ts";
import { MongoConnection } from "./mongoConnection.ts";

export const database = new MongoConnection(config.mongoConnectionUrl)