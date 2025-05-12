import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const PORT = 80;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

app.post('/api/mysql', async (req, res) => {
    const { nome, login, senha, tipo, id, domain } = req.body;

    var strSql = "";

    let srvHost = '127.0.0.1';
    let srvUser = 'root';
    let srvPassword = 'senac@02';
    let srvDatabase = 'cacau_rock';

    if (domain != 'localhost') {
        srvHost = 'sql.freedb.tech';
        srvUser = 'freedb_cacau';
        srvPassword = '$MSf4sc$fw*zE34';
        srvDatabase = 'freedb_cacaurock';
    }

    const pool = mysql.createPool({
        host: srvHost,
        user: srvUser,
        password: srvPassword,
        database: srvDatabase
    });

    try {
        switch (tipo) {
            case 'cadastro': 
                strSql = `SELECT * FROM \`${srvDatabase}\`.\`tbl_login\` WHERE \`login\` = '${login}';`;
                const [existe] = await pool.query(strSql);

                if (existe.length > 0) {
                    return res.json({ message: 'Login já cadastrado!', error: 'Favor digitar outro login!' });
                }

                strSql = `INSERT INTO \`${srvDatabase}\`.\`tbl_login\` (\`nome\`, \`login\`, \`senha\`) VALUES ('${nome}', '${login}', MD5('${senha}'));`;
                const [inserido] = await pool.query(strSql);

                if (inserido.affectedRows > 0) {
                    return res.json({ message: 'Usuário cadastrado com sucesso!' });
                } else {
                    throw new Error('Não foi possível cadastrar o usuário.');
                }
                break;
            case 'login': 
                strSql =  `SELECT * FROM \`${srvDatabase}\`.\`tbl_login\` WHERE \`login\` = '${login}' AND \`senha\` = MD5('${senha}');`;
                const [rows] = await pool.query(strSql);

                if (rows.length == 1) {
                    return res.json({ message: 'Usuário logado com sucesso! Redirecionando...', id: rows[0].id });
                } else {
                    throw new Error('Login inválido ou senha incorreta.');
                }
                break;
            default:
                throw new Error(`Tipo '${tipo}' não reconhecido.`);
                break;
        }
    } catch (err) {
        res.status(500).json({
            message: `Erro: ${err.message} - ${strSql}`,
            error: err.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
