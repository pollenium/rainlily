const express = require('express');

const app = express();
const port = 3000

app.use(express.static('dist'));
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));
