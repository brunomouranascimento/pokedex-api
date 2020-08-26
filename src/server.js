const express = require('express');
const compression = require('compression');
const cors = require('cors');

const app = express();

app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(cors());

require('./app/routes/core/routes')(app);

app.listen(process.env.PORT || 3333);
