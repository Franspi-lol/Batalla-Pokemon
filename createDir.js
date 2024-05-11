const fs = require('fs');
const path = require('path');

// Define the directory path
const dirPath = path.join('C:', 'Users', 'franc', 'OneDrive', 'Escritorio', 'Nueva carpeta', 'Batalla-Pokemon', 'dist', 'batallas-pokemon', 'browser');

// Check if the directory exists
if (!fs.existsSync(dirPath)) {
    // If the directory doesn't exist, create it
    fs.mkdirSync(dirPath, { recursive: true });
}