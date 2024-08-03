document.getElementById('generate').addEventListener('click', generatePassword);
document.getElementById('copy').addEventListener('click', copyPassword);

function generatePassword() {
    const length = document.getElementById('length').value;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeSpecial = document.getElementById('includeSpecial').checked;
    const excludeSimilar = document.getElementById('excludeSimilar').checked;

    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSpecial) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    if (excludeSimilar) charset = charset.replace(/[il1LoO0]/g, '');

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    document.getElementById('password').value = password;
}

function copyPassword() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    passwordField.setSelectionRange(0, 99999);
    document.execCommand('copy');
    alert("Mot de passe copié : " + passwordField.value);
}
