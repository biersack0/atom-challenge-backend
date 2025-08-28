import "reflect-metadata";
import http from "http";
import dotenv from "dotenv";
import app from "./app";
import {loadCredentials} from "@/config/enviroment";

dotenv.config();
const {NODE_PORT} = loadCredentials();

export const runServer = () => {
  const server = http.createServer(app);

  server.listen(NODE_PORT, () => {
    console.log(`Server is running on port ${NODE_PORT}`);
  });
};
