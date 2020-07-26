const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const api = require('./routes/api');
app.use('/api', api);

app.listen(PORT, () =>
	console.log(`Server started on http://localhost:${PORT}`)
);
