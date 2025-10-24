const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const medicineRoutes = require('./routes/medicineRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://curacare:24505A0511@curacare.qb5myjw.mongodb.net/?appName=curacare', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/medicines', medicineRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
