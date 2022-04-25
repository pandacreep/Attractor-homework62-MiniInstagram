'use strict'

const htmlSplashScreen = `
<div class="modal bg-black bg-opacity-25 d-block" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Authorization screen</h5>
            </div>
            <div class="modal-body">
                <form id="login-form">
                    <input id="login-form-username" type="text" name="username" class="form-control mb-1" placeholder="Login" required autofocus>
                    <input id="login-form-password" type="password" name="password" class="form-control mb-1" placeholder="Password" required>
                    <button id="closeModalSplashScreen" type="submit" class="btn btn-outline-primary btn-block">Enter</button>
                </form>
            </div>
        </div>
    </div>
</div>
`;

const htmlAppHeader = `
<div class="container-center">
    <nav class="container-center navbar navbar-expand-lg fixed-top">
        <a class="mx-2 navbar-brand" href="#">Instagram</a>
        <div class="collapse navbar-collapse ">
            <ul class="navbar-nav mr-4">
                <li class="nav-item">
                    <a id="login" class="nav-link" data-value="login" href="#">Login</a>
                </li>
            </ul>
        </div>
    </nav>
</div>
`;

const htmlAppNewPostForm = `
<div class="container-center">
    <div class="container">
        <div class="row">
            <form class="col-6 bg-info form-horizontal" id="newPost">
                <label for="formFileSm" class="form-label">Select file</label>
                <input class="form-control form-control-sm" id="formFileSm" type="file" name="file" multiple>
                <label for="postText" class="form-label">Some info about photo</label>
                <input type="text" class="form-control" id="postText" name="text">
                <input type="hidden" class="userId" id="userId" name="userId" value="${loggedUser.userId}">
                <button type="submit" class="my-2 btn btn-primary">Add post</button>
            </form>
        </div>
    </div>
    <div class="container">
        <div class="row justify-content-around" id="posts-container"></div>
    </div>
</div>
`;

function htmlPostElement(post) {
return `
<div id="${post.postId}" class="mt-2 cols-2 card post" style="width: 18rem; background-color: darkseagreen">
    <div class="h5 mx-2">
        Post from ${post.user.userName}
    </div>
    <img id="${post.postId}-pic" src='${post.image}' class="card-img-top" alt="image">
    <div class="card-body">
        <span id="${post.postId}-like">
            <span class="h1 mx-2 text-danger" id="${post.postId}-likedYes" hidden> 
                <i class="fas fa-heart"></i>
            </span>
            <span class="h1 mx-2 muted" id="${post.postId}-likedNot">
                <i class="far fa-heart"></i>
            </span>
        </span>
        <span id="${post.postId}-book">
            <span class="h1 mx-2 text-danger" id="${post.postId}-bookedYes" hidden> 
                <i class="fas fa-bookmark"></i>
            </span>
            <span class="h1 mx-2 muted" id="${post.postId}-bookedNot">
                <i class="far fa-bookmark"></i>
            </span>
        </span>
        <span class="h1 mx-2 muted" id="${post.postId}-comment-icon">
            <i class="far fa-comment"></i>
        </span>
        <p class="card-text">${post.text}</p>
        <div hidden id="${post.postId}-comment">
            <div class="mb-3">
                <label for="description" class="form-label">Comment</label>
                <textarea class="form-control" rows="3" id="${post.postId}-comment-text"></textarea>
                <a href="#" class="mt-2 btn btn-primary addComment" id="${post.postId}-comment-add">Ok!</a>
                <input type="hidden" class="userId" id="${post.postId}-comment-userid" name="userId" value="${loggedUser.userId}">
            </div>
        </div>
    </div>
    <ul class="list-group list-group-flush" id="${post.postId}-comments-area">
    </ul>
</div>
`;
}

function formHtml() {
    document.body.append(getAppDiv());
    document.getElementById('login').addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        showSplashScreen();
    });
    document.body.append(getSplashScreenDiv());
}

function getAppDiv() {
    let div = document.createElement('div');
    div.id = 'app';
    div.innerHTML = htmlAppHeader + htmlAppNewPostForm;
    return div;
}

function getSplashScreenDiv() {
    let div = document.createElement('div');
    div.id = 'splashScreen';
    div.innerHTML = htmlSplashScreen;
    return div;
}