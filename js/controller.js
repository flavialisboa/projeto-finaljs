const criaController = jogo => {

    const $entrada = $('.entrada');
    const $lacunas = $('.lacunas');

    const exibeLacunas = () => {

        $lacunas.empty();
        //para não serem adicionadas mais lacunas ao longo do jogo
        jogo.getLacunas().forEach(function (lacuna) {
            //retorna array com as lacunas. A cada lacuna adiciona uma li com classe, texto.
            $('<li>')
                .addClass('lacuna')
                .text(lacuna)
                .appendTo($lacunas);
        });
    };

    const mudaPlaceHolder = texto => $entrada.attr('placeholder', texto);
    //mudar atributo para o placeholder

    const guardaPalavraSecreta = () => {

        try {
            jogo.setPalavraSecreta($entrada.val().trim());
            //recebe palavra secreta. val = pegar valor. trim = remover espaços da direita e esquerda
            $entrada.val('');
            //limpar letra do chute
            mudaPlaceHolder('chuta');
            exibeLacunas();
        }catch(err){
            alert(err.message);
            //exibe o erro para o usuário
        }
    };

    const reinicia = () => {

        jogo.reinicia();
        $lacunas.empty();
        mudaPlaceHolder('Palavra Secreta');
    };

    const elem_msg = document.getElementById("div_msg");
    const leChute = () => {

        try {
            jogo.processaChute($entrada.val().trim().substr(0, 1));
            //pega sempre a primeira letra, independente do que foi digitado
            $entrada.val('');
            //limpa a entrada
            exibeLacunas();
    
            if(jogo.ganhouOuPerdeu()) {
                //reinicia de qualquer jeito
    
                setTimeout(() => {
                    if(jogo.ganhou()) {
                        //document.body.style.backgroundImage = "url('./img/check-mark-emoji.png')";  
                        //document.body.style.backgroundSize = "5vh 5vh";
                        document.body.style.background = "#ABD5AB";  
                        elem_msg.innerHTML = "<b>Parabéns, você venceu!</b>";
                    } else if (jogo.perdeu()) {
                        //document.body.style.backgroundImage = "url('./img/cross-symbol.png')"; 
                        document.body.style.background = "#FA8072";    
                        elem_msg.innerHTML = "<b>Poxa vida! Você perdeu :(</b>";
                    }
                    reinicia();                    
                }, 400);
                //posterga a execução do teste em 200ms
            }
        } catch(err) {
            alert(err.message);
            //exibe o erro para o usuário
        }
    };

    const inicia = () => {

        $entrada.keypress(event => {
            if (event.which == 13) {
                //código que equivale a tecla de enter (13)
                switch (jogo.getEtapa()) {
                    case 1:
                        guardaPalavraSecreta();
                        break;
                    case 2:
                        leChute();
                        break;
                }
            }
        });
    };

    return { inicia };
};


//document.body.style.backgroundImage = "url(../img/question-marks-background.jpg)"