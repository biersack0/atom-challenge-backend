import "reflect-metadata";
import { setGlobalOptions } from "firebase-functions";
import { runServer } from "./interfaces/server";
/* import {onRequest} from "firebase-functions/https";
import * as logger from "firebase-functions/logger"; */

setGlobalOptions({ maxInstances: 10 });

runServer();

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
