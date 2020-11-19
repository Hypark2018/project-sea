async function createProject(subject, content, category, min, max, open, lastDate) {
    const query = `
        mutation {
            createProject(subject: "${subject}", content: "${content}", category: "${category}",
                            min: ${min}, max: ${max}, open: ${open}, lastDate: "${lastDate}")
        }
    `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }
    const created = response.data.createProject; // 성공 1, 실패 0
}

async function cancelProject(id) {
    const query = `
        mutation {
            cancelProject(id: ${id})
        }
    `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }
    const cancelled = response.data.cancelProject; // 성공 1, 실패 0
}

async function reviseProject(id, subject, content, open) {
    const query = `
        mutation {
            reviseProject(id: ${id}, subject: "${subject}", content: "${content}", open: ${open})
        }
    `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }
    const revised = response.data.reviseProject; // 성공 1, 실패 0
}

async function findProject(id) {
    const query = `
        query{
            findProject(id: 1) {
                board {
                    category
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
                    content
                    createdTime
                    id
                    readCount
                    recommendCount
                    subject
                    writer
                }
                createdTime
                id
                state
                team {
                    maxSize
                    members {
                        teamMemberState
                        teamPermission
                        username
                    }
                    minSize
                    teamState
                }
                weClassId
            }
        }
    `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }

    const rid = response.data.findProject.id;
    const state = response.data.findProject.state;
    const createdTime = response.data.findProject.createdTime;

    const board = response.data.findProject.board;
    const board_rid = board.id;
    const board_writer = board.category;
    const board_subject = board.subject;
    const board_content = board.content;
    const board_createdTime = board.createdTime;
    const board_readCount = board.readCount;
    const board_recommendCount = board.recommendCount;
    const board_comments = board.comments.comments;
    if(board_comments != null) {
        for(let i=0;i<board_comments.length;i++) {
            const commentId = board_comments[i].id;
            const commentWriter = board_comments[i].writer;
            const commentContent = board_comments[i].content;
            const commentState = board_comments[i].commentState;
            const commentCreatedTime = board_comments[i].createdTime;
        }
    }
    const board_pageInfo = board.comments.page;

    const team = response.data.findProject.team;
    const team_maxSize = team.maxSize;
    const team_minSize = team.minSize;

    const teamMembers = team.members;
    if(teamMembers != null) {
        for(let i=0;i<teamMembers.length;i++) {
            const teamMemberUsername = teamMembers[i].username;
            const teamMemberPermission = teamMembers[i].teamPermission;
            const teamMemberState = teamMembers[i].teamMemberState;
        }
    }
    const weClassId = response.data.findProject.weClassId;
}

async function bestProject(minDate, maxDate, size, category) {
    const query = category ? `
        query {
            bestProject(minDate: "${minDate}", maxDate: "${maxDate}", size: ${size}, "${cateogry}") {
                category
                id
                recommendCount
                subject
                projectState
            }
        }
    ` : `query {
            bestProject(minDate: "${minDate}", maxDate: "${maxDate}", size: ${size}) {
                category
                id
                recommendCount
                subject
                projectState
            }
        }
    `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }

    const bestProject = response.data.bestProject;

    if(bestProject != null) {
        for(let i=0;i<bestProject.length;i++) {
            const rid = bestProject[i].id;
            const subject = bestProject[i].subject;
            const state = bestProject[i].projectState;
            const category = bestProject[i].category;
            const recommendCount = bestProject[i].recommendCount;
        }
    }
}

async function findMyProject(page, size) {
    const query = `
        query {
            findMyProject(page: ${page}, size: ${size}) {
                page {
                    number
                    size
                    totalElements
                    totalPages
                }
                projects {
                    category
                    createdTime
                    id
                    projectState
                    recommendCount
                    subject
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

    const projects = response.data.findMyProject.projects;

    if(proejcts != null) {
        for(let i=0;i<projects.length;i++) {
            const rid = projects[i].id;
            const subject = projects[i].subject;
            const content = projects[i].content;
            const category = projects[i].category;
            const state = projects[i].projectState;
            const recommendCount = projects[i].recommendCount;
            const createdTime = projects[i].createdTime;
        }
    }

    const pageInfo = response.data.findMyProject.page;
}

async function searchProject(subject, state, category, username, page, size) {
    let search = `searchProject(page: ${page}, size: ${size}`;
    search = subject ? search = `${search}, subject: "${subject}"` : search;
    search = category ? search = `${search}, category: "${category}"` : search;
    search = username ? search = `${search}, username: "${username}"` : search;
    search = state ? search = `${search}, state: "${state}"` : search;
    search += ')';
    const query = `
        query {
            ${search} {
                page {
                    number
                    size
                    totalElements
                    totalPages
                }
                projects {
                    category
                    createdTime
                    id
                    projectState
                    recommendCount
                    subject
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

    const projects = response.data.searchProject.projects;

    if(proejcts != null) {
        for(let i=0;i<projects.length;i++) {
            const rid = projects[i].id;
            const subject = projects[i].subject;
            const category = projects[i].category;
            const state = projects[i].projectState;
            const recommendCount = projects[i].recommendCount;
            const createdTime = projects[i].createdTime;
        }
    }

    const pageInfo = response.data.searchProject.page;
}