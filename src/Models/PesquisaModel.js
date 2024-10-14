const sql = require('mssql');
const dbConfig = require('../Database/BdConfig');

async function procurarProdutos(searchQuery){

    try{
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('searchQuery', sql.VarChar, `%${searchQuery}%`)
            .query('SELECT * FROM Produtos WHERE nome LIKE @searchQuery');
        return result.recordset;
    } catch (err) {
        throw new Error('Erro ao buscar os produtos: ' + err);
    }
}
module.exports = { procurarProdutos };
