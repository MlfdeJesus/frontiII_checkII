/* Rescuperando elementos do arquivo HTML */
const formulario = document.querySelector("form");
const email = document.getElementById("inputEmailLogin");
const senha = document.getElementById("inputSenhaLogin");
const botao = document.getElementById("botaoLogin")
const endereco = "http://localhost:5500/tasks.html";

/* Criando variáveis dos objetos necessários para requisição (tem de ser escopo global) */
const body = {
    "email": ``,
    "password": ``
}

const settings = {
    method: "POST",
    headers:{
        'Content-Type': 'application/json'
    },
    body: ""
}



/* Evento de 1.autenticação simples; 2.habiitação do botão de login; 3.atribuição dos valores as propriedades dos objetos da requisição*/
formulario.addEventListener("change" ,() => {
    if(email.value.length > 0 && senha.value.length > 0){
        botao.removeAttribute("disabled");
        botao.innerText = "Acessar"
    }

    body.email = email.value;
    body.password = senha.value;
  
    settings.body = JSON.stringify(body);
})



/* Criando corpo e configurações da requisição e evento que dispara a requisição */
const URL_API = "https://ctd-todo-api.herokuapp.com/v1";





formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    
    console.log(body)
    console.log(settings)


    setTimeout(() => {
        fetch(`${URL_API}/users/login`, settings)
        .then((result) =>{
            
            return result.json();
    
        }).then((info) => {
    
            let token = info;
            console.log(token.jwt);
            localStorage.setItem("jwt", token.jwt)

            setTimeout(() => {
                location.href = endereco;
            }, 1000)
    
        }).catch( (error) => {
    
            console.error("Criação de um novo usuário não concluida, segue o erro: " + error);
    
        })

    }, 2000)

})