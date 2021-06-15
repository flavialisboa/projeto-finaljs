const elem_msg = document.getElementById("div_msg");
//const para não atribuir um novo valor
//usar let se precisar receber uma nova atribuição
const weekdaysButton = document.getElementById("btnReiniciar");

weekdaysButton.addEventListener("click", function () {
    document.body.style.backgroundImage = "url(./img/question-marks-background.jpg)"
    elem_msg.innerHTML = "";
});

