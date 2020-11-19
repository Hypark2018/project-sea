function signUp(username, nickname, password) {
    const query = `
        mutation {
            signUp(username: ${username}, nickname: ${nickname} password: ${password} ) {
                username
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

    (async function() {
        const result = await fetch('http://192.168.219.106:3000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({query})
        });
        const response = await result.json();
        console.log(response.data.signUp.username);
        console.log(response.errors);
        let commentsbox = document.querySelector(".cmt-list");
        let comments = response.data.board.comments;



        // for(var i = 0;i < comments.length;i++) {
        //     if(comments[i].state = "REPLY") {
                
        //     } else {
        //         commentsbox.appendChild(document.createElement(`
        //         <li class="ub-content">
        //             <div class="cmt-info clear">
        //                 <div class="cmt-nickbox">
        //                     <span class="gallery-writer ub-writer">
        //                         <span class="nickname">
        //                             <label>${comments[i].username}</label>
        //                         </span>
        //                     </span>
        //                 </div>
        //                 <div class="clear cmt-txtbox btn-reply-write-all">
        //                     <p class="usertxt ub-word"> ${comments[i].content} </p>
        //                 </div> 
        //                 <div class="fr clear">
        //                     <span class="date_time"> 11.11 08:47:06 </span>
        //                     <div class="cmt-del">
        //                         <button type="button" class="btn-delete">삭제</button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </li>`));
        //     }
        // }
    
        // document.querySelector(".cmt-list").textContent = response.data.board.content;
        // document.querySelector("#comment-box").appendChild()
    })();
}

