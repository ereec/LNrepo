const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const { createObjectCsvStringifier } = require('csv-writer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para JSON
app.use(bodyParser.json());

// Configurar conexão com o banco de dados
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ln_catalogo',
});

// Rota para "/"
app.get('/', (req, res) => {
  res.send('Servidor Node.js está funcionando corretamente!');
});

// Rota para exportar produtos selecionados
app.get('/exportar-csv', (req, res) => {
  const { ids } = req.body; // Recebe os IDs dos produtos selecionados

/*  if (!ids || ids.length === 0) {
    return res.status(400).json({ error: 'Nenhum ID foi fornecido.' });
  }
*/

  // Consulta para buscar os produtos
  const query = `
    SELECT * FROM produtos WHERE 1=1
  `;

  db.query(query, [ids], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar produtos no banco de dados.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Nenhum produto encontrado para os IDs fornecidos.' });
    }

    // Caminho para salvar o CSV temporariamente
    const filePath = path.join(__dirname, 'produtos_selecionados.csv');

    // Configurar o CSV Writer
    const csvStringifier = createObjectCsvStringifier({
      path: filePath,
      header: [
        { id: 'id', title: 'ID' },
        { id: 'codigo', title: 'Código' },
        { id: 'nome', title: 'Nome' },
        { id: 'quantidade_por_box', title: 'Qtd/Box' },
        { id: 'quantidade_por_caixa', title: 'Qtd/Caixa' },
        { id: 'preco_unidade', title: 'Preço Unitário' },
        { id: 'preco_box', title: 'Preço Box' },
        { id: 'desconto', title: 'Desconto' },
        { id: 'preco_com_desconto', title: 'Preço com Desconto' },
      ],
    });

    // Gerar CSV com BOM para evitar problemas de acentuação
      const csvData = '\uFEFF' + csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(produtosSelecionados);

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="produtos_selecionados.csv"');
      res.send(csvData);
    });

    // Escrever os dados no CSV
    
    csvStringifier
    
      .writeRecords(results)
      .then(() => {
        // Enviar o arquivo CSV como resposta
        res.download(filePath, 'produtos_selecionados.csv', (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao enviar o arquivo CSV.' });
          }

          // Remover o arquivo temporário após o download
          fs.unlink(filePath, (err) => {
            if (err) console.error('Erro ao excluir o arquivo temporário:', err);
          });
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Erro ao gerar o arquivo CSV.' });
      });
  });
// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});