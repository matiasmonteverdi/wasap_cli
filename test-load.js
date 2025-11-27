try {
    const WinAssist = require('./index.js');
    console.log('Module loaded successfully');
    WinAssist.init();
} catch (error) {
    console.error('Error loading module:');
    console.error(error.message);
    console.error(error.stack);
}
