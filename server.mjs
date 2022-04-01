import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { router as qs_route } from './routes/question_set_route.mjs';
import { router as rooms_route } from './routes/rooms_route.mjs';
import { router as units_route } from './routes/units_route.mjs';
import { router as users_route } from './routes/users_route.mjs';
import { router as auth_route } from './routes/auth_route.mjs';
import { router as orgs_route } from './routes/orgs_route.mjs';
import { router as ref_router } from './routes/refresh_route.mjs';

const app = express();
const PORT = 3001;

/*******************
    * Middleware
*******************/
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    // "origin": "http://localhost:3000/",
    "credentials": true,
    "origin": 'http://localhost:3000',
    "methods": ['GET','HEAD','PUT','PATCH','POST','DELETE'],
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
//     res.header('Access-Control-Allow-Credentials','true');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
//     res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')
//     next();
//   });

app.use('/questions', qs_route);
app.use('/rooms', rooms_route);
app.use('/units', units_route);
app.use('/users', users_route);
app.use('/auth', auth_route);
app.use('/orgs', orgs_route);
app.use('/refresh', ref_router);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})