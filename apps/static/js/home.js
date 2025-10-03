document.addEventListener("DOMContentLoaded", function () {
    const bodyBg = getComputedStyle(document.body).backgroundColor;

    const logos = {
        dark: document.getElementById("dark-logo"),
        light: document.getElementById("light-logo"),
        dark1: document.getElementById("dark-logo1"),
        light1: document.getElementById("light-logo1"),
    };

    console.log("Body background color:", bodyBg);

    const isDark = bodyBg.includes("0, 0, 0");
    const isLight = bodyBg.includes("255, 255, 255");

    if (isDark) {
        logos.dark.style.display = "inline-block";
        logos.light.style.display = "none";
        logos.dark1.style.display = "inline-block";
        logos.light1.style.display = "none";
    } else {
        // Oq yoki boshqa fon bo‘lsa light logolarni ko‘rsatamiz
        logos.dark.style.display = "none";
        logos.light.style.display = "inline-block";
        logos.dark1.style.display = "none";
        logos.light1.style.display = "inline-block";
    }
});


const textarea1 = document.getElementById("composeText");
const postBtn = document.getElementById("postBtn");

function checkPostBtn() {
    if (textarea1.value.replace(/\s/g, '').length > 0) {
        postBtn.classList.add("active");
    } else {
        postBtn.classList.remove("active");
    }
}

textarea1.addEventListener("input", checkPostBtn);

document.querySelectorAll("#emojiPanel .emoji").forEach(el => {
    el.style.cursor = "pointer";
    el.style.fontSize = "24px";
    el.style.margin = "5px";
    el.addEventListener("click", () => {
        textarea1.value += el.textContent;
        checkPostBtn();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("composeText");
    const form = document.querySelector(".compose");

    textarea.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            form.submit();
        }
    });
});

// Toggle profile dropdown
function toggleProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    const overlay = document.getElementById('overlay');

    dropdown.classList.toggle('show');
    overlay.classList.toggle('show');
}

// Close profile dropdown
function closeProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    const overlay = document.getElementById('overlay');

    dropdown.classList.remove('show');
    overlay.classList.remove('show');
}

// Tab switching
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.addEventListener('click', function () {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// Mobile nav switching
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
mobileNavItems.forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        mobileNavItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// Auto-resize textarea
const textarea = document.getElementById('composeText');
textarea.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 200) + 'px';
});

// Profile dropdown toggle for logo1
document.addEventListener("DOMContentLoaded", function () {
    // Dropdown toggle
    const logo1 = document.querySelector('.logo1');
    const profileDropdown = document.getElementById('profileDropdown');
    if (logo1 && profileDropdown) {
        logo1.addEventListener('click', function (e) {
            e.preventDefault();
            profileDropdown.classList.toggle('show');
        });
    }
});

// Mobile profile dropdown toggle (X.com style)
document.addEventListener("DOMContentLoaded", function () {
    // Dropdown toggle
    const logo1 = document.querySelector('.logo1');
    const profileDropdown = document.getElementById('profileDropdown');
    if (logo1 && profileDropdown) {
        logo1.addEventListener('click', function (e) {
            // Faqat 640px dan kichik ekranda ishlaydi
            if (window.innerWidth <= 640) {
                e.preventDefault();
                profileDropdown.classList.toggle('show');
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.tweet-actions .action-btn').forEach(function (btn) {
        const postId = btn.getAttribute('data-post-id');
        const action = btn.getAttribute('data-action');
        const key = `actionBtn_${postId}_${action}`;

        if (localStorage.getItem(key) === '1') {
            btn.classList.add('active');
        }

        btn.addEventListener('click', function () {
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                localStorage.setItem(key, '0');
            } else {
                btn.classList.add('active');
                localStorage.setItem(key, '1');
            }
        });
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const emojiBtn = document.getElementById("emojiBtn");
    const emojiPanel = document.getElementById("emojiPanel");
    const textarea = document.getElementById("composeText");

    emojiBtn.addEventListener("click", () => {
        emojiPanel.style.display = emojiPanel.style.display === "none" ? "block" : "none";
    });
});