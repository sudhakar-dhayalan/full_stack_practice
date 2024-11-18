const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/', (req, res) => {
  res.send('Server is Up')
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})