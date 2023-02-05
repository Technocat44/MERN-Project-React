const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;
const { errorHandler } = require('./middleware/errorMiddleware')
const colors = require('colors') 
const connectDB = require('./config/db')

// Connect to database
connectDB();

const app = express();

// This allows us to parse the body from any req object
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/*
express.get('/',(req, res, next) => {
    foo.findAll()
    .then ( bar => {
       res.send(bar)
     } )
    .catch(next); // error passed on to the error handling route
})
*/

app.get('/', (req, res) => {

    res.status(200).json({ message: "Welcome to the support desk API"})
})


/* When a request for /api/users comes in to the server we use the callback function 
which goes to routes/userRoutes.js,
which when its a post request, uses the callback function registerUser
which is in controllers/userController.js and that function handles the request.
*/
app.use('/a', (req, res, next) => {

})
app.use('/api/users', (require('./routes/userRoutes')))

app.use(errorHandler)


app.listen(
    PORT,
    () => console.log(`Server started on port ${PORT}`) 
)


