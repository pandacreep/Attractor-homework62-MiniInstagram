'use strict'

formHtml();
document.getElementById('login-form').addEventListener('submit', login());
addListenerToAddPostForm();
checkLogin();
addPost(createPostElement(post1));

function checkLogin() {
    const user = restoreUser();
    if (!user) {
        console.log('No user key found in the local storage');
        showSplashScreen();
    } else {
        console.log('User key was found in the local storage')
        console.log(user);
        hideSplashScreen();
    }
}

function createNewPost(image, postText) {
    let post = { postId: 'postId' + ++postIdCounter, user: loggedUser, referencePostId: null,
        text: `${postText}`, isLiked: false, isBooked: false,
        image: `${image}`
    }
    posts.push(post);
    addPost(createPostElement(post));
    return post.user.userId;
}

function addListenerToCommentIcon(postElement) {
    const commentForm = document.getElementById(`${postElement.id}-comment`);

    $(`#${postElement.id}-comment-icon`).on('click', e => {
        e.stopPropagation();
        e.preventDefault();
        $(`#${postElement.id}-comment`).removeAttr('hidden');
    });
    $(`#${postElement.id}-comment-add`).on('click', async e => {
        e.stopPropagation();
        e.preventDefault();
        const commentText = document.getElementById(`${postElement.id}-comment-text`);
        const commentsArea = document.getElementById(`${postElement.id}-comments-area`);
        const commentUser = document.getElementById(`${postElement.id}-comment-userid`)
        commentsArea.innerHTML += `<li class="list-group-item" style="background-color: darkseagreen">${commentText.value}</li>`;
        commentForm.hidden = true;
        const data = new FormData();
        data.set('comment', commentText.value);
        data.set('postId', postElement.id);
        data.set('userId', commentUser.value);
        commentText.value = "";
        let posts = await sendDataToServer(data);
    })
}

async function sendDataToServer(data) {
    let posts = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: data,
        header: {
            'Content-Type': 'application/json;charset=utf8'
        }
    });
    console.log(posts);
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function addListenerToAddPostForm() {
    let formHandler = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const imgSource = document.getElementById('formFileSm').files[0];
        const imageBase64 = await toBase64(imgSource);
        const postText = data.get('text');
        const userId = createNewPost(imageBase64, postText);
        data.set('userId', userId);
        let posts = await sendDataToServer(data);
    }
    $('#newPost').on('submit', formHandler);
}

function createPostElement(post) {
    let div = document.createElement('div');
    div.innerHTML = htmlPostElement(post);
    return div.firstElementChild;
}

function login() {
    return e => {
        e.stopPropagation();
        e.preventDefault();
        const userFormData = new FormData(e.target);
        const user = Object.fromEntries(userFormData);
        saveUser(user);
        const userObj = {userId: ++userIdCounter, userName: user.username, password: user.password, isLogged: false};
        users.push(userObj);
        loginUser(userObj);
        hideSplashScreen();
    };
}

function showSplashScreen() {
    document.getElementById('splashScreen').hidden = false;
    document.getElementById('login-form-username').value = "";
    document.getElementById('login-form-password').value = "";
    document.body.classList.remove("no-scroll");
}

function hideSplashScreen() {
    document.getElementById('splashScreen').hidden = true;
    document.body.classList.add("no-scroll");
}

function addPost(postElement) {
    if (isPostElementShown(postElement)) {
        console.log("Post already shown on the page!");
        return;
    }
    document.getElementById('posts-container').append(postElement);
    handleClickOnLike(postElement);
    handleClickOnBook(postElement);
    handleDoubleClickOnImage(postElement);
    addListenerToCommentIcon(postElement);
}

function isPostElementShown(postElement) {
    let postsShown = document.getElementById('posts-container')
        .getElementsByClassName('post');
    for (let i = 0; i < postsShown.length; i++) {
        if(postsShown[i].id === postElement.id) {
            return true;
        }
    }
    return false;
}

function handleClickOnLike(postElement) {
    let likeSymbol = document.getElementById(postElement.id + '-like')
    likeSymbol.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        let post = findPostById(postElement.id);
        post.isLiked = changeStatus(postElement, post.isLiked, '-likedNot', '-likedYes');
    });
}

function handleClickOnBook(postElement) {
    let bookSymbol = document.getElementById(postElement.id + '-book')
    bookSymbol.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        let post = findPostById(postElement.id);
        post.isBooked = changeStatus(postElement, post.isBooked, '-bookedNot', '-bookedYes')
    });
}

function handleDoubleClickOnImage(postElement) {
    let likeSymbol = document.getElementById(postElement.id + '-pic')
    likeSymbol.addEventListener('dblclick', e => {
        e.stopPropagation();
        e.preventDefault();
        let post = findPostById(postElement.id);
        post.isLiked = changeStatus(postElement, post.isLiked, '-likedNot', '-likedYes');
    });
}

function changeStatus(postElement, objectStatus, idPostfixNot, idPostfixYes) {
    if (objectStatus) {
        objectStatus = false;
        document.getElementById(postElement.id + idPostfixNot).hidden = false;
        document.getElementById(postElement.id + idPostfixYes).hidden = true;
    } else {
        objectStatus = true;
        document.getElementById(postElement.id + idPostfixNot).hidden = true;
        document.getElementById(postElement.id + idPostfixYes).hidden = false;
    }
    return objectStatus;
}

function createCommentElement(comment) {
    if (comment.referencePostId === null) {
        console.log('It is not a comment as referencePostId is null');
    }
    let div = document.createElement('div');
    let html = `<p style="margin-bottom: 5px;">comment from ${comment.user.userName}</p>`;
    html = html + `<p style="margin-top: 0px; margin-left: 30px;">${comment.text}</p>`;
    div.innerHTML = html;
    div.id = comment.postId;
    div.style.background = 'yellow';
    return div;
}

function changePostStatus(postId) {
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].postId == postId) {
            posts[i].isLiked = !posts[i].isLiked;
        }
    }
}