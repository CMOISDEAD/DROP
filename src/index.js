const path = require("path");
const express = require("express");
const hbs = require("express-handlebars");
const bodyParser = require('body-parser')
const env = require('node-env-file')

// Initialize
const app = express();
env(__dirname + '/.env')

// Configuration
app.set('port', process.env.PORT || 3000)
app.set("views", path.join(__dirname, "views"));
app.engine('.hbs', hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set("view engine", ".hbs");

const publicRoute = path.resolve(__dirname, 'public')  
app.use(express.static(publicRoute))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(express.json())
app.use(express.urlencoded())


// Middlewares

// Routes
app.use(require('./routes/index'))

// Starting
app.listen(app.get('port'), () => {
    console.log("server listen on port ->", app.get('port'));
});
