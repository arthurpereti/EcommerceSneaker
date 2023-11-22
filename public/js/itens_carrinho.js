const adicionar_carrinho = document.querySelectorAll(".adicionar-ao-carrinho")
console.log(adicionar_carrinho)

adicionar_carrinho.forEach((botao)=>{
    botao.addEventListener("click", ()=>{
        const nome = botao.getAttribute("data-nome")
        const qtde = Number(botao.getAttribute("data-qtde"))
        const preco = Number(botao.getAttribute("data-preco"))
        console.log(nome,qtde,preco)

        const item = { nome, qtde, preco }
        console.log(item)
        // recuprando os dados do carrinho no localStorage
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

        carrinho.push(item)
        console.log(carrinho)

        // atualize o carrinho no localstorage
        localStorage.setItem("carrinho", JSON.stringify(carrinho))

        const carrinho_icone = document.getElementById("carrinho-icon")
        carrinho_icone.src = "./assets/img/carrinho_cheio.png"

    })
})