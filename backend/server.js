const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');  
const studentsRouter = require('./routes/students');
const app = express();

app.use(express.json());
app.use(cors());


dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {  
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));


app.use('/students', studentsRouter);

const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
