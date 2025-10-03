// Modal funksiyalari
function showModal() {
    document.getElementById("modal").style.display = "flex";
}
function closeModal() {
    document.getElementById("modal").style.display = "none";
}
function showLoginModal() {
    document.getElementById('modal-login').style.display = 'flex';
}
function closeLoginModal() {
    document.getElementById('modal-login').style.display = 'none';
}


// Form validation - submit oldidan tekshiradi
function validateFormAndShowCode(event) {
    const firstName = document.querySelector('input[name="first_name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const errorDiv = document.getElementById('error-message');
    if (!firstName || !email || !username || !password) {
        errorDiv.textContent = "Iltimos, barcha maydonlarni to'ldiring.";
        event.preventDefault();
        return false;
    }
    errorDiv.textContent = "";
    return true; // Form submit bo‘lsin
}

function closeEmailModal() {
    document.getElementById('modal-email-code').style.display = 'none';
}


function showuser() {
    document.getElementById('username-login-form').style.display = 'flex';
}


function togglePassword(inputId, eyeIcon) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        eyeIcon.textContent = "🙈";
    } else {
        input.type = "password";
        eyeIcon.textContent = "👁️";
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const bodyBg = getComputedStyle(document.body).backgroundColor;

    const darkLogo = document.getElementById("dark-logo");
    const lightLogo = document.getElementById("light-logo");

    if (bodyBg === "rgb(0, 0, 0)") {
        darkLogo.style.display = "block";
    } else if (bodyBg === "rgb(255, 255, 255)") {
        lightLogo.style.display = "block";
    } else {
        // Agar boshqa rang bo‘lsa, default qilib oqni ko‘rsatamiz
        lightLogo.style.display = "block";
    }
});