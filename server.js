const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//body parser middleware
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

const db = require('./config/keys').MONGO_URI;

mongoose
	.connect(db, {
		useNewUrlParser: true
	})
	.then(() => console.log('mongoDB connected !'))
	.catch(err => console.log(log));

// passport middleware
app.use(passport.initialize());
 

// passport config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Server static assets if in production
// if (process.env.NODE_ENV === "production") {
// 	const path = require("path");
// 	app.use(express.static(path.join(__dirname, "client/build")));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.join(__dirname + "/client/build/index.html"));
// 	});
// }
if (process.env.NODE_ENV === 'production') {
	const path = require('path');

	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('Server running on port ', PORT);
});
