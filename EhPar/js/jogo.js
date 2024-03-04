window.addEventListener('load', function () {
    if (!isUserLoggedIn()) {
        window.location.href = 'index.html'; 
        return;
    }

    const timer = document.getElementById('timer');
    const numero = document.getElementById('numero');
    const nAcertos = document.getElementById('nAcertos');
    const pAcerto = document.getElementById('pAcerto');
    const nErros = document.getElementById('nErros');
    const pSorteados = document.getElementById('pSorteados');
    const start = document.getElementById('start');
    const pause = document.getElementById('pause');
    const stop = document.getElementById('stop');
    const quit = document.getElementById('quit');
    const nivel = document.getElementById('nivel');
    var somClick = document.getElementById("somClick");
    var somClick1 = document.getElementById("somClick1");
    var audioElement = document.getElementById("musicaFundo");
    const audioHard = document.getElementById("musicaHard");
    const toggleMusicButton = document.getElementById('toggleMusic');

    toggleMusicButton.addEventListener('click', function () {
        if (audioElement.paused) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    });


    audioElement.play();
    audioElement.volume = 0.1;

    let comecar;
    let cronometro;
    let velocidade = 0;
    pause.style.backgroundColor = 'gray';
    pause.style.pointerEvents = "none";

    function definirNivel() {
        if (nivel.value == 'easy') {
            velocidade = 1050;
            timer.innerHTML = '01:45';
        } else if (nivel.value == 'regular') {
            velocidade = 550;
            timer.innerHTML = '01:15';
        } else if (nivel.value == 'hard') {
            audioElement.pause();
            audioHard.play();
            velocidade = 300;
            timer.innerHTML = '00:30';
        } else if (nivel.value == 'selecione') {
            timer.innerHTML = '00:00';
        }
    }

    function iniciarJogo() {
        numero.style.pointerEvents = "auto";
        start.style.pointerEvents = "none";
        start.style.backgroundColor = 'gray';
        pause.style.pointerEvents = "auto";
        pause.style.backgroundColor = "#683d7e";
        if (nivel.value != 'selecione') {
            comecar = setInterval(() => {
                let num = Math.floor(Math.random() * 100) + 1;
                numero.innerHTML = num;
                if (num % 2 == 0) {
                    pSorteados.innerHTML = parseInt(pSorteados.innerHTML) + 1;
                    pAcerto.innerHTML = parseFloat((parseFloat(nAcertos.innerHTML) / parseFloat(pSorteados.innerHTML)) * 100).toFixed(1);
                }
                numero.style.pointerEvents = "auto";
                numero.style.color = 'white';
                nivel.disabled = true;
            }, velocidade);

            cronometro = setInterval(() => {
                let minutos = parseInt(timer.innerHTML.split(':')[0]);
                let segundos = parseInt(timer.innerHTML.split(':')[1]);
                if (segundos == 0) {
                    segundos = 59;
                    minutos--;
                }
                segundos--;
                timer.innerHTML = minutos + ':' + segundos;
                if (timer.innerHTML == '0:0') {
                    alert('Fim de jogo!');
                    clearInterval(comecar);
                    clearInterval(cronometro);
                    numero.innerHTML = '0';
                    timer.innerHTML = '00:00';
                    nivel.value = "selecione";
                    start.style.pointerEvents = "auto";
                    pause.style.pointerEvents = "none";
                    start.style.backgroundColor = '#683d7e';
                    pause.style.backgroundColor = "gray";
                }
            }, 1000);
        } else {
            start.style.pointerEvents = "auto";
            start.style.backgroundColor = "#683d7e";
            pause.style.pointerEvents = "none";
            pause.style.backgroundColor = 'gray';
            nivel.disabled = false;
            alert('Selecione um nível!');
        }
    }

    function pausarJogo() {
        clearInterval(comecar);
        clearInterval(cronometro);
        start.style.pointerEvents = "auto";
        pause.style.pointerEvents = "none";
        numero.style.pointerEvents = "none";
        start.style.backgroundColor = '#683d7e';
        pause.style.backgroundColor = "gray";
    }

    function pararJogo() {
        clearInterval(comecar);
        clearInterval(cronometro);
        start.disabled = false;
        numero.innerHTML = '0';
        pSorteados.innerHTML = '0';
        nAcertos.innerHTML = '0';
        nErros.innerHTML = '0';
        pAcerto.innerHTML = '0';
        nivel.value = "selecione";
        timer.innerHTML = '00:00';
        start.style.pointerEvents = "auto";
        pause.style.backgroundColor = "gray";
        pause.style.pointerEvents = "none";
        start.style.backgroundColor = '#683d7e';
        nivel.disabled = false;
        definirNivel();
        audioHard.pause();
        audioElement.play();
    }

    function clicarNumero() {
        if (numero.innerHTML != '0') {
            if (numero.innerHTML % 2 == 0) {
                numero.style.color = 'green';
                nAcertos.innerHTML = parseInt(nAcertos.innerHTML) + 1;
                somClick1.play();
            } else {
                numero.classList.add('shake');
                numero.style.color = 'red';
                nErros.innerHTML = parseInt(nErros.innerHTML) + 1;
                somClick.play();
                somClick.volume == 1.0;

                setTimeout(function () {
                    numero.classList.remove('shake');
                }, 500);
            }
            numero.style.pointerEvents = "none";
        }
    }
    

    start.addEventListener('click', iniciarJogo);
    pause.addEventListener('click', pausarJogo);
    stop.addEventListener('click', pararJogo);
    nivel.addEventListener('change', definirNivel);
    numero.addEventListener('click', clicarNumero);
    quit.addEventListener('click', sairJogo); 
    document.getElementById("btnEntrar").addEventListener("click", fazerLogin);
    document.getElementById("btnCadastrar").addEventListener("click", cadastrarUsuario);

    function isUserLoggedIn() {
        var userLoggedIn = sessionStorage.getItem('userLoggedIn');
        return userLoggedIn === 'true';
    }


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
                } else {
                    alertMessage.innerText = "Usuário ou senha incorretos";
                    alertMessage.style.backgroundColor = "#ff6347";
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

    function sairJogo(){
        window.location.href = 'index.html';
    }

    

});