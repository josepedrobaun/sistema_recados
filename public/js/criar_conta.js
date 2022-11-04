//INPUT
const usuarioHTML =  document.getElementById('usuario')
const senhaHTML =  document.getElementById('senha')
const confirmaSenhaHTML = document.getElementById('confirma_senha')
const formHTML = document.getElementById('create-form')

formHTML.addEventListener('submit', (e) => {
    e.preventDefault()

    const existeUsuario = verificaUsuario(usuarioHTML.value)

    //CASO EXISTIR O USUÁRIO COM ESTE NOME, RETORNA ALERTA
    if(usuarioHTML.value === existeUsuario.usuario) {
        alert('Nome do usuário já existe')
        return
    }

    //CASO AS SENHAS NÃO ESTAREM IGUAIS, RETORNA ALERTA
    if(senhaHTML.value !== confirmaSenhaHTML.value) {
        alert('Senha e confirmação de senha não conferem!')
        return
    }

    //SALVANDO OBJETO USUARIO,SENHA E RECADOS NO LOCALSTORAGE
    salvarUsuario({
        usuario: usuarioHTML.value,
        senha: senhaHTML.value,
        recados: []
    })

    alert('Conta criada com sucesso!')
    localStorage.setItem('usuarioLogado', `${usuarioHTML.value}`)
    location.assign('./home.html')
})

//SALVA O USUÁRIO NO LOCAL STORAGE
function salvarUsuario(data) {
    localStorage.setItem(data.usuario, JSON.stringify(data))
}

//VERIFICA SE EXISTE JÁ ESTE USUÁRIO COM O MESMO NOME
function verificaUsuario(nome) {
    const user = localStorage.getItem(nome)

    if(user) {
        return JSON.parse(user)
    }

    return ''
}