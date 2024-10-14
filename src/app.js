// app.js
const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const { conectarBanco } = require('./Database/BdConfig');
const produtoRoutes = require('./Routes/ProdutoRoutes');
const artesaoRoutes = require('./Routes/ArtesaoRoutes');
const cadastroRoutes = require('./Routes/CadastroRoutes'); 
const loginRoutes = require('./Routes/LoginRoutes');
const bodyParser = require('body-parser');
const pesquisaRoutes = require('./Routes/PesquisaRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Inicia a conexão ao banco de dados
conectarBanco();

// Rotas
app.use('/Produto', produtoRoutes);
app.use('/Artesao', artesaoRoutes);
app.use('/Cadastro', cadastroRoutes);
app.use('/Login', loginRoutes);
//app.use ('/',pesquisaRoutes)
// Exemplo de código com erro

app.get('/search', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).send('Parâmetro de busca não fornecido');
    }

    try {
        // Certifique-se de que a consulta SQL está correta
        const result = await sql.query`
            SELECT * FROM tbl_Produto WHERE Nome LIKE ${'%' + query + '%'}
        `;

        if (result.recordset.length > 0) {
            res.json(result.recordset);
        } else {
            res.status(404).send('Nenhum produto encontrado');
        }
    } catch (error) {
        console.error('Erro ao buscar produtos:', error.message);
        res.status(500).send(`Erro no servidor: ${error.message}`); // Envia o erro detalhado para o cliente
    }
});



app.get('/', (req, res) => {
    return res.json('Servidor Iniciado com Sucesso :)');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});
