(function verificarSessao() {
    const usuarioLogado = localStorage.getItem('usuario_logado');

    if (!usuarioLogado) {
        window.location.href = './login.html';
    }
})();
