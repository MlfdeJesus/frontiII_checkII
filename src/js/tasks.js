/* Variáveis globais */
const jwt = localStorage.getItem('jwt');
let infoUsuario;
let tasks;
/* URL - API */
const URL_API = "https://ctd-todo-api.herokuapp.com/v1";



window.addEventListener("load", async () =>{
    
    // criando as configurações necessárias para as requisições a API
    const settings = {
        headers : {
            "authorization": " "
        },
    };
    
    settings.headers.authorization = `${jwt}`;

    // requisição para requerer as informações do usuário
    try {
        const response = await fetch(`${URL_API}/users/getMe`, settings);
        const responseEmJson = await response.json();
        infoUsuario = responseEmJson;
    }catch(error){
        console.error(error)
    };

    
    /* Renderizando informações do usuário na tela */
    let divNomeUsuario = document.getElementById("nomeUsuario");
    let tituloNomeUsuario = document.createElement("h1");
    tituloNomeUsuario.innerText = `${infoUsuario.firstName} ${infoUsuario.lastName}`;
    divNomeUsuario.appendChild(tituloNomeUsuario);
    

    // requisição para requerer tarefas do usuario
    
    try{
        const response = await fetch(`${URL_API}/tasks`, settings);
        const responseEmJson = await response.json();
        tasks = responseEmJson;
    }catch(error){
        console.error(error)
    };


    tasks.map((tarefa) => {
    
        // recuperando e criando elementos necessários
        let listadeTarefas = document.getElementById("listaTasks")
        let itemListaTarefas = document.createElement("li");
        let caixaTextoData = document.createElement("div")
        let caixaCheck = document.createElement("div")
        let textoTarefa = document.createElement("p");
        let dataTarefa = document.createElement("p");
        let check = document.createElement("input")

    
    
        // tratando os dados de data
        let data = new Date(tarefa.createdAt);
        let dataFormatada = data.toLocaleDateString('pt-BR')
    
        // adicionando texto e atributos aos elementos
        itemListaTarefas.classList.add("list-group-item");
        textoTarefa.innerText = `${tarefa.description}`;
        dataTarefa.innerText =  `${dataFormatada}`;
        caixaTextoData.appendChild(textoTarefa);
        caixaTextoData.appendChild( dataTarefa);
        caixaTextoData.classList.add("itemBox")
        check.classList.add("form-check-input","me-1")
        check.setAttribute("type", "checkbox")
        caixaCheck.appendChild(check)
        itemListaTarefas.appendChild(caixaCheck)
        itemListaTarefas.appendChild(caixaTextoData);
        listadeTarefas.appendChild(itemListaTarefas)

    
    });
    
});




/* Adiciona uma nova tarefa */

let formNovaTarefa = document.getElementById("formAdicionaTarefa");
let inputNovaTarefa = document.getElementById("novaTarefa");
let botaoTarefa = document.getElementById("botaoTarefa")


formNovaTarefa.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if(inputNovaTarefa.length > 0){
        let body = {
            "description": `${inputNovaTarefa.value}`,
            "completed": false
        }
    
        const settings = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json', 
                'Authorization': `${jwt}` 
            }
        }
    
        console.log(settings)
    
        fetch(`${URL_API}/tasks`, settings)
        .then((response)=> {
            return response.json()
        }).then(() => {
            window.location.reload()
        }).catch((error) => {
            console.error(error);
        })
    
        formNovaTarefa.reset()
    }else{
        alert("Adicione uma tarefa válida!")
    }   
    
})

/* Atualizando a tarefa como concluida */
let checkbox = document.getElementsByTagName("input")


console.log(checkbox)