const fs = require('fs');
const path = require('path');

// Define source and destination directories
const sourceDir = path.join(__dirname, '../src/assets/stories');
const destDir = path.join(__dirname, '../android/app/src/main/assets/stories');

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// Get all story files
const storyFiles = fs.readdirSync(sourceDir).filter(file => file.startsWith('story') && file.endsWith('.txt'));

// Copy each file
storyFiles.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);
    
    // Read and write with UTF-8 encoding
    const content = fs.readFileSync(sourcePath, 'utf8');
    fs.writeFileSync(destPath, content, 'utf8');
    console.log(`✅ Copied ${file} to Android assets`);
});

console.log('📚 All story files have been copied to Android assets!'); 