const join_path = require('./utils/join_path');
require('dotenv').config({ path: join_path('config', '.env') })
require('express-async-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.static('public'));



require('./startup/route-handler')(app);

require('./startup/error-handler')(app);

require('./startup/db')(app);


