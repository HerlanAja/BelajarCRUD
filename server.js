const express = require('express');
const bodyParser = require('body-parser');
const profileRoutes = require('./routes/profile');
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/profiles', profileRoutes);

// Runing server 
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
