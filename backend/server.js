const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Logs Directory Setup
const LOG_DIR = path.join(__dirname, 'logs');
if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
}

// Access Logging Middleware
app.use((req, res, next) => {
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
    fs.appendFile(path.join(LOG_DIR, 'access.log'), logMessage, (err) => {
        if (err) console.error('Failed to write to log file:', err);
    });
    next();
});

// API Endpoint
app.get('/api/demo', (req, res) => {
    res.json({
        message: 'Hello from Backend!',
        git_info: 'feature/backend-api-demo',
        docker_info: 'Running inside container' // Placeholder
    });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
