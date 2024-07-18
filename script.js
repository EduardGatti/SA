const campoLogin = document.getElementById("username")
const campoSenha = document.getElementById("senha")
const campoNovoLogin = document.getElementById("newUsername")
const campoNovaSenha = document.getElementById("newSenha")
const campoRepSenha = document.getElementById("confirmSenha")
const campoEmail = document.getElementById("newEmail")
const painel = document.getElementById('painel')
const inputIndex = document.getElementById("pesquisarIndex")
let filtro = []



function login(){           
    let login = campoLogin.value
    let senha = campoSenha.value

    let mensagem = "Nenhum usuário cadastrado até o momento";
    let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"))
    if (bancoDeDados == null){
        mensagem = "Usuário ou senha incorreta! "
    }
    else{
        for(let usuario of bancoDeDados){
            if(usuario.login == login && usuario.senha == senha){
                mensagem = "Parabéns, você logou!"
                localStorage.setItem("logado", JSON.stringify(usuario))
                window.location.href = "index.html"
                break

            }
        }
    }
    alert(mensagem)
    form.reset(); 
}

function cadastro(){

    if(campoNovoLogin.value == "" || campoNovaSenha.value == "" || campoEmail.value == "" || campoRepSenha.value == ""){

        alert("Você não preencheu os dados solicitados!");
        return

    }
    if (campoNovaSenha.value == campoRepSenha.value){
        const usuario = {

            email: campoEmail.value,
            login: campoNovoLogin.value,
            senha: campoNovaSenha.value,

        };

    let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"))
    if(bancoDeDados == null){
        bancoDeDados = [];
    }
    if(existe(usuario, bancoDeDados)){
        alert("Esse login ja está cadastrado!")
        window.location.href = "home.html"  
    }
    else{
        bancoDeDados.push(usuario)
        localStorage.setItem("bancoDeDados", JSON.stringify(bancoDeDados))
        alert("Usuário cadastrado com sucesso!")
        window.location.href = "index.html"
    }
    }else{
    alert("As senhas não são iguais!")
    }
    localStorage.clear(bancoDeDados);
}
let nome = document.getElementById('productName')
let descricao = document.getElementById('productDescription')
let imagem = document.getElementById('productPrice')

let produtos = JSON.parse(localStorage.getItem("produtos")) || []
let encontrado = -1

function cadastrar(){
    let produto = {
        id: Date.now(),
        nome: nome.value,
        descricao: descricao.value,
        imagem: imagem.value
    }
        produtos.push(produto) 
        console.log(produtos);
        limparFormulario()

        localStorage.setItem("produtos", JSON.stringify(produtos))
        alert("Produto Cadastrado com sucesso")
    
}

function pesquisar(){
    let pesquisa = nome.value
    for(i=0;i<produtos.length;i++){
        console.log(produtos[i].nome)
        // testar se é o certo
        if(produtos[i].nome == pesquisa){
           
            descricao.value = produtos[i].descricao
            imagem.value = produtos[i].imagem
            encontrado = i

        }
    }

    console.log(pesquisa);
}
function lista(){
    painel.innerHTML = ''
    for(i=0; i<produtos.length; i++){
        painel.innerHTML += '<h2>'+produtos[i].nome+'</h2>'
                '<p>'+produtos[i].descricao + '</p>'
                '<p>R$' + produtos[i].imagem + '</p>'
    }
}


// function gerarFakes(){

//     let produto 
//      produto = {

//         nome: "w",
//         descricao: 'w',
//         preco: 22
        

// }

// produtos.push(produto)

//      produto = {

//         nome: "q",
//         descricao: 'q',
//         preco: 23
        

// }

// produtos.push(produto)

//      produto = {

//         nome: "e",
//         descricao: 'e',
//         preco: 24
        

// }
// produtos.push(produto)
        

// }

function limparFormulario(){

    nome.value = ''
    descricao.value = ''
    imagem.value = ''
    nome.focus()

}

function salvar(){

    produtos[encontrado].nome = nome.value
    produtos[encontrado].descricao = descricao.value
    produtos[encontrado].imagem = imagem.value
    alert("Produto alterado com sucesso!")
    limparFormulario()
    localStorage.setItem("produtos", JSON.stringify(produtos))

}

function deletar(){
    if(encontrado != -1){

        produtos.splice(encontrado,1);
        limparFormulario()
        alert("Produto removido com sucesso.")
        encontrado = -1
        localStorage.setItem("produtos", JSON.stringify(produtos))

    }else{

        alert("Pesquisa nao foi efetuada.")

    }


}
function lista(){



}
function crudProdutos(){

    window.location.href = "card.html"

}


function existe(usuario, bancoDeDados){
    for(let verificado of bancoDeDados){
        if(verificado.login == usuario.login)
        return true
    }
}

function entrar(){
    window.location.href = "home.html"
}
function cadastre(){
    window.location.href = "registrar.html"
}
function voltar(){

    window.location.href = "index.html"

}

function pesquisar(){

    let pesquisa = nome.value
    for(i = 0; i<produtos.length; i++){
        console.log(produtos[i].nome)
        if(produtos[i].nome == pesquisa){
           
            descricao.value = produtos[i].descricao
            preco.value = produtos[i].preco
            encontrado = i

        }
    }

    console.log(pesquisa);
    
}

function mostrarCardsHome(){
    let cards = document.getElementById('cards')

    cards.innerHTML = ''

    for(i=0; i<filtro.length; i++){
        cards.innerHTML += `
        <div class="card-body" onclick="cadastre()">
              <img src="${filtro[i].imagem}" alt="">
              <h3 class="card-title">${filtro[i].nome}</h3>
              <p class="card-text">${filtro[i].descricao}</p>
              
        </div>
        
        `
    }
}

function filtrar(){
    
    filtro = []

for(i = 0; i < produtos.length; i++){
    if(produtos[i].nome.toUpperCase().includes(inputIndex.value.toUpperCase())){

        filtro.push(produtos[i])

    }
}

    mostrarCardsHome()
}




filtro = produtos
mostrarCardsHome()

