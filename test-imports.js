console.log('Testing imports...');

try {
    console.log('1. Loading UIHelper...');
    const UIHelper = require('./src/utils/ui-helper');
    console.log('✓ UIHelper loaded');

    console.log('2. Loading Config...');
    const Config = require('./src/utils/config');
    console.log('✓ Config loaded');

    console.log('3. Loading Logger...');
    const Logger = require('./src/utils/logger');
    console.log('✓ Logger loaded');

    console.log('4. Loading Achievements...');
    const Achievements = require('./src/utils/achievements');
    console.log('✓ Achievements loaded');

    console.log('5. Loading FileCommands...');
    const FileCommands = require('./src/commands/files');
    console.log('✓ FileCommands loaded');

    console.log('6. Loading FolderCommands...');
    const FolderCommands = require('./src/commands/folders');
    console.log('✓ FolderCommands loaded');

    console.log('7. Loading ExploreCommands...');
    const ExploreCommands = require('./src/commands/explore');
    console.log('✓ ExploreCommands loaded');

    console.log('8. Loading FavoritesCommands...');
    const FavoritesCommands = require('./src/commands/favorites');
    console.log('✓ FavoritesCommands loaded');

    console.log('9. Loading HistoryCommands...');
    const HistoryCommands = require('./src/commands/history');
    console.log('✓ HistoryCommands loaded');

    console.log('10. Loading AssistantCommands...');
    const AssistantCommands = require('./src/commands/assistant');
    console.log('✓ AssistantCommands loaded');

    console.log('11. Loading SystemCommands...');
    const SystemCommands = require('./src/commands/system');
    console.log('✓ SystemCommands loaded');

    console.log('12. Loading EasterEggs...');
    const EasterEggs = require('./src/commands/eastereggs');
    console.log('✓ EasterEggs loaded');

    console.log('\n✅ All modules loaded successfully!');
} catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
}
