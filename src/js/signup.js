
/* elementos form cadastro */

const formulario = document.querySelector("form")
const firstName = document.getElementById("inputNomeCadastro");
const lastName = document.getElementById("inputSobrenomeCadastro");
const email = document.getElementById("inputEmailCadastro");
const senha = document.getElementById("inputSenhaCadastro");
const confirmSenha = document.getElementById("inputRepetirSenhaCadastro");
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
    method: "POST",
    headers:{
        'Content-Type': 'application/json'
    },
    body: ""
}


formulario.addEventListener("change" ,() => {
    
    var mailformat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    

    if(email.value.match(mailformat) && senha.value.length > 0){
        botao.removeAttribute("disabled");
        botao.innerText = "Criar conta"
        console.log('Tudo valido!');
    }
    
    body.email = email.value;
    body.password = senha.value;
  
    settings.body = JSON.stringify(body);

})



formulario.addEventListener('submit', function(evento) {



    evento.preventDefault()

    body =  {
        "firstName": `${firstName.value}`,
        "lastName": `${lastName.value}`,
        "email": `${email.value}`,
        "senha": `${senha.value}`
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
    
    location.href = "index.html";
    
    
})