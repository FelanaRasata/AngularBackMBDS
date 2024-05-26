import ansiColors from 'ansi-colors';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dayjs from 'dayjs';
import express from 'express';
import figlet from 'figlet';
import helmet from 'helmet';
import morgan from 'morgan';
import { dirname, join } from 'path';
import { DEV_MODE, PORT } from './config/apiServer.config.js';
import AssigmentModel from './entities/assignment.entity.js';
import Loggeo from './shared/utils/logger.js';
import { mongooseConnect } from './shared/utils/mongooseUtils.js';
import assignmentsRoute from './routes/assignments.route.js';
import usersRoute from './routes/users.route.js';


runApplicationServer();


function runApplicationServer() {

    const app = express();

    setUpMiddlewares(app);
    setUpPublicFolders(app);
    setUpRoutes(app);

    app.listen(PORT, '0.0.0.0', async () => {

        await mongooseConnect();
        // await init();

        log();

    });

}


async function init() {

    await AssigmentModel.insertMany([
        {
            name: 'test1',
            dueDate: dayjs().add(2, 'weeks'),
        },
        {
            name: 'test2',
            dueDate: dayjs().add(2, 'weeks'),
        },
    ]);

}


function setUpMiddlewares(app) {

    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.json({
        limit: 1024 ** 2,
    }));
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(cookieParser());

    const customMorganLogFormat = (tokens, req, res) => {

        // Define the colors for different status codes
        const statusColors = {
            200: ansiColors.green,
            201: ansiColors.green,
            204: ansiColors.green,
            305: ansiColors.red,
            400: ansiColors.yellow,
            404: ansiColors.yellow,
            500: ansiColors.red,
        };

        const status = tokens.status(req, res);
        const coloredStatus = statusColors[status] ? statusColors[status](status) : ansiColors.cyan(status);
        const now = `[${dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}]`;

        return [
            ansiColors.magenta([now, tokens.method(req, res)].join(' ')),
            tokens.url(req, res),
            coloredStatus,
            tokens['response-time'](req, res), 'ms',
        ].join(' ');

    };

    app.use(morgan(customMorganLogFormat));

    // Configure CORS options
    const corsOptions = {
        origin: '*',
        credentials: true, // Set to true if your requests include credentials (e.g., cookies, authentication headers)
        allowedHeaders: [
            'Content-Type',
            'Content-Disposition',
        ],
    };

    app.use(cors(corsOptions));

}


function setUpPublicFolders(app) {

    app.use('/public', express.static(join(dirname(''), '../public')));

}


function setUpRoutes(app) {

    const routes = [
        assignmentsRoute,
        usersRoute,
    ];

    for (const { router, path } of routes) {

        app.use(`/api/${path}`, router);

    }

}


function log() {

    const startupText = 'If the code doesn\'t bother you, don\'t bother it.';
    let asciiArt;

    if (DEV_MODE) {
        asciiArt = ansiColors.greenBright(ansiColors.bold(`- ${startupText} -`));
    } else {
        asciiArt = ansiColors.greenBright(figlet.textSync(startupText, 'Pagga'));
    }

    Loggeo.info('\n\n' + asciiArt + '\n');

}
