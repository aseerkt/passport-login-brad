const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

// Bring in process.env variables
require('dotenv').config();

const app = express();

// Passport config
require('./config/passport')(passport);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((conn) => {
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  })
  .catch((err) => console.log(`Couldn't connect to MongoDB: Error -> ${err}`));

// Sessions
app.use(
  session({
    secret: 'your_secret',
    resave: true,
    saveUninitialized: true,
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect-Flash
app.use(flash());

// Global vars (res.locals)
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  // req.flash('error') comming from passport
  res.locals.error = req.flash('error');
  next();
});

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// body-parser
app.use(express.urlencoded({ extended: false }));

// Use Routes
app.use('/', require('./routes'));
app.use('/users', require('./routes/users'));

// Serve static files (bootswatch, fontawesome, bootstrap, jquery)
require('./serve-static')(app, express, path);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
