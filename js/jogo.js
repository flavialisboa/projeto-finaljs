const criaJogo =  sprite => {

    let palavraSecreta = '';
    let lacunas = [];
    let etapa = 1;
    //let elem_msg = document.getElementById("div_msg");

    const ganhou =  () => lacunas.length
            //não encontraria nenhuma lacuna, e acusaria que ganhou sem começar o jogo
            ? !lacunas.some(function (lacuna) {
                return lacuna == '';
                //se não encontrar nenhum array em branco, para de varrer o array
            })
            : false;

    const perdeu = () => sprite.isFinished();
    
    const ganhouOuPerdeu = () => ganhou() || perdeu();

    const reinicia = () => {

        etapa = 1;
        lacunas = [];
        palavraSecreta = '';
        sprite.reset();
    };

    const processaChute = chute => {

        if (!chute.trim()) throw Error('Chute inválido');
        //quando em branco

        const exp = new RegExp(chute, 'gi');
        //case insensitive
        let resultado, acertou = false;

        while (resultado = exp.exec(palavraSecreta)) {
            //vai repetir enquanto o resultado for verdadeiro, preenchendo todas as lacunas
            //vai captar o índice para transferir para as lacunas visíveis 
            acertou = lacunas[resultado.index] = chute;
            //lacunas recebe o chute, e esse valor joga para dentro de acertou
        }

        if (!acertou) sprite.nextFrame();
        //se errou, anda com o sprite
    };

    const criaLacunas = () => {

        for (let i = 0; i < palavraSecreta.length; i++) {
            lacunas.push('');
            //para cada letra, cria uma string em branco
        }
    };

    const proximaEtapa = () => etapa = 2;

    const setPalavraSecreta = palavra => {

        if (!palavra.trim()) throw Error('Palavra secreta inválida');
        //quando em branco

        palavraSecreta = palavra;
        criaLacunas();
        proximaEtapa();
    };

    const getLacunas = () => lacunas;
    //return lacunas

    const getEtapa = () => etapa;
    //return etapa

    /*var elem_msg = document.getElementById("div_msg");

    function reiniciar() {
        etapa = 1;
        lacunas = [];
        palavraSecreta = '';
        sprite.reset();
        document.body.style.backgroundImage = "url(../img/question-marks-background.jpg)"
        document.body.style.background = "#000000";  
        elem_msg.innerHTML = "";
    };*/

    return {
        setPalavraSecreta,
        getLacunas,
        getEtapa,
        processaChute,
        ganhou,
        perdeu,
        ganhouOuPerdeu,
        reinicia
        //reiniciar
    };
};