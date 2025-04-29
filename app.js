const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter');
const viewRouter = require('./routes/viewRoutes');
const objectRouter = require('./routes/objectRouter');
const mediaRouter = require('./routes/mediafileRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cookieParser());

app.use('/', viewRouter);
app.use('/api/v1/files', objectRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/media', mediaRouter);

module.exports = app;

