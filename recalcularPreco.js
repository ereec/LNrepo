(function () {
    if (app.documents.length === 0) {
        alert("Nenhum documento aberto.");
        return;
    }

    // Obter o documento ativo
    var doc = app.activeDocument;

    // Definir o padrão de expressão regular para valores monetários em formato brasileiro
    var regex = /R\$ ?\d{1,3}(\.\d{3})*,\d{2}/g;

    // Inicializar o array para armazenar os valores encontrados
    var valoresEncontrados = [];

    // Iterar sobre todas as caixas de texto no documento
    var textFrames = doc.allPageItems;

    // Criar uma lista de valores a serem atualizados para evitar conflitos durante a iteração
    var updates = [];

    for (var i = 0; i < textFrames.length; i++) {
        var item = textFrames[i];

        // Verifica se o item é uma caixa de texto
        if (item instanceof TextFrame) {
            var conteudoTexto = item.contents;
            var resultado;

            // Procurar por valores monetários no conteúdo do texto
            while ((resultado = regex.exec(conteudoTexto)) !== null) {
                var valorOriginal = resultado[0];

                try {
                    // Extrair e converter o valor original para número
                    var valorNumerico = parseFloat(valorOriginal.replace("R$", "").replace(/\./g, "").replace(",", "."));

                    // Acrescentar 20% ao valor
                    var valorAtualizado = valorNumerico * 1.20; // 100% + 20% = 120%

                    // Arredondar para duas casas decimais
                    valorAtualizado = Math.round(valorAtualizado * 100) / 100;

                    // Converter de volta para o formato monetário brasileiro com duas casas decimais
                    var valorAtualizadoStr = "R$ " + valorAtualizado.toFixed(2).replace(".", ",");

                    // Adicionar a atualização à lista
                    updates.push({
                        item: item,
                        startIndex: resultado.index,
                        endIndex: resultado.index + valorOriginal.length,
                        valorAtualizadoStr: valorAtualizadoStr
                    });

                    // Armazenar informações do valor encontrado
                    valoresEncontrados.push({
                        valorOriginal: valorOriginal,
                        valorAtualizado: valorAtualizadoStr,
                        pagina: item.parentPage ? item.parentPage.name : "Página desconhecida"
                    });

                } catch (e) {
                    alert("Erro ao atualizar o valor: " + e.message);
                }
            }
        }
    }

    // Agora, aplicar as atualizações após a iteração para evitar conflitos
    for (var j = 0; j < updates.length; j++) {
        var updateInfo = updates[j];
        var item = updateInfo.item;

        // Verificar se o item ainda é válido antes de tentar atualizar
        if (item.isValid) {
            try {
                item.characters.itemByRange(updateInfo.startIndex, updateInfo.endIndex - 1).contents = updateInfo.valorAtualizadoStr;
            } catch (e) {
                alert("Erro ao substituir o valor: " + e.message);
            }
        }
    }

    // Exibir os valores encontrados e atualizados
    if (valoresEncontrados.length > 0) {
        var msg = "Valores atualizados:\n";
        for (var k = 0; k < valoresEncontrados.length; k++) {
            var valorInfo = valoresEncontrados[k];
            msg += "Valor original: " + valorInfo.valorOriginal + " | Atualizado: " + valorInfo.valorAtualizado + " | Página: " + valorInfo.pagina + "\n";
        }
        alert(msg);
    } else {
        alert("Nenhum valor monetário encontrado.");
    }
})();
