const express = require('express');
const app = express();
const axios = require('axios');
const moment = require('moment');
const Chart = require('chart.js');

app.use(express.static('public'));
app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});