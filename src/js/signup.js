
/* elementos form cadastro */

const formulario = document.querySelector("form")
const firstName = document.getElementById("inputNomeCadastro");
const lastName = document.getElementById("inputSobrenomeCadastro");
const email = document.getElementById("inputEmailCadastro");
const password = document.getElementById("inputSenhaCadastro");
const confirmPassword = document.getElementById("inputRepetirSenhaCadastro");
const botao = document.getElementById("botaoCriarContaCadastro")
const divAlert = document.getElementById("alert")
const botaoAlert = document.getElementById("botaoAlert")
const endereco = "http://localhost:5500/index.html"




/* URL - API */
const URL_API = "https://ctd-todo-api.herokuapp.com/v1";


/* Criando variáveis dos objetos necessários para requisição (tem de ser escopo global) */
let body = {
    "email": ``,
    "password": ``
}

let settings = {
    method: "",
    headers:{
        'Content-Type': 'application/json'
    },
    body: ""
}

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault()

    body =  {
        "firstName": `${firstName.value}`,
        "lastName": `${lastName.value}`,
        "email": `${email.value}`,
        "password": `${password.value}`
    }


    settings = {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    
    fetch(`${URL_API}/users`, settings)
    .then((result) =>{
        
        return result.json();

    }).then((info) => {

        let token = info;
        localStorage.setItem("jwt", token.jwt);
        divAlert.classList.remove("alertEscondido");

    }).catch( (error) => {

        console.error("Criação de um novo usuário não concluida, segue o erro: " + error);

    })


}) 

/* Função que irá dar um feedback ao usuário sobre novo usuário criado com sucesso e redireciona-lo a rota (página) index.html */
botaoAlert.addEventListener("click" , () => {
    location.href = endereco
})