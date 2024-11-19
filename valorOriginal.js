(function () {
    if (app.documents.length === 0) {
        alert("Nenhum documento aberto.");
        return; // Não faz nada se não houver documentos abertos
    }

    var doc = app.activeDocument;
    // Regex para capturar valores monetários que começam após "R$"
    var regex = /R\$ ?(\d{1,3}(\.\d{3})*,\d{2}|\d{1,2},\d{2})/g;
    var valoresEncontrados = [];
    var textFrames = doc.allPageItems;

    for (var i = 0; i < textFrames.length; i++) {
        var item = textFrames[i];

        if (item instanceof TextFrame) {
            var conteudoTexto = item.contents;
            var resultado;

            // Continuar procurando enquanto houver correspondências
            while ((resultado = regex.exec(conteudoTexto)) !== null) {
                var valorOriginal = resultado[0];
                try {
                    var valorNumerico = parseFloat(valorOriginal.replace("R$", "").replace(/\./g, "").replace(",", "."));
                    var valorAtualizado = valorNumerico / 1.15; // Remove 15% do valor
                    valorAtualizado = Math.round(valorAtualizado * 100) / 100; // Arredonda para duas casas decimais
                    var valorAtualizadoStr = "R$ " + valorAtualizado.toFixed(2).replace(".", ",");

                    // Substituir a ocorrência do valor no texto
                    conteudoTexto = conteudoTexto.replace(valorOriginal, valorAtualizadoStr);

                    // Armazenar informações do valor encontrado
                    valoresEncontrados.push({
                        valorOriginal: valorOriginal,
                        valorAtualizado: valorAtualizadoStr,
                        pagina: item.parentPage ? item.parentPage.name : "Página desconhecida"
                    });

                } catch (e) {
                    // Captura o erro, mas não exibe mensagem
                    // console.log("Erro ao atualizar o valor: " + e.message); // Opção para logar em vez de alertar
                }
            }

            // Atualizar o conteúdo do item de texto após todas as substituições
            item.contents = conteudoTexto;
        }
    }

    if (valoresEncontrados.length > 0) {
        var msg = "Valores atualizados:\n";
        for (var j = 0; j < valoresEncontrados.length; j++) {
            var valorInfo = valoresEncontrados[j];
            msg += "Valor original: " + valorInfo.valorOriginal + " | Atualizado: " + valorInfo.valorAtualizado + " | Página: " + valorInfo.pagina + "\n";
        }
        // Exibir um único alert com todas as modificações
        alert(msg);
    } else {
        alert("Nenhum valor monetário encontrado.");
    }
})();
