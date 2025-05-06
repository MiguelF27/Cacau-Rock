// // var domain = window.location.hostname;

// // document.getElementById('frmLogin').addEventListener('submit', async (e) => {
// //     e.preventDefault();
// //     const id = "";
// //     const nome = "";
// //     const login = document.getElementById('txtLogin').value.trim();
// //     const senha = document.getElementById('txtSenha').value.trim();
// //     const tipo = 'login';

// //     const response = await fetch('/api/mysql', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ nome, login, senha, tipo, id, domain })
// //     });

    
// //     const result = await response.json();
// //     console.log(result.message);

// //     if (result.error) {
// //         notificacao.innerText = result.error;
// //         return false;
// //     } else {
// //         notificacao.innerText = result.message;
// //         localStorage.setItem('usuario_logado', result.id);
// //         window.setTimeout(() => {
// //             window.open('./index.html', '_self');
// //         }, 5000);
// //     }
// // });
// var domain = window.location.hostname;

// document.getElementById('frmLogin').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const txtLogin = document.getElementById('txtLogin');
//     const txtSenha = document.getElementById('txtSenha');
//     const notificacao = document.getElementById('notificacao');

//     const id = "";
//     const nome = "";
//     const login = txtLogin.value.trim();
//     const senha = txtSenha.value.trim();
//     const tipo = 'login';

//     if (login.length == 0) {
//         notificacao.innerText = "É necessário digitar um login para continuar!";
//         txtLogin.focus();
//         return false;
//     }

//     if (senha.length == 0) {
//         notificacao.innerText = "É necessário digitar uma senha para continuar!";
//         txtSenha.focus();
//         return false;
//     }

//     const response = await fetch('/api/mysql', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ nome, login, senha, tipo, id, domain })
//     });

//     const result = await response.json();
//     console.log(result.message);

//     if (result.error) {
//         notificacao.innerText = result.error;
//         return false;
//     } else {
//         notificacao.innerText = result.message;
//         localStorage.setItem('usuario_logado', result.id);
//         window.setTimeout(() => {
//             window.open('./index.html', '_self');
//         }, 5000);
//     }
// });