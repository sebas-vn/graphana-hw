import express from 'express';
import winston from 'winston';

const app = express();
const port = 3000;

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user_service' },
    transports: [
        new winston.transports.File({ filename: '/var/log/error.log', level: 'error'}),
        new winston.transports.File({ filename: '/var/log/combined.log' }),
        new winston.transports.Console({ format: winston.format.simple() })
    ]
})

app.get("/", (req, res) => {
    logger.log({level: 'info', message: `action="GET, status_code=${res.statusCode} job=user_service` })
    res.send("Hello World");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})