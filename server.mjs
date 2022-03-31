import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { router as qs_route } from './routes/question_set_route.mjs';
import { router as rooms_route } from './routes/rooms_route.mjs';
import { router as units_route } from './routes/units_route.mjs';
import { router as users_route } from './routes/users_route.mjs';
import { router as auth_route } from './routes/auth_route.mjs';

const app = express();
const PORT = 3001;

/*******************
    * Middleware
*******************/
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/questions', qs_route);
app.use('/rooms', rooms_route);
app.use('/units', units_route);
app.use('/users', users_route);
app.use('/auth', auth_route);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})