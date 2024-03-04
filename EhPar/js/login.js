window.addEventListener('load', function () {
    document.getElementById("btnEntrar").addEventListener("click", fazerLogin);

    var somFail = document.getElementById("somFail");

    function fazerLogin() {
        var user = document.getElementById("txtUser").value;
        var pwd = document.getElementById("txtPwd").value;
        var alertMessage = document.getElementById("alertMessage");

        if (user == "" || pwd == "") {
            alertMessage.innerText = "Preencha todas as informações";
            alertMessage.style.backgroundColor = "#ff6347";
        } else {
            var vetUsuarios = localStorage.getItem("vetUsuarios");
            if (vetUsuarios) {
                var vet = JSON.parse(vetUsuarios);
                var userExists = vet.some(function (usuario) {
                    return usuario.nome === user && usuario.senha === pwd;
                });

                if (userExists) {
                    alertMessage.innerText = "Login bem-sucedido!";
                    alertMessage.style.backgroundColor = "#32cd32";
                    sessionStorage.setItem('userLoggedIn', 'true');
                    window.location.href = 'jogo.html';
                } else {
                    alertMessage.innerText = "Usuário ou senha incorretos";
                    alertMessage.style.backgroundColor = "#ff6347";
                    somFail.play();
                }
            } else {
                alertMessage.innerText = "Nenhum usuário cadastrado ainda";
                alertMessage.style.backgroundColor = "#ff6347";
            }
        }
        alertMessage.style.display = "block";
        setTimeout(function () {
            alertMessage.style.display = "none";
        }, 3000);
    }
});
