const config = require('config.js');

async function createBoard(subject, content, category) {
    const query = `
        mutation {
            createBoard(subject: "${subject}", content: "${content}", category: "${category}")
        }
    `

    const response = await fetch(path, info(query));
}