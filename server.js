require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);

async function startServer(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to mongoDB Atlas');

        //start the server
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error('Error connecting to MongoDB:', err.message); 
        process.exit(1); // exit if the database does not connect.
    }
}
startServer();