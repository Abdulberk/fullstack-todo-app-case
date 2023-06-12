const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const { connectDB, disconnect } = require('./connection');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
import todoRoutes from './routes/todoRoutes';
import authRoutes from './routes/authRoutes';





const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB()
  .then(() => {

    app.use('/', todoRoutes);
    app.use('/', authRoutes);

    if (process.env.NODE_ENV === 'production') {
     app.use( express.static(path.join(__dirname, '../../frontend/build')));
     app.get( '*', (req: any, res: any) => {
        res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
      });
    }

    



    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error('Bağlantı başarısız!', err);
  });

