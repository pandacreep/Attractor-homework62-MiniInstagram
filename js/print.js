'use strict'

function printHeader(text) {
    console.log(`----- ${text}`);
}

function printUsers() {
    printHeader("list of users");
    for (let i = 0; i < users.length; i++) {
        console.log(users[i]);
    }
}

function printPosts() {
    printHeader("list of all posts");
    for (let i = 0; i < posts.length; i++) {
        console.log(posts[i]);
    }
}

function printPostsByUser(user) {
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].user == user) {
            console.log(posts[i]);
        }
    }
}

function printPostChain(postId) {
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].postId == postId) {
            console.log(posts[i]);
        }
    }
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].referencePostId == postId) {
            console.log(posts[i]);
        }
    }
}

function predefinedConsoleOutput() {
    printUsers();
    printPosts();
    printHeader("list of posts for user1");
    printPostsByUser(user1);
    printHeader("post #5 with all comments");
    printPostChain('postId5');
}