function removePagesWithCodes() {
    // Definir o caminho do arquivo codigos.txt (ajuste o caminho conforme necessário)
    var filePath = File("~/Desktop/codigos.txt"); // Exemplo de caminho no Desktop

    // Verificar se o arquivo existe
    if (!filePath.exists) {
        alert("Arquivo codigos.txt não encontrado. Verifique o caminho.");
        return;
    }

    // Abrir o arquivo e ler os códigos
    filePath.open("r");
    var codesToRemove = [];
    while (!filePath.eof) {
        var line = filePath.readln();
        if (line) { // Adiciona apenas linhas não vazias ao array, após usar trim para remover espaços em branco
            codesToRemove.push(line.toString().trim());
        }
    }
    filePath.close();

    // Obter o documento ativo
    var doc = app.activeDocument;

    // Verificar cada página do documento
    for (var i = doc.pages.length - 1; i >= 0; i--) {
        var page = doc.pages[i];
        var found = false;

        // Verificar se algum dos códigos está presente na página
        for (var j = 0; j < codesToRemove.length; j++) {
            var code = codesToRemove[j];
            var foundItems = page.findText(code);

            if (foundItems.length > 0) {
                found = true;
                break;
            }
        }

        // Apagar a página se o código foi encontrado
        if (found) {
            page.remove();
        }
    }
}

removePagesWithCodes();
