document.getElementById('frmCadastro').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('txtNome').value.trim();
    const login = document.getElementById('txtEmail').value.trim();
    const senha = document.getElementById('txtSenha').value.trim();
    const notificacao = document.getElementById('notificacao');
    const tipo = 'cadastro';

    if (!nome || !login || !senha ) {
        notificacao.innerText = "Todos os campos são obrigatórios.";
        return;
    }
    const response = await fetch('/api/mysql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, login, senha, tipo })
    });

    const result = await response.json();
    console.log(result.message);

    if (result.sucesso) {
        window.location.href = './login.html';
    } else {
        notificacao.innerText = result.message || 'Erro ao cadastrar';
    }
});