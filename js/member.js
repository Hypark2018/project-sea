async function signUp(username, nickname, password) {
    const query = `
        mutation {
            signUp(username: "${username}", nickname: "${nickname}", password: "${password}" ) {
                username
            }
        }
    `
    
    const result = await fetch(path, request(query));
    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }
    const resultName = response.data.signUp.username;
}

async function signIn(username, password) {
    const query = `
        mutation {
            signIn(username: "${username}", password: "${password}", scopes: ["board_read", "board_write", "notification_read",
                "project_read", "project_write", "team_read"]) {
                access_token
                refresh_token
                scope
            }
        }
    `

    const result = await fetch(path, request(query));
    

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }
    // const access_token = response.data.signIn.access_token;
    // const refresh_token = response.data.signIn.refresh_token;
    // const scope = response.data.signIn.scope;
}

async function myProfile() {
    const query = `
        query {
            myProfile {
                createdTime
                nickname
                permission
                username
            }
        }
    `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }
    const nickname = response.data.myProfile.nickname;
    const username = response.data.myProfile.username;
    const permission = response.data.myProfile.permission;
    const createdTime = response.data.myProfile.createdTime;
}

async function signOut() {
    const query = `
        query {
            signOut
        }
    `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }
    const signOut = response.data.signOut; // true or false
}

async function isSign() {
    const query = `
        query {
            myProfile {
                username
            }
        }
    `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }
    const username = response.data.myProfile.username;
    if(username) {

    }else {

    }
}

// signUp("test100", "test100", "test");
// signIn('test1', 'test');
// myProfile();
// signOut();