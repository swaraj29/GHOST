const fs = require('fs');
const path = require('path');

// Function to add page markers
function addPageMarkers(text) {
    // Split text into pages (approximately 150 words per page)
    const wordsPerPage = 150;
    const words = text.split(/\s+/);
    const pages = [];
    let currentPage = [];
    let wordCount = 0;

    for (const word of words) {
        if (wordCount >= wordsPerPage) {
            pages.push(currentPage.join(' '));
            currentPage = [];
            wordCount = 0;
        }
        currentPage.push(word);
        wordCount++;
    }

    if (currentPage.length > 0) {
        pages.push(currentPage.join(' '));
    }

    // Add page markers
    return pages.map((page, index) => `## पेज ${index + 1}\n${page}`).join('\n\n');
}

// Process each story file
const storiesDir = path.join(__dirname, '../src/assets/stories');
const storyFiles = fs.readdirSync(storiesDir).filter(file => file.startsWith('story') && file.endsWith('.txt'));

storyFiles.forEach(file => {
    const filePath = path.join(storiesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Only process if content doesn't already have page markers
    if (!content.includes('## पेज')) {
        const newContent = addPageMarkers(content);
        fs.writeFileSync(filePath, newContent);
        console.log(`✅ Added page markers to ${file}`);
    } else {
        console.log(`⏭️ ${file} already has page markers`);
    }
});

console.log('📚 Story files processing complete!'); 