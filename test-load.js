const fs = require('fs');

try {
    const WinAssist = require('./index.js');
    console.log('Module loaded successfully');
    WinAssist.init();
} catch (error) {
    const errorLog = `Error: ${error.message}\nStack: ${error.stack}`;
    fs.writeFileSync('error.log', errorLog);
    console.log('Error logged to error.log');
}
