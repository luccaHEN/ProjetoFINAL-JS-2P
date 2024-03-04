window.addEventListener('load', function () {
    document.getElementById("btnCadastrar").addEventListener("click", cadastrarUsuario);

    var somFail = document.getElementById("somFail");
    var somSuccess = document.getElementById("somSuccess");

    function cadastrarUsuario() {
        var user = document.getElementById("txtUser").value;
        var pwd = document.getElementById("txtPwd").value;
        var checkPwd = document.getElementById("txtCheckPwd").value;
        var alertMessage = document.getElementById("alertMessage");

        var userRegex = /^[a-zA-Z0-9]{5,20}$/;
        var pwdRegex = /^[a-zA-Z0-9+*\/@&-]{4,12}$/;

        if (user == "" || pwd == "" || checkPwd == "") {
            alertMessage.innerText = "Preencha todas as informações";
            alertMessage.style.backgroundColor = "#ff6347";
            somFail.play();
        } else if (!userRegex.test(user)) {
            alertMessage.innerText = "Nome de usuário inválido. Informe um usuário contendo de 5 a 20 caracteres alfanuméricos";
            alertMessage.style.backgroundColor = "#ff6347";
            somFail.play();
        } else if (pwd != checkPwd) {
            alertMessage.innerText = "As senhas não coincidem";
            alertMessage.style.backgroundColor = "#ff6347";
            somFail.play();
        } else if (!pwdRegex.test(pwd)) {
            alertMessage.innerText = "Senha inválida. Inforvme uma senha contendo de 4 a 12 letras, composta por números e/ou um dos seguintes símbolos: + - * / @ &";
            alertMessage.style.backgroundColor = "#ff6347";
            somFail.play();
        } else {
            var vetUsuarios = localStorage.getItem("vetUsuarios");

            if (vetUsuarios) {
                var vet = JSON.parse(vetUsuarios);
                var userExists = vet.some(function (usuario) {
                    return usuario.nome === user;
                });

                if (userExists) {
                    alertMessage.innerText = "Este usuário já está cadastrado. Escolha um nome de usuário diferente.";
                    alertMessage.style.backgroundColor = "#ff6347";
                    somFail.play();
                } else {
                    var novoUsuario = { nome: user, senha: pwd };
                    vet.push(novoUsuario);
                    localStorage.setItem('vetUsuarios', JSON.stringify(vet));

                    alertMessage.innerText = "Usuário cadastrado com sucesso!";
                    alertMessage.style.backgroundColor = "#32cd32";
                    somSuccess.play();

                    setTimeout(function () {
                        window.location.href = 'index.html';
                    }, 3000);
                }
            } else {
                var vet = [];
                var novoUsuario = { nome: user, senha: pwd };
                vet.push(novoUsuario);
                localStorage.setItem('vetUsuarios', JSON.stringify(vet));

                alertMessage.innerText = "Usuário cadastrado com sucesso!";
                alertMessage.style.backgroundColor = "#32cd32";

                setTimeout(function () {
                    window.location.href = 'index.html';
                }, 1500);
            }
        }

        alertMessage.style.display = "block";

    }
});
