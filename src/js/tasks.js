/* Variáveis globais */
let jwt = "";
let infoUsuario;
let tasks;
const settings = {
    headers : {
        "authorization": " ",

    }
}
/* URL - API */
const URL_API = "https://ctd-todo-api.herokuapp.com/v1";



window.addEventListener("load", async () =>{
    jwt = localStorage.getItem("jwt");
    
    settings.headers.authorization = `${jwt}`


    // requisição para requerer as informações do usuário
    try {
        const response = await fetch(`${URL_API}/users/getMe`, settings);
        const responseEmJson = await response.json();
        infoUsuario = responseEmJson;
    }catch(error){
        console.log(error)
    }

    // requisição para requerer tarefas do usuario
    try{
        const response = await fetch(`${URL_API}/tasks`, settings);
        const responseEmJson = await response.json();
        tasks = responseEmJson;
    }catch(error){
        console.log(error);
    }
    
    /* Recuperando elementos */
    let divNomeUsuario = document.getElementById("nomeUsuario")
    let paragrafoNomeUsuario = document.createElement("p")

    /* Renderizando informações do usuário na tela */
    paragrafoNomeUsuario.innerText = `${infoUsuario.firstName} ${infoUsuario.lastName}`;

    divNomeUsuario.appendChild(paragrafoNomeUsuario);
    
})


