

    $('#checkb').on('click', function (e) {
        let inputPw = $('#inputPassword')[0].value.length;
        if(inputPw) {
            $("#regbutton").toggleClass('disabled');
            let status = true;
            if (status){
                $("#regbutton").removeAttr('disabled');
            } else {
                $("#regbutton").attr('disabled');
            }
        } else {
            e.preventDefault()
        }
    });

    $('#regbutton').on('click', function () {
        let passwordRegister = $('#regbutton').val();
        let encrypted = CryptoJS.AES.encrypt(passwordRegister, "Secret Passphrase");
        let decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase").toString(CryptoJS.enc.Utf8);
        if (passwordRegister)
            localStorage.setItem('password', encrypted);
    });

    $("#regbutton").click(function () {
        let userName = $('#inputuser').val();
        if (userName)
            localStorage.setItem('user', userName);
    });