const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const { connectMongo } = require('./config/mongo');
connectMongo().catch(err => console.error('MongoDB connection failed:', err));


const app = express();
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  connectMongo().catch(err => console.error('MongoDB connection failed:', err));
}


// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files (CSS, client-side JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const session = require('express-session');

app.use(session({
  secret: process.env.SESSION_SECRET || 'campus-eats-dev-secret',
  resave: false,
  saveUninitialized: false,
}));
// Make the logged-in user available to every view, without passing it manually every time
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});


// Routes
const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');

app.use('/', indexRoutes);
app.use('/api', apiRoutes);

// Database Test Route
const db = require('./config/db');
app.get('/db-test', async (req, res) => {
    try {
        const result = await db.one('SELECT NOW() AS current_time');
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
