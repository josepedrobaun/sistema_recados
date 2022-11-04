//INPUTS
const numeroRecadoHTML = document.querySelector('#numero_recado')
const descricaoHTML = document.querySelector('#input-descricao')
const detalhamentoHTML = document.querySelector('#input-detalhamento')
const recadosHTML = document.querySelector('#recados')
const editarHTML = document.querySelector('#texto-editar')
const sairSistemaHTML = document.querySelector('.cabecalho-sair span')
const numeroHTML = document.querySelector('#numero_recado')
const modalHTML = document.querySelector('#pop-up')
const usuarioLogado = JSON.parse(localStorage.getItem(localStorage.getItem('usuarioLogado')))

//BUTTONS
const btnCancelar = document.querySelector('#botao-cancelar')
const btnCadastrar = document.querySelector('#botao-cadastrar')
const btnNovoRecado = document.querySelector('#novo-recado')

//LOAD DOM
document.addEventListener('DOMContentLoaded', (()=>{
    if(!usuarioLogado){
        location.assign('index.html')
        return
    } 
    console.log(usuarioLogado)
    mostrarRecados(usuarioLogado)
}))

btnCadastrar.addEventListener('click', criarRecado)
btnCancelar.addEventListener('click', cancelaEdicao)
btnNovoRecado.addEventListener('click', abrirModal)
sairSistemaHTML.addEventListener('click', sairSistema)

//FUNÇÔES
function abrirModal() {
    modalHTML.showModal()
}

function criarRecado() {
    const numeroRecado = numeroRecadoHTML.value
    const descricao = descricaoHTML.value
    const detalhamento = detalhamentoHTML.value

    //VERIFICA SE ESTÃO PREENCHIDOS OS CAMPOS(VALUES)
    if(!descricao || !detalhamento){
        alert('A descrição e o detalhamento devem ser preenchidos')
        return
    }

    //CRIAÇÃO DO OBJETO RECADONOVO RECEBENDO AS DUAS PROPRIEDADES
    recadoNovo = {
        descricao,
        detalhamento
    }

    //VERIFICA SE TEM UM NÚMERO JÁ ANEXADO, SE NÃO, CRIA NO FINAL DA LISTA
    if(numeroRecado){
        usuarioLogado.recados[numeroRecado] = recadoNovo
    } else {
        usuarioLogado.recados.push(recadoNovo)
    }
    
    salvarNoLocalStorage(usuarioLogado)
    
    limparDados()
    
    mostrarRecados(usuarioLogado)

    cancelaEdicao()
}

//EDITAR RECADO AO CLICAR NO BOTÃO
function editarRecado(id, usuario){
    const usuarioDoRecado = JSON.parse(localStorage.getItem(usuario))
    const recadoParaEditar = usuarioDoRecado.recados[id]
    console.log(usuarioDoRecado.recados[id]);

    btnCadastrar.value = 'Atualizar'
    detalhamentoHTML.style = 'width: 40%'
    btnCancelar.style = 'display: inline-block'

    numeroHTML.value = id
    descricaoHTML.value = recadoParaEditar.descricao
    detalhamentoHTML.value = recadoParaEditar.detalhamento
}

//CANCELA A EDIÇÃO E RESETA OS CAMPOS
function cancelaEdicao(){
    detalhamentoHTML.style = ''
    detalhamentoHTML.value = ''

    descricaoHTML.value = ''
    btnCancelar.style = ''
    numeroHTML.value = ''
    modalHTML.close()
}

//EXCLUI O RECADO ATRÁVES DA ID
function excluirRecado(id, usuario){
    const usuarioDoRecado = JSON.parse(localStorage.getItem(usuario))
    usuarioDoRecado.recados.splice(id, 1)
    localStorage.setItem(usuario, JSON.stringify(usuarioDoRecado))

    let usuarioNovosRecados = JSON.parse(localStorage.getItem(usuario))

    mostrarRecados(usuarioNovosRecados)
}

//SALVANDO NO LOCALSTORAGE O NOVO RECADO
function salvarNoLocalStorage(dados){
    localStorage.setItem(dados.usuario, JSON.stringify(dados))
}

//EXIBIR RECADO NA TELA
function mostrarRecados(usuario){
    
    recadosHTML.innerHTML = ''
    
    recadosUsuarioLogado = usuario.recados
    
    let btn = []
    
    recadosUsuarioLogado.forEach((recado ,index, ) => {
        
        let novaLinha = document.createElement('tr')
        novaLinha.setAttribute('id', `linha_recado_${index}`)
        
        let numeroRecado = document.createElement('td')
        numeroRecado.innerText = `${index+1}`
        
        let descricao = document.createElement('td')
        descricao.innerText = recado.descricao
        
        let detalhamento = document.createElement('td')
        detalhamento.innerText = recado.detalhamento
        
        let tdBotoes = document.createElement('td')
        
        let botaoEditar = document.createElement('button')
        botaoEditar.setAttribute('class', `btn btn-success mb-1 mb-md-0 mt-1 mt-md-0 editar`)
        botaoEditar.setAttribute('id', `btn_editar_${index}`)
        botaoEditar.setAttribute('onclick', `editarRecado(${index}, '${usuarioLogado.usuario}')`)
        botaoEditar.innerText = 'Editar'
        
        let botaoExcluir = document.createElement('button')
        botaoExcluir.setAttribute('class', `btn btn-danger ms-0 ms-md-3 excluir`)
        botaoExcluir.setAttribute('id', `btn_excluir_${index}`)
        botaoExcluir.setAttribute('onclick', `excluirRecado(${index}, '${usuarioLogado.usuario}')`)
        botaoExcluir.innerText = 'Excluir'
        
        novaLinha.appendChild(numeroRecado)
        novaLinha.appendChild(descricao)
        novaLinha.appendChild(detalhamento)
        
        tdBotoes.appendChild(botaoEditar)
        tdBotoes.appendChild(botaoExcluir)
        novaLinha.appendChild(tdBotoes)
        
        recadosHTML.appendChild(novaLinha)
        
        btn.push(novaLinha)
    })
}

//LIMPA OS DADOS DAS INFORMAÇÕES
function limparDados(){
    numeroRecadoHTML.value = ''
    descricaoHTML.value = ''
    detalhamentoHTML.value = ''
}

//LOGOUT DO SISTEMA 
function sairSistema(){
    localStorage.removeItem('usuarioLogado')
    location.assign('login.html')
}

