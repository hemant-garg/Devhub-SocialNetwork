const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();
const db = require('./config/keys').MONGO_URI;

mongoose.connect(db)
        .then(() => console.log('mongoDB connected !'))
        .catch(err => console.log(log));

app.get('/', (req, res) => {
    res.send('Hello there !');
});

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server running on port ', PORT);
})