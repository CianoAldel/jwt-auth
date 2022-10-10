import express from 'express';
import routes from './routes';
const port = process.env.PORT || 3000;

const path = require('path')

const cors = require("cors");

const app = express();
app.use(express.json())


global.__basedir = __dirname;

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

app.use("/images", express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'resources')));

app.use(config.prefix, routes);


app.listen(port, () => {
    console.log("App is running on port " + port);
});