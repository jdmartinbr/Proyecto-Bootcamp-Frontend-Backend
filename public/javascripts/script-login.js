$(document).ready(function () {

    $('#login-submit').on('click', function () {
        let passwordLogin = $('#login-password').val();
        let encrypted = CryptoJS.AES.encrypt(passwordLogin, "Secret Passphrase");
        let decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase").toString(CryptoJS.enc.Utf8);
    });

    $("#login-submit").click(function () {
        let userName = $('#login-name').val();
        let userPassword = $('#login-password').val();
        localStorage.setItem('user', userName);
        localStorage.setItem('password', userPassword);
    });

    let state = true;
    $('#showPassword').click(function () {
        if(state) {
            $('#inputPassword').get(0).type = 'text';
        } else {
            $('#inputPassword').get(0).type = 'password';
        }
        state = !state;
    })


});
