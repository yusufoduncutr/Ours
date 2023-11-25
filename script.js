let userCount = 0;

function navigate(section) {
    console.log(`Navigating to ${section}`);
    // Implement your navigation logic here
}

function updateOnlineUsers(count) {
    userCount = count;
    document.getElementById('userCount').innerText = `${count} Users Online`;
}

function addPost(content, emoji) {
    const postArea = document.getElementById('postArea');

    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    const emojiSpan = document.createElement('span');
    emojiSpan.classList.add('emoji');
    emojiSpan.innerText = emoji;

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('post-content');
    contentDiv.innerText = content;

    const interactionsDiv = document.createElement('div');
    interactionsDiv.classList.add('post-interactions');

    const likeBtn = document.createElement('div');
    likeBtn.classList.add('like-btn');
    likeBtn.innerHTML = '<span>&#10084;</span> Like';
    likeBtn.onclick = function () {
        toggleLike(likeBtn);
    };

    const commentBtn = document.createElement('div');
    commentBtn.classList.add('comment-btn');
    commentBtn.innerHTML = '<span>&#9998;</span> Comment';
    commentBtn.onclick = function () {
        toggleComments(commentBtn, postDiv);
    };

    interactionsDiv.appendChild(likeBtn);
    interactionsDiv.appendChild(commentBtn);

    const commentsDiv = document.createElement('div');
    commentsDiv.classList.add('post-comments');

    const commentForm = document.createElement('div');
    commentForm.classList.add('comment-form');
    commentForm.innerHTML = `
        <textarea placeholder="Write a comment"></textarea>
        <button onclick="postComment(this, '${contentDiv.id}')">Post Comment</button>
    `;

    postDiv.appendChild(emojiSpan);
    postDiv.appendChild(contentDiv);
    postDiv.appendChild(interactionsDiv);
    postDiv.appendChild(commentsDiv);
    postDiv.appendChild(commentForm);

    postArea.appendChild(postDiv);
}

function sendPost() {
    const postContent = document.getElementById('postContent').value;
    if (postContent.trim() !== '') {
        // For demonstration purposes, let's assume the emoji is hard-coded.
        const emoji = '😊';
        addPost(postContent, emoji);
        document.getElementById('postContent').value = ''; // Clear the input field after posting
    }
}

function toggleLike(likeBtn) {
    const isLiked = likeBtn.classList.toggle('liked');
    if (isLiked) {
        likeBtn.innerHTML = '<span>&#10084;</span> Liked';
    } else {
        likeBtn.innerHTML = '<span>&#10084;</span> Like';
    }
}

function toggleComments(commentBtn, postDiv) {
    const commentsDiv = postDiv.querySelector('.post-comments');
    const commentForm = postDiv.querySelector('.comment-form');

    const isCommentsVisible = commentsDiv.classList.toggle('show-comments');
    const isFormVisible = commentForm.classList.toggle('show-form');

    if (isCommentsVisible) {
        commentBtn.innerHTML = '<span>&#9998;</span> Hide Comments';
        // For demonstration purposes, let's assume we have some comments to show.
        commentsDiv.innerHTML = '<div class="comment">User1: Nice post!</div><div class="comment">User2: I agree!</div>';
    } else {
        commentBtn.innerHTML = '<span>&#9998;</span> Comment';
        commentsDiv.innerHTML = '';
    }
    

    if (isFormVisible) {
        commentForm.querySelector('textarea').focus();
    }
}

function postComment(button, postId) {
    const textarea = button.previousElementSibling;
    const content = textarea.value.trim();

    if (content !== '') {
        const commentsDiv = button.parentElement.previousElementSibling;
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `User: ${content}`;
        commentsDiv.appendChild(commentDiv);
        textarea.value = ''; // Clear the textarea after posting a comment
    }
}

// Example: Update user count and add a post
updateOnlineUsers(10);
addPost('Welcome to Ours!', '🎉');
