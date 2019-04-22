const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');

const googleRoutes = require('./routes/auth/googleRoutes');
const authRoutes = require('./routes/api/userRoutes');
const profileRoutes = require('./routes/api/profileRoutes');
const postRoutes = require('./routes/api/postRoutes');

require('./services/passportLocal')(passport);
require('./services/passportGoogle')(passport);

const keys = require('./config/keys');
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport config
app.use(cookieSession({ maxAge: 24 * 60 * 60 * 1000, keys: [keys.secretKey] }));
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World'));

app.use('/auth/google', googleRoutes);
app.use('/api/users', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/posts', postRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
