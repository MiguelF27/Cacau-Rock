import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const PORT = 80;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

app.post('/api/mysql', async (req, res) => {
    const { nome = '', login = '', senha = '', tipo = '', id = '', domain = 'localhost' } = req.body;

    let srvHost = '127.0.0.1';
    let srvUser = 'root';
    let srvPassword = 'senac@02';
    let srvDatabase = 'cacau_rock';

    if (domain != 'localhost') {
        srvHost = 'sql.freedb.tech';
        srvUser = 'freedb_freedb_cacau';
        srvPassword = '#f#5MYXcM79NpHu';
        srvDatabase = 'freedb_cacau';
    }

    const pool = mysql.createPool({
        host: srvHost,
        user: srvUser,
        password: srvPassword,
        database: srvDatabase
    });

    try {
        switch (tipo) {
            case 'cadastro': {
                const [existe] = await pool.query(
                    `SELECT * FROM \`${srvDatabase}\`.\`tbl_login\` WHERE \`login\` = ?`, [login]);

                if (existe.length > 0) {
                    return res.json({ message: 'Login já cadastrado!', error: 'Favor digitar outro login!' });
                }

                const [inserido] = await pool.query(
                    `INSERT INTO \`${srvDatabase}\`.\`tbl_login\` (\`nome\`, \`login\`, \`senha\`) VALUES (?, ?, MD5(?))`,
                    [nome, login, senha]
                );

                if (inserido.affectedRows > 0) {
                    return res.json({ message: 'Usuário cadastrado com sucesso!' });
                } else {
                    throw new Error('Não foi possível cadastrar o usuário.');
                }
            }
            case 'login': {
                const [rows] = await pool.query(
                    `SELECT * FROM \`${srvDatabase}\`.\`tbl_login\` WHERE \`login\` = ? AND \`senha\` = MD5(?)`,
                    [login, senha]
                );

                if (rows.length === 1) {
                    return res.json({ message: 'Usuário logado com sucesso! Redirecionando...', id: rows[0].id });
                } else {
                    throw new Error('Login inválido ou senha incorreta.');
                }
            }
            default:
                throw new Error(`Tipo '${tipo}' não reconhecido.`);
        }
    } catch (err) {
        res.status(500).json({
            message: `Erro: ${err.message}`,
            error: err.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
