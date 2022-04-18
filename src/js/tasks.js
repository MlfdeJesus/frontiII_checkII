/* Variáveis globais */

const jwt = localStorage.getItem('jwt');
let infoUsuario;
let tasks;
let botaoSair = document.getElementById("finalizarSessao");

/* URL - API */
const URL_API = "https://ctd-todo-api.herokuapp.com/v1";



window.addEventListener("load", async () =>{
    
    // criando as configurações necessárias para as requisições a API
    const settings = {
        headers : {
            "authorization": `${jwt}`
        },
    };
    

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
            
        })

    }



    tasks.map((tarefa) => {

        console.log(tarefa);
        
        // recuperando e criando elementos necessários
        let completedTasks = document.getElementById("completasTasks")
        let listadeTarefas = document.getElementById("listaTasks")

        //pegando o id da tarefa e armezenando o elemento id
        
        let id = tarefa.id

        //aqui é onde estou criando a poha da li que é onde vc vai colocar os elementos

        let itemListaTarefas = document.createElement("li");
        let caixaTextoData = document.createElement("div")
        let caixaCheck = document.createElement("div")
        let textoTarefa = document.createElement("p");
        let dataTarefa = document.createElement("p");
        let check = document.createElement("input");
        let lixeira = document.createElement("div");
        let iconeLixeira = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg>` 

        lixeira.innerHTML = iconeLixeira;

    
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
        itemListaTarefas.appendChild(caixaCheck);
        itemListaTarefas.appendChild(caixaTextoData);
        lixeira.classList.add("delete")
        itemListaTarefas.appendChild(lixeira);
        
        


        if (tarefa.completed === false){

            listadeTarefas.appendChild(itemListaTarefas);
            lixeira.addEventListener('click', () => {

                deletarTarefa(id);
    
            });
        }else{

            completedTasks.appendChild(itemListaTarefas);

        }
    });
    
});




/* Adiciona uma nova tarefa */

let formNovaTarefa = document.getElementById("formAdicionaTarefa");
let inputNovaTarefa = document.getElementById("novaTarefa");
let botaoTarefa = document.getElementById("botaoTarefa");



formNovaTarefa.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if(inputNovaTarefa.value.length > 0){
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






// Fazer voltar para tela de login
botaoSair.addEventListener('click', () =>{
    
    location.href = "index.html";

    alert("volte sempre!")

})
