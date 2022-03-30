import express from 'express';
import { router as qs_route } from './routes/question_set_route.mjs';
import { router as rooms_route } from './routes/rooms_route.mjs';
import { router as units_route } from './routes/units_route.mjs';
import { router as users_route } from './routes/users_route.mjs';

const app = express();
const PORT = 3000;

/*******************
    * Middleware
*******************/
app.use(express.json());
app.use('/questions', qs_route);
app.use('/rooms', rooms_route);
app.use('/units', units_route);
app.use('/users', users_route);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})