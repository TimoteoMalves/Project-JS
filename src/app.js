import 'express-async-errors';
import express from 'express';
import connection from './database/connection.js';
import routes from './routes/router.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

const port = 3002;

// to use all the data in json format
app.use(express.json());

// to create the API connection when running it
connection;

// to tell that all of our requests are going to routes
app.use(routes); 

// to activate the middleware error
app.use(errorMiddleware);

// to initiate the server on port 3002
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})