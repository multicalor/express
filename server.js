require('dotenv').config()
const express = require('express');
const cors = require('cors');
const router = require('./src/routes/index');
const PORT = process.env.PORT || 5000;

//error handle
const ApiError = require('./src/error/ApiError')
const errorHandler = require('./src/middleware/ErrorHandlingMiddleware')

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api', router);


app.get('/', (req, res) => {
  try {
    throw  ApiError.forbidden('test error')

    res.status(200).json({message: 'WORKING!!!'})
  } catch (e) {
    return res.status(e.status).json({message: e.message})
  }
  
  
})

app.use(errorHandler);

const start = async () => {
  try{
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e)
  }
}

start();
