
/* elementos form cadastro */

let formulario = document.querySelector("form")
let firstName = document.getElementById("inputNomeCadastro");
let lastName = document.getElementById("inputSobrenomeCadastro");
let email = document.getElementById("inputEmailCadastro");
let password = document.getElementById("inputSenhaCadastro");
let confirmPassword = document.getElementById("inputRepetirSenhaCadastro");
let botao = document.getElementById("botaoCriarContaCadastro")
let endereco = "http://localhost:5500/index.html"



/* URL - API */
const URL_API = "https://ctd-todo-api.herokuapp.com/v1";


formulario.addEventListener('submit', function(evento) {
    evento.preventDefault()
    
  
    let body =  {
            "firstName": `${firstName.value}`,
            "lastName": `${lastName.value}`,
            "email": `${email.value}`,
            "password": `${password.value}`
        }
    

    let settings = {
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
        console.log(token.jwt);
        localStorage.setItem("jwt", token.jwt)

    }).catch( (error) => {

        console.error("Criação de um novo usuário não concluida, segue o erro: " + error);

    })


}) 