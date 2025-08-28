import "reflect-metadata";
import { setGlobalOptions, https } from "firebase-functions";
import * as logger from "firebase-functions/logger";
import app from "./interfaces/app";

setGlobalOptions({ maxInstances: 10 });

// Exportar la función HTTP para Firebase usando la app Express
export const api = https.onRequest(app);

// Función de prueba simple
export const helloWorld = https.onRequest((request, response) => {
    logger.info("Hello logs!", { structuredData: true });
    response.json({
        success: true,
        message: "Hello from Firebase Cloud Functions!",
        timestamp: new Date().toISOString()
    });
});
