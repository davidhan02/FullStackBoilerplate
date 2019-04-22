const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const keys = require('./config/keys');

const authRoutes = require('./routes/api/userRoutes');
const profileRoutes = require('./routes/api/profileRoutes');
const postRoutes = require('./routes/api/postRoutes');

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World'));

app.use('/api/users', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/posts', postRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
