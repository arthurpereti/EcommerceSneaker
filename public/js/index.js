// Função Lupa de Pesquisa

let lupadepesquisa = document.getElementById('lupadepesquisa')

lupadepesquisa.addEventListener('click', () => {

})


// Função Menu do Header


let menuabertoheader = document.getElementById('menuabertoheader')

menuabertoheader.addEventListener('click', () => {

})


// Botão que muda a cor do body

let btnmudarcor = document.getElementById("btnmudarcor")
btnmudarcor.addEventListener("click", () => {
    let cor_fundo = document.getElementById("cor_fundo")
    if (btnmudarcor.checked) {
        cor_fundo.style.backgroundColor = 'black'
    } else{
        cor_fundo.style.backgroundColor = 'white'
    }

})


