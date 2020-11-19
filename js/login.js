const query = `
            mutation {
                signIn(username: "test1", password: "test", scopes: ["board_read", "board_write", "project_read"
                    , "project_write", "notification_read", "team_read"]) {
                    access_token,
                    refresh_token,
                    scope
                }
            }
        `
        // const query = `
        //     query {
        //         myProfile {
        //             username,
        //             nickname
        //         }
        //     }
        // `

        const test = async function() {
            const result = await fetch('http://192.168.219.106:3000/graphql', {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({query})
            });
            const response = await result.json();
            console.log(response.data.signIn);
        }
        test();