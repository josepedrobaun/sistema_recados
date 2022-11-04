//INPUT
formHTML = document.getElementById('login-form')
usuarioHTML = document.getElementById('username')
senhaHTML = document.getElementById('password')
let usuarios = {}

formHTML.addEventListener('submit', (e) => {
    e.preventDefault()

    //CASO ELE ACHE O USUÁRIO O LOGIN DA OK, SE NÃO, RETORNA QUE SENHA OU USUÁRIO NÃO CONFEREM
    usuarios = procuraUsuario(usuarioHTML.value, senhaHTML.value)
    if(!usuarios) {
        return
    }

    localStorage.setItem('usuarioLogado', usuarios.usuario)
    window.location.assign('./index.html')
})

//PROCURA SE EXISTE O USUÁRIO E CONFERE A SENHA
function procuraUsuario(nome,senha) {
    let usuarioEncontrado = JSON.parse(localStorage.getItem(nome))

    if(usuarioEncontrado && usuarioEncontrado.senha === senha) {
        return usuarioEncontrado
    }else {
        alert('Usuário ou senha não conferem!')
        return
    }
}