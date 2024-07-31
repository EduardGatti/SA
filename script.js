const campoLogin = document.getElementById("username")
const campoSenha = document.getElementById("senha")
const campoNovoLogin = document.getElementById("newUsername")
const campoNovaSenha = document.getElementById("newSenha")
const campoRepSenha = document.getElementById("confirmSenha")
const campoEmail = document.getElementById("newEmail")
const painel = document.getElementById('painel')
const inputIndex = document.getElementById("pesquisarIndex")
const largura = document.getElementById("tamanhoA")
const comprimento = document.getElementById("tamanhoB")
let filtro = []
let nome = document.getElementById('productName')
let descricao = document.getElementById('productDescription')
let imagem = document.getElementById('productImg')
let multiplicação = Number("0")
let produtos = JSON.parse(localStorage.getItem("produtos")) || []
let encontrado = -1
let path = '';

let perfilUsuario = []

function login() {
    let login = campoLogin.value
    let senha = campoSenha.value
    let loginAdm = "admin_glassvision"
    let senhaAdm = "123"


    let mensagem = "Nenhum usuário cadastrado até o momento";
    let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"))

    if (bancoDeDados == null) {
        mensagem = "Usuário ou senha incorreta! "
    }

    else {
        for (let usuario of bancoDeDados) {
            if (loginAdm == login && senhaAdm == senha) {
                mensagem = "Usuario admin logado!"
                localStorage.setItem("logado", JSON.stringify(usuario))
                window.location.href = "loginadm.html"
                break
            }
            if (usuario.login == login && usuario.senha == senha) {
                mensagem = "Parabéns, você logou!"
                localStorage.setItem("logado", JSON.stringify(usuario))
                window.location.href = "logado.html"
                break

            }
        }
    }
    alert(mensagem)
    form.reset();
}

function cadastro() {

    if (campoNovoLogin.value == "" || campoNovaSenha.value == "" || campoEmail.value == "" || campoRepSenha.value == "") {

        alert("Você não preencheu os dados solicitados!");
        return

    }
    if (campoNovaSenha.value == campoRepSenha.value) {
        const usuario = {

            email: campoEmail.value,
            login: campoNovoLogin.value,
            senha: campoNovaSenha.value,

        };

        let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"))
        if (bancoDeDados == null) {
            bancoDeDados = [];
        }
        if (existe(usuario, bancoDeDados)) {
            alert("Esse login ja está cadastrado!")
        }
        else {
            bancoDeDados.push(usuario)
            localStorage.setItem("bancoDeDados", JSON.stringify(bancoDeDados))
            alert("Usuário cadastrado com sucesso!")
            window.location.href = "home.html"
        }
    } else {
        alert("As senhas não são iguais!")
    }
}

function cadastrar() {
    const [file] = imagem.files;

    if (file) {

        const reader = new FileReader();


        reader.onloadend = function () {
            const path = reader.result;

            let produto = {
                id: Date.now(),
                nome: nome.value,
                descricao: descricao.value,
                imagem: path
            };
            let confirmar = confirm("Você deseja cadastrar este produto?");
            if (confirmar) {
                produtos.push(produto);
                console.log(produtos);
                limparFormulario();

                localStorage.setItem("produtos", JSON.stringify(produtos));
                alert("Produto Cadastrado com sucesso");
            }
        };


        reader.readAsDataURL(file);
    } else {
        alert("Nenhuma imagem selecionada.");
    }
}

function pesquisar() {

    let pesquisa = document.getElementById("productName").value.trim()
    encontrado = -1

    for (let i = 0; i < produtos.length; i++) {



        if (produtos[i].nome.toLowerCase() === pesquisa.toLowerCase()) {

            document.getElementById('productDescription').value = produtos[i].descricao
            document.getElementById('productImg').file = produtos[i].imagem
            encontrado = i


            break;
        }
    }

    if (encontrado == -1) {
        alert('Produto não encontrado');
    }
    console.log(pesquisa);

}


function lista() {
    painel.innerHTML = ''
    for (i = 0; i < produtos.length; i++) {
        painel.innerHTML += '<h2>' + produtos[i].nome + '</h2>'
        '<p>' + produtos[i].descricao + '</p>'
        '<p>R$' + produtos[i].imagem + '</p>'
    }
}

function limparFormulario() {

    nome.value = ''
    descricao.value = ''
    imagem.value = ''
    nome.focus()

}

function salvar() {
    let confirmar = confirm("Você realmente deseja editar este produto?");

    if (confirmar) {
        produtos[encontrado].nome = nome.value
        produtos[encontrado].descricao = descricao.value
        alert("Produto alterado com sucesso!")
        localStorage.setItem("produtos", JSON.stringify(produtos))
        limparFormulario()
    }

}

function deletar() {
    if (encontrado != -1) {

        let confirmar = confirm("Você realmente deseja excluir este produto?");

        if (confirmar) {
            produtos.splice(encontrado, 1);
            localStorage.setItem("produtos", JSON.stringify(produtos));
            document.getElementById('productDescription').value = '';
            document.getElementById('productImg').file = '';
            encontrado = -1;
            alert("Produto removido com sucesso.");
        }

    } else {

        alert("Pesquisa nao foi efetuada.")

    }


}

function crudProdutos() {

    window.location.href = "card.html"

}

function existe(usuario, bancoDeDados) {
    for (let verificado of bancoDeDados) {
        if (verificado.login == usuario.login)
            return true
    }
}

function entrar() {
    window.location.href = "home.html"
}
function cadastre() {
    window.location.href = "registrar.html"
}
function voltarAdm() {

    window.location.href = 'loginAdm.html'

}
function voltar() {

    window.location.href = "logado.html"

}
function voltarIndex(){
    window.location.href = "index.html"
}
function orcamento() {
    const HOME_URL = 'home.html';
    const ORCAMENTO_URL = 'orçamento.html';
    const ADMVERIFICT_URL = "orçamentoAdm.html"
    

   
        const usuarioLogado = JSON.parse(localStorage.getItem("logado"));

        let login = campoLogin.value
        let senha = campoSenha.value
        let loginAdm = "admin_glassvision"
        let senhaAdm = "123"
        
        if (usuarioLogado === null || usuarioLogado === undefined) {
            window.location.href = HOME_URL;
        } else {
            window.location.href = ORCAMENTO_URL;
        }
        if(login == loginAdm &&  senha == senhaAdm){

            window.location.href = ADMVERIFICT_URL

        }
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        const formulario = document.getElementById('formLogin'); // Obtém o formulário
    
        // Adiciona um ouvinte de evento para o envio do formulário
        formulario.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário
            verificarLogin(); // Chama a função de verificação de login
        });
    });


function mostrarCardsHome() {
    let cards = document.getElementById('cards')

    cards.innerHTML = '';
    for (i = 0; i < filtro.length; i++) {

        cards.innerHTML += `
        <div class="card-body" onclick="orcamento()">
               <img src="${filtro[i].imagem}" alt="imagem">
              <h3 class="card-title">${filtro[i].nome}</h3>
              <p class="card-text">${filtro[i].descricao}</p>
              
        </div>
        
        `

    }
}

function filtrar() {

    filtro = []

    for (i = 0; i < produtos.length; i++) {
        if (produtos[i].nome.toLowerCase().includes(inputIndex.value.toLowerCase())) {

            filtro.push(produtos[i])

        }
    }

    mostrarCardsHome()
}

filtro = produtos

mostrarCardsHome()





function deslogar() {
    alert("Você foi deslogado!")
    localStorage.removeItem("logado");
    window.location.href = "index.html"
}

function editarPerfil() {

    window.location.href = "perfil.html"
}


function informacaoPerfil() {

    perfilUsuario = JSON.parse(localStorage.getItem('bancoDeDados'))
    const usuarioLogado = JSON.parse(localStorage.getItem('logado'));
    let informacao = document.getElementById('info');

    informacao.innerHTML = '';


    if (usuarioLogado) {

        const usuario = perfilUsuario.find(user => user.login === usuarioLogado.login);

        if (usuario) {
            let nascimento = converterParaISO(usuario.nascimento);
            informacao.innerHTML = `
                <p><strong>Nome:</strong> ${usuario.login}</p>
                <p><strong>Email:</strong> ${usuario.email}</p>
                <p><strong>Data de Nascimento:</strong> ${nascimento || 'Não informado'}</p>
            `;
        }
    }
}
function Cadastrados() {


    window.location.href = 'lista.html'
}
function lista() {
    let cadastrados = JSON.parse(localStorage.getItem('bancoDeDados')) || [];

    let lista = document.getElementById('lista')

    lista.innerHTML = ""

    for (i = 0; i < cadastrados.length; i++) {



        lista.innerHTML += `
        <p><strong>Nome:</strong> ${cadastrados[i].login}</p>
        <p><strong>Email:</strong> ${cadastrados[i].email}</p>
        <p><strong>Senha:</strong> ${cadastrados[i].senha}</p>
        <p><strong>Data de Nascimento:</strong> ${cadastrados[i].nascimento || 'Não informado'}</p>
        <hr> <!-- Linha horizontal para separar os usuários -->
        `
    }
}

function converterParaISO(dataBR) {
    if (!dataBR) return '';
    const [dia, mes, ano] = dataBR.split('-');
    return `${ano}-${mes}-${dia}`;
}

function salvarMudanca() {
    const usuarioPerfil = JSON.parse(localStorage.getItem('bancoDeDados')) || []
    const usuarioLogado = JSON.parse(localStorage.getItem('logado'));
    let edicao = document.getElementById('edit-profile');

    edicao.innerHTML = '';


    if (usuarioLogado) {

        const usuario = usuarioPerfil.find(user => user.login === usuarioLogado.login);

        if (usuario) {
            edicao.innerHTML =
                `
        <form class="edit-form" id= "edit-form">
            <label for="name">Nome:</label>
            <input type="text" id="name" name="name" value="${usuario.login}" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value="${usuario.email}" required>

            <label for="dob">Data de Nascimento:</label>
            <input type="date" id="dob" name="dob"  value="${usuario.nascimento}" required>

            

            <button type="submit" class="save-button" onclick="salvarDados()">Salvar Alterações</button>
        </form>
        `

        }
    }

}
function salvarDados() {

    const usuarioPerfil = JSON.parse(localStorage.getItem('bancoDeDados')) || [];
    const usuarioLogado = JSON.parse(localStorage.getItem('logado'));

    if (usuarioLogado) {
        const index = usuarioPerfil.findIndex(user => user.login === usuarioLogado.login);

        if (index !== -1) {

            const atualizacao = {
                login: document.getElementById('name').value,
                email: document.getElementById('email').value,
                nascimento: document.getElementById('dob').value,
                senha: usuarioLogado.senha
            };


            usuarioPerfil[index] = atualizacao;

            localStorage.setItem('bancoDeDados', JSON.stringify(usuarioPerfil));


            localStorage.setItem('logado', JSON.stringify(atualizacao));


            alert('Dados atualizados com sucesso!');
            window.location.href = "logado.html"

        }

    }

}
//pegar o banco de dados (get)
//ai usar o find para encontrar o usuário que você editou
//

function fazerOrcamento() {

    let largura = document.getElementById("tamanhoA").value
    let comprimento = document.getElementById("tamanhoB").value
    let total = 0

    total = largura * comprimento

    let opcoes = document.getElementById("opcoes").value

    switch(opcoes){

        case "1":

        total = (total * 200) + 400
        break;

        case '2':

        total = (total * 350) + 400
        break;

        case "3":

        total = (total * 400) + 400
        break;

        case "4":

        total = (total * 300) + 500
        break;

        default:

        alert("selecione uma opção valida")

    }

    
    alert("O valor total do orçamento é de: " + total.toFixed(2))

}