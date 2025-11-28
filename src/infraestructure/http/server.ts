import "reflect-metadata"
import "dotenv/config";
import { router } from "../../presentation/routes";
import express from "express"
import "@/shared/container";
import cors from 'cors';
import { httpMetricsMiddleware } from "light-node-metrics"
import { logger } from "@/shared/providers/logger/logger.provider";

const app = express()

app.use(express.json())
app.use(httpMetricsMiddleware)
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");

    app.use(cors());

    next();
});

app.options('*', cors())

app.use(router);

const port = process.env.PORT

process.on('uncaughtException', (err) => {
    logger.error(`Erro não tratado:  ${err}`);
    return process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Promise rejeitada sem catch: ${reason}`);
    return process.exit(1);
});

app.listen(port, () => {
    logger.info(`Listening on PORT ${port}`)
})