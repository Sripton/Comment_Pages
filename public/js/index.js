function likeComment(button) {
    let likes = parseInt(button.textContent.split(" ")[1]);
    button.textContent = `👍 ${likes + 1}`;
}

function dislikeComment(button) {
    let dislikes = parseInt(button.textContent.split(" ")[1]);
    button.textContent = `👎 ${dislikes + 1}`;
}

function editComment(button) {
    const commentTextElement = button.closest('.comment').querySelector('.comment-text');
    const newText = prompt("Edit your comment:", commentTextElement.textContent);
    if (newText && newText.trim() !== "") {
        commentTextElement.textContent = newText;
    }
}

function deleteComment(button) {
    const commentElement = button.closest('.comment');
    commentElement.remove();
}

function showReplyForm(button) {
    // Проверяем, есть ли уже форма ответа
    const existingForm = button.closest('.comment').querySelector('.add-comment');
    if (existingForm) return;

    // Клонируем шаблон формы ответа
    const replyFormTemplate = document.getElementById('reply-form-template');
    const replyFormClone = replyFormTemplate.cloneNode(true);
    replyFormClone.classList.remove('hidden');

    // Добавляем форму под соответствующий комментарий
    const commentElement = button.closest('.comment');
    const repliesDiv = commentElement.querySelector('.replies');
    repliesDiv.appendChild(replyFormClone);
}

function postReply(button) {
    const replyForm = button.closest('.add-comment');
    const replyText = replyForm.querySelector('textarea').value;

    if (replyText && replyText.trim() !== "") {
        const newReply = document.createElement('div');
        newReply.classList.add('comment');
        newReply.innerHTML = `
            <p class="comment-text">${replyText}</p>
            <div class="comment-actions">
                <button class="like-btn" onclick="likeComment(this)">👍 0</button>
                <button class="dislike-btn" onclick="dislikeComment(this)">👎 0</button>
                <button class="reply-btn" onclick="showReplyForm(this)">Reply</button>
                <button class="edit-btn" onclick="editComment(this)">Edit</button>
                <button class="delete-btn" onclick="deleteComment(this)">Delete</button>
            </div>
            <div class="replies"></div>
        `;

        // Добавляем новый ответ в секцию ответов
        const repliesDiv = replyForm.closest('.replies');
        repliesDiv.appendChild(newReply);

        // Удаляем форму после публикации ответа
        replyForm.remove();
    }
}
