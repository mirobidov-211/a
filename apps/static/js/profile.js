function switchTab(tabName) {
    document.querySelectorAll('.profile-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.content').forEach(content => content.classList.remove('active'));
    const tabBtn = document.getElementById(tabName + '-tab');
    const tabContent = document.getElementById(tabName + '-content');
    if (tabBtn) tabBtn.classList.add('active');
    if (tabContent) tabContent.classList.add('active');
    const indicator = document.getElementById('tab-indicator');
    if (!indicator) return;
    if (tabName === 'posts') indicator.style.left = '0';
    if (tabName === 'saved') indicator.style.left = '33.33%';
    if (tabName === 'likes') indicator.style.left = '66.66%';
}

// Like & Bookmark functionality via backend
document.addEventListener('DOMContentLoaded', function() {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const csrftoken = getCookie('csrftoken') || '';

    // Like buttons
    document.querySelectorAll('.action-btn.like').forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.getAttribute('data-post-id');
            fetch('/api/toggle-like/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': csrftoken
                },
                body: `post_id=${encodeURIComponent(postId)}`
            })
            .then(r => r.json())
            .then(data => {
                if (!data.ok) return;
                if (data.liked) {
                    button.classList.add('liked', 'active');
                } else {
                    button.classList.remove('liked', 'active');
                }
                // Optionally update Likes tab via AJAX later if needed
            })
            .catch(() => {});
        });
    });

    // Bookmark buttons
    document.querySelectorAll('.action-btn.bookmark').forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.getAttribute('data-post-id');
            fetch('/api/toggle-bookmark/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': csrftoken
                },
                body: `post_id=${encodeURIComponent(postId)}`
            })
            .then(r => r.json())
            .then(data => {
                if (!data.ok) return;
                if (data.bookmarked) {
                    button.classList.add('bookmarked', 'active');
                } else {
                    button.classList.remove('bookmarked', 'active');
                }
                // Optionally update Saved tab via AJAX later if needed
            })
            .catch(() => {});
        });
    });
});