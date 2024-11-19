const { OpenAI } = require("openai");
const fs = require("fs");

// Sua chave da API OpenAI
const openai = new OpenAI({
  
});

// Função para processar o arquivo em blocos de 20000 caracteres
async function processFile() {
  try {
    // Lê o conteúdo do arquivo 'extracted_codes'
    const data = fs.readFileSync('extracted_codes.txt', 'utf8');

    // Função para dividir o texto em blocos de 20000 caracteres
    const chunkSize = 20000;
    const chunks = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      chunks.push(data.slice(i, i + chunkSize));
    }

    // Função para fazer a requisição com intervalo
    const processChunks = async (chunks) => {
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];

        // Envia o conteúdo para a API do GPT-3.5
        try {
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Usa o modelo GPT-3.5
            messages: [{
              role: "user", 
              content: `Formate o seguinte texto no seguinte formato:

              codigo: "LN03004";
              nome:"Batom Lua & Neve";
              quantidadeBox:"12 PÇS/BOX";
              quantidadeCaixa:"100 BOX/CX";
              preçoTotalUnidade:"R$1,33"
              preçoTotalBox:"R$16,00";
              preçoDescontoUnidade:"R$1,13"
              preçoDescontoBox:"R$13,60";

              O texto a ser formatado é:

              "${chunk}"
              `
            }]
          });

          // Extrai o conteúdo formatado da resposta
          const formattedData = response.choices[0].message.content;

          // Salva o conteúdo formatado no arquivo 'textoFormatado.txt'
          fs.appendFileSync('textoFormatado.txt', formattedData, 'utf8');
          console.log(`Texto formatado do bloco ${i + 1} salvo`);

        } catch (error) {
          console.error(`Erro ao processar o bloco ${i + 1}:`, error);
        }

        // Aguarda 1 minuto antes de fazer a próxima requisição
        if (i < chunks.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 60000)); // Intervalo de 60.000 ms (1 minuto)
        }
      }
    };

    // Processa os blocos com intervalo
    await processChunks(chunks);

  } catch (error) {
    console.error("Erro ao processar o arquivo:", error);
  }
}

// Chama a função para processar o arquivo
processFile();
