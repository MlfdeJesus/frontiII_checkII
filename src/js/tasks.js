/* 1. Declarando as variáveis globais */
const URL_API = "https://ctd-todo-api.herokuapp.com/v1";
const jwt = localStorage.getItem('jwt');
let infoUsuario;
let tasks;
let botaoSair = document.getElementById("finalizarSessao");

const settings = {
    headers : {
        "authorization": `${jwt}`
    },
};



/* 2. Escutando evento de carregamento da page para chamar as funções para requisições dos dados e tarefas do usuário e renderiza-los no viewport */
window.addEventListener("load",   () =>{
    
    buscaInfosDoUsuario()
    buscaTarefasUsuario()
    
});


async function buscaInfosDoUsuario(){
    try {
        const response = await fetch(`${URL_API}/users/getMe`, settings);
        const responseEmJson = await response.json();
        infoUsuario = responseEmJson;
        let divNomeUsuario = document.getElementById("nomeUsuario");
        let tituloNomeUsuario = document.createElement("h1");
        tituloNomeUsuario.innerText = `${infoUsuario.firstName} ${infoUsuario.lastName}`;
        divNomeUsuario.appendChild(tituloNomeUsuario)
    }catch(error){
        console.error(error)
    };
}

async function buscaTarefasUsuario(){
    try{
        const response = await fetch(`${URL_API}/tasks`, settings);
        const responseEmJson = await response.json();
        tasks = responseEmJson;

        tasks.forEach(tarefa => {
            let listadeTarefas = document.getElementById("listaTasks")
            let itemListaTarefas = document.createElement("li");
            let caixaTextoData = document.createElement("div")
            let textoTarefa = document.createElement("p");
            let dataTarefa = document.createElement("p");
            let lixeira = document.createElement("div");
            let iconeLixeira = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>` 

            let data = new Date(tarefa.createdAt);
            let dataFormatada = data.toLocaleDateString('pt-BR')
            
            itemListaTarefas.classList.add("list-group-item");
            textoTarefa.innerText = `${tarefa.description}`;
            dataTarefa.innerText =  `${dataFormatada}`;
            caixaTextoData.appendChild(textoTarefa);
            caixaTextoData.appendChild( dataTarefa);
            caixaTextoData.classList.add("itemBox")
            itemListaTarefas.appendChild(caixaTextoData);
            lixeira.innerHTML = iconeLixeira;
            lixeira.classList.add("delete")
            itemListaTarefas.appendChild(lixeira);
            listadeTarefas.appendChild(itemListaTarefas);



            lixeira.addEventListener('click', (evento) => {
                evento.target.id = tarefa.id
                console.log(evento.target.id)
            
                deletarTarefa(evento.target.id);
            
            
            });
            
        });
    }catch(error){
        console.error(error)
    };
    
}



/* Adicionando uma nova tarefa */

// 1 Recuperando elementos necessários
let formNovaTarefa = document.getElementById("formAdicionaTarefa");
let inputNovaTarefa = document.getElementById("novaTarefa");
let botaoTarefa = document.getElementById("botaoTarefa");


// 2 Escutando evento de submit do formulário de envio de uma nova tarefa
formNovaTarefa.addEventListener("submit", (evento) => {
    evento.preventDefault();

    // 3 Validação simples para evitar envio de tarefas sem conteúdo
    if(inputNovaTarefa.value.length > 0){
        
        // 4 Criação das configurações necessárias para requisição a API (envio das novas tarefas)
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
        
        // 5 Requisição de envio das novas tarefas
        fetch(`${URL_API}/tasks`, settings)
        .then((response)=> {
            return response.json()
        }).then(() => {
            window.location.reload()
        }).catch((error) => {
            console.error(error);
        })
    
        // 4.6 Reset do input (limpa o input do conteúdo digitado)
        formNovaTarefa.reset()
    }else{
        alert("Adicione uma tarefa válida!")
    }   
    
})



/* Deletando uma tarefa */
function deletarTarefa(id){
        
    const settings = {
        method : "DELETE", 

        headers : {

            'Content-type': 'application/json',
            "authorization": `${jwt}`
        },
    };

    fetch(`${URL_API}/tasks/${id}`, settings)
    .then((response)=> {

    let status = response.status
        return status;

    }).then((status) => {
        if(status == 200){

            window.location.reload()

        }
        
    }).catch((error) => {
        console.error(error)
    })

}



// Fazer voltar para tela de login
botaoSair.addEventListener('click', () =>{
    
    location.href = "index.html";

    alert("volte sempre!")

});

