async function createBoard(subject, content, category) {
    const query = `
        mutation {
            createBoard(subject: "${subject}", content: "${content}", category: "${category}")
        }
    `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }
    const created = response.data.createBoard; // 성공 1, 실패 0
}

async function deleteBoard(id) {
    const query = `
        mutation {
            deleteBoard(id: ${id})
        }
    `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }
    const deleted = response.data.deleteBoard; // 성공 1, 실패 0
}

async function reviseBoard(id, subject, content) {
    const query = `
        mutation {
            reviseBoard(id: ${id}, subject: "${subject}", content: "${content}")
        }
    `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }
    const revised = response.data.reviseBoard; // 성공 1, 실패 0
}

async function findBoard(id, size) {
    const query = `
        query{
            findBoard(id: ${id}, size: ${size}) {
                category
                content
                createdTime
                id
                readCount
                recommendCount
                subject
                writer
                comments {
                    comments {
                        commentState
                        content
                        createdTime
                        id
                        writer
                    }
                    page {
                        number
                        size
                        totalElements
                        totalPages
                    }
                }
            }
        }
    `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }
    const rid = response.data.findBoard.id;
    const writer = response.data.findBoard.category;
    const subject = response.data.findBoard.subject;
    const content = response.data.findBoard.content;
    const createdTime = response.data.findBoard.createdTime;
    const readCount = response.data.findBoard.readCount;
    const recommendCount = response.data.findBoard.recommendCount;
    const comments = response.data.findBoard.comments.comments;
    if(comments != null) {
        for(let i=0;i<comments.length;i++) {
            const commentId = comments[i].id;
            const commentWriter = comments[i].writer;
            const commentContent = comments[i].content;
            const commentState = comments[i].commentState;
            const commentCreatedTime = comments[i].createdTime;
        }
    }
    const pageInfo = response.data.findBoard.comments.page;
}

async function findComments(id, page, size) {
    const query = `
        query{
            findComments(id: ${id}, page: ${page}, size: ${size}) {
                comments {
                    commentState
                    content
                    createdTime
                    id
                    writer
                }
                page {
                    number
                    size
                    totalElements
                    totalPages
                }
            }
        }
    `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }
    const comments = response.data.findComments.comments;
    if(comments != null) {
        for(let i=0;i<comments.length;i++) {
            const commentId = comments[i].id;
            const commentWriter = comments[i].writer;
            const commentContent = comments[i].content;
            const commentState = comments[i].commentState;
            const commentCreatedTime = comments[i].createdTime;
        }
    }
    const pageInfo = response.data.findComments.page;
}

async function bestBoard(minDate, maxDate, size, category) {
    const query = category ? `
        query {
            bestBoard(minDate: "${minDate}", maxDate: "${maxDate}", size: ${size}, "${cateogry}") {
                category
                id
                recommendCount
                subject
                writer
            }
        }
    ` : `query {
            bestBoard(minDate: "${minDate}", maxDate: "${maxDate}", size: ${size}) {
                category
                id
                recommendCount
                subject
                writer
            }
        }
    `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }

    const bestBoard = response.data.bestBoard;

    if(bestBoard != null) {
        for(let i=0;i<bestBoard.length;i++) {
            const rid = bestBoard[i].id;
            const subject = bestBoard[i].subject;
            const writer = bestBoard[i].writer;
            const category = bestBoard[i].category;
            const recommendCount = bestBoard[i].recommendCount;
        }
    }
}

async function findMyBoard(page, size) {
    const query = `
        query {
            findMyBoards(page: ${page}, size: ${size}) {
                boards {
                    category
                    content
                    createdTime
                    id
                    subject
                }
                page {
                    number
                    size
                    totalElements
                    totalPages
                }
            }
        }
    `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }

    const boards = response.data.findMyBoards.boards;

    if(boards != null) {
        for(let i=0;i<boards.length;i++) {
            const rid = boards[i].id;
            const subject = boards[i].subject;
            const content = boards[i].content;
            const category = boards[i].category;
            const createdTime = boards[i].createdTime;
        }
    }

    const pageInfo = response.data.findMyBoards.page;
}

async function createComment(id, content, originId) {
    const query = 
    originId ? `
            mutation {
                createComment(id: ${id}, content: "${content}", commentId: ${originId})
            }
        ` : `
            mutation {
                createComment(id: ${id}, content: "${content}")
            }
        `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }

    const create = response.data.createComment;
}

async function deleteComment(id) {
    const query = `
            mutation {
                deleteComment(id: ${id})
            }
        `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }

    const deleted = response.data.deleteComment;
}

async function reviseComment(id, comment) {
    const query = `
            mutation {
                reviseComment(id: ${id}, comment: ${comment})
            }
        `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }

    const revised = response.data.reviseComment;
}

async function recommendBoard(id) {
    const query = `
            mutation {
                recommendBoard(id: ${id})
            }
        `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }

    const recommend = response.data.recommendBoard;
    console.log(recommend);
}

async function searchBoard(subject, writer, category, page, size) {
    let search = `searchBoard(page: ${page}, size: ${size}`;
    search = subject ? search = `${search}, subject: "${subject}"` : search;
    search = writer ? search = `${search}, writer: "${writer}"` : search;
    search = category ? search = `${search}, category: "${category}"` : search;
    search += ')';
    const query = `
        query {
            ${search} {
                boards {
                    category
                    createdTime
                    id
                    readCount
                    recommendCount
                    subject
                    writer
                }
                page {
                    number
                    size
                    totalElements
                    totalPages
                }
            }
        }
    `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }

    const boards = response.data.searchBoard.boards;

    if(boards != null) {
        for(let i=0;i<boards.length;i++) {
            const rid = boards[i].id;
            const subject = boards[i].subject;
            const writer = boards[i].writer;
            const category = boards[i].category;
            const readCount = boards[i].readCount;
            const recommendCount = boards[i].recommendCount;
            const createdTime = boards[i].createdTime;

            console.log(rid, subject, writer, category, readCount, recommendCount, createdTime);
        }
    }

    const pageInfo = response.data.searchBoard.page;
}

// searchBoard(null,null,"FREE",0,10);
// searchBoard("te",null,"FREE",0,10);
// searchBoard("te","te","FREE",0,10);
// createBoard('test', 'test', 'FREE');
// deleteBoard(1);
// findBoard(1, 10);
// bestBoard("2020-11-19", "2020-11-21", 10);
// findMyBoard(0, 10);
// recommendBoard(1);
// createComment(1, "test", 1);