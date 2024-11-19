const fs = require('fs');

// Caminho para o arquivo JSON
const inputJsonFile = './formatted_output.json';

// Função para extrair valores de preço e desconto
function extractPrices(line) {
    const pricePattern = /R\$([\d.,]+)/g;
    const matches = [...line.matchAll(pricePattern)];
    return matches.map(match => match[1].replace(',', '.')); // Converte para formato numérico
}

// Função para gerar as queries de inserção a partir do JSON
function generateInsertQueries() {
    const jsonData = JSON.parse(fs.readFileSync(inputJsonFile, 'utf8'));

    const queries = [];
    for (const [groupKey, groupData] of Object.entries(jsonData)) {
        const codigo = groupData.linha1 || '';
        let nome = '';
        let quantidade_por_box = '';
        let quantidade_por_caixa = '';
        let preco_unidade = '';
        let preco_box = '';
        let desconto = '';
        let preco_com_desconto = '';

        // Verifica cada linha para identificar nome, quantidades, e preços/descontos
        for (const [key, line] of Object.entries(groupData)) {
            if (line) {
                if (line.includes('/BOX') && !quantidade_por_box) {
                    quantidade_por_box = line;
                } else if (line.includes('/CX') && !quantidade_por_caixa) {
                    quantidade_por_caixa = line;
                } else if (line.startsWith("PREÇO")) {
                    const prices = extractPrices(line);
                    if (prices.length > 0) preco_unidade = prices[0]; // Primeiro valor de PREÇO UNID.
                    if (prices.length > 1) preco_box = prices[1]; // Segundo valor de PREÇO BOX
                } else if (line.startsWith("15%")) {
                    const discountPrices = extractPrices(line);
                    if (discountPrices.length > 0) desconto = discountPrices[0]; // Primeiro valor de desconto
                    if (discountPrices.length > 1) preco_com_desconto = discountPrices[1]; // Segundo valor de desconto
                } else {
                    nome += ` ${line}`; // Concatena ao nome se não for quantidade ou preço
                }
            }
        }

        // Cria a query SQL
        const query = `
            INSERT INTO produtos (codigo, nome, quantidade_por_box, quantidade_por_caixa, preco_unidade, preco_box, desconto, preco_com_desconto)
            VALUES ('${codigo}', '${nome.trim()}', '${quantidade_por_box}', '${quantidade_por_caixa}', '${preco_unidade || 0}', '${preco_box || 0}', '${desconto || 0}', '${preco_com_desconto || 0}');
        `;
        queries.push(query.trim()); // Remove espaços extras
    }

    // Salva as queries em um arquivo de texto
    fs.writeFileSync('./insert_queries.txt', queries.join('\n\n'));
    console.log(`Queries de inserção geradas e salvas em insert_queries.txt`);
}

// Executar a função
generateInsertQueries();
