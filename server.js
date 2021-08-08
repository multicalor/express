require('dotenv').config()
const express = require('express');
const cors = require('cors');
const router = require('./src/routes/index');
const errorHandler = require('./src/middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api', router);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.status(200).json({message: 'WORKING!!!'})
})

const start = async () => {
  try{
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e)
  }
}

start();
