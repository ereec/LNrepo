const fs = require('fs');

// Caminho para o arquivo de entrada e saída
const inputTxtFile = './extracted_codes.txt';
const outputJsonFile = './formatted_output.json';

function formatLines() {
    // Lê o conteúdo do arquivo TXT
    const fileContent = fs.readFileSync(inputTxtFile, 'utf8');
    
    // Divide o conteúdo em grupos, considerando que uma linha em branco separa os grupos
    const groups = fileContent.split('\n\n');
    const formattedGroups = {}; // Objeto para armazenar os grupos formatados

    groups.forEach((group, index) => {
        // Divide o grupo em linhas e remove linhas vazias
        let lines = group.split('\n').map(line => line.trim()).filter(line => line);

        // Verifica se existem linhas e se a primeira linha começa com "LN"; caso contrário, move o código LN para a linha1
        if (lines.length > 0 && !lines[0].startsWith("LN")) {
            const lnCodeIndex = lines.findIndex(line => line.startsWith("LN"));
            if (lnCodeIndex !== -1) {
                // Move o código LN para a primeira posição
                const lnCode = lines.splice(lnCodeIndex, 1)[0];
                lines.unshift(lnCode);
            }
        }

        // Monta o grupo formatado com linhas numeradas
        const groupObject = {};
        lines.forEach((line, lineIndex) => {
            groupObject[`linha${lineIndex + 1}`] = line;
        });

        // Adiciona o grupo formatado ao objeto final
        formattedGroups[`grupo${index + 1}`] = groupObject;
    });

    // Grava o resultado em um novo arquivo JSON
    fs.writeFileSync(outputJsonFile, JSON.stringify(formattedGroups, null, 2));
    console.log(`Conteúdo formatado salvo em ${outputJsonFile}`);
}

// Executar a função
formatLines();
