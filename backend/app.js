const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const errorMiddleware =  require('./middlewares/error');
const cookieParser = require('cookie-parser');
const cors = require('cors')
 
dotenv.config({
    path:path.join(__dirname,'config','config.env')
});
app.use(cors({origin: 'http://localhost:4200'}))

const employee = require('./routes/employee');
const auth = require('./routes/auth');


app.use(express.json());
app.use(cookieParser());

app.use('/api',employee);
app.use('/api', auth);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/dist/frontend')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/dist/frontend/index.html'))
    })
}

app.use(errorMiddleware);

module.exports = app;