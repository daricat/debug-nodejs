const express = require('express');
const app = express();
const bodyParser = require('body-parser').json();

const { sequelize } = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');

const PORT = 4000;
const ROUTER_PATHS = {
    AUTH: '/api/auth',
    GAME: '/api/game',
};

sequelize.sync({ force: true });

app.use(bodyParser);
app.use(ROUTER_PATHS.AUTH, user);
app.use(require('./middleware/validate-session'))
app.use(ROUTER_PATHS.GAME, game);

app.listen(PORT, () => console.log(`App listen on ${PORT} port`));
