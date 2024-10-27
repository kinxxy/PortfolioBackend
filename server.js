const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Routes for contacts and users
app.use('/api/contacts', require('./backend/routes/contactRoutes'));
app.use('/api/users', require('./backend/routes/userRoutes'));

// Welcome route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to DressStore application." });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
