(function verificarSessao() {
    const usuarioLogado = localStorage.getItem('usuario_logado');

    if (!usuarioLogado) {
        alert('Sessão expirada ou não iniciada. Redirecionando para login.');
        window.location.href = './login.html';
    }
})();
