
/* elementos form cadastro */

let firstName = document.getElementById("inputNomeCadastro");
let lastName = document.getElementById("inputSobrenomeCadastro");
let email = document.getElementById("inputEmailCadastro");
let password = document.getElementById("inputSenhaCadastro");
let confirmPassword = document.getElementById("inputRepetirSenhaCadastro");
let botao = document.getElementById("botaoCriarContaCadastro")

/* URL - API */
const URL_API = "https://ctd-todo-api.herokuapp.com/v1";


botao.addEventListener('click', function(evento) {
    
    let body = {
        "firstName": firstName.value,
        "lastName": lastName.value,
        "email": email.value,
        "password": password.value
    }

    let configuracoes = JSON.stringify(body)

    fetch(`${URL_API}/POST/users/`, body).then( (respostaDoServidor) => {
            let json = respostaDoServidor.json
            console.log(json)
    })

    evento.preventDefault()
})