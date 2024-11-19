// Inicia o script para Adobe InDesign
function deleteDuplicatePages() {
    var doc = app.activeDocument;
    
    if (!doc || doc.pages.length === 0) {
        alert("Nenhuma página encontrada no documento.");
        return;
    }

    var duplicatePages = [];
    var lnTexts = {};
    var pageCounter = 0;

    for (var i = 0; i < doc.pages.length; i++) {
        var page = doc.pages[i];
        pageCounter++;

        var textFrames = page.textFrames;
        var hasDuplicate = false;

        for (var j = 0; j < textFrames.length; j++) {
            var textFrame = textFrames[j];
            var textContents = String(textFrame.contents);

            if (textContents.indexOf("LN") === 0) {
                if (lnTexts[textContents]) {
                    duplicatePages.push(page);
                    hasDuplicate = true;
                    break;
                } else {
                    lnTexts[textContents] = true;
                }
            }
        }

        if (pageCounter % 500 === 0) {
            alert(pageCounter + " páginas avaliadas até agora.");
        }
    }

    // Remove todas as páginas duplicadas de uma vez
    if (duplicatePages.length > 0) {
        for (var k = duplicatePages.length - 1; k >= 0; k--) {
            duplicatePages[k].remove();
        }
    }

    alert("Processo concluído! Total de " + pageCounter + " páginas avaliadas. Páginas duplicadas removidas com sucesso.");
}

// Executa o script
deleteDuplicatePages();
