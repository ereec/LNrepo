// Inicia o script para Adobe InDesign
app.doScript(function() {
    // Caminhos dos arquivos a serem unidos
    var arquivos = [
         
            "D://01-LUA&NEVE//INDD_Catalogo//ANO 2023//CATALOGO_04-12.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//ANO 2023//CATALOGO_08-12.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//ANO 2023//CATALOGO_13-01-2024-CARNAVAL.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//ANO 2023//CATALOGO_29_11.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//ANO 2023//CATALOGO_31-01-2024-Novidades.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//ANO 2023//CATALOGO_31-08.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//ABRIL 2024//CATALOGO_12-04-2024.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//ABRIL 2024//CATALOGO_18-04-2024.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//ABRIL 2024//CATALOGO_19-04-2024.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//ABRIL 2024//CATALOGO_26-04-2024.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//ABRIL 2024//CATALOGO_27-04-2024.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//ABRIL 2024//CATALOGO_29-04-2024.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//ABRIL 2024//CATALOGO_29-04-2024_ATUALIZAÇAO.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//CATÁLOGO ATUAL - L&N DIA DAS MÃES//LUA&NEVE_DIA_DAS_MÃES_2024_PROMOÇÃO_ATUAL_14-05-24.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//CATÁLOGO ATUAL - L&N DIA DAS MÃES//LUA&NEVE_DIA_DAS_MÃES_2024_PROMOÇÃO_ATUAL_22-05-24.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//CATÁLOGO ATUAL - L&N DIA DAS MÃES//LUA&NEVE_DIA_DAS_MÃES_2024_PROMOÇÃO_VALIDADE_NOVIDADE_ATUALIZAÇÃO.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//CATÁLOGO ATUAL - L&N DIA DAS MÃES//LUA&NEVE_DIA_DAS_MÃES_2024_PROMOÇÃO_VALIDADE_NOVIDADE_ATUALIZAÇÃO_ATUAL.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//CATÁLOGO ATUAL - L&N DIA DAS MÃES//LUA&NEVE_SÃO_JOÃO_2024_PROMOÇÃO_ATUAL_27-05-24.indd",        
            "D://01-LUA&NEVE//INDD_Catalogo//CATÁLOGO ATUAL - L&N DIA DAS MÃES//CATALOGO_01-02-2024-SEM_CARNAVAL.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//CATÁLOGO ATUAL - L&N DIA DAS MÃES//CATALOGO_06-02-2024-NOVIDADES.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//CATÁLOGO ATUAL - L&N DIA DAS MÃES//CATALOGO_08-02-2024-NOVIDADES-SEXTA.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//CATÁLOGO ATUAL - L&N DIA DAS MÃES//CATALOGO_21-02-2024.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//CATÁLOGO ATUAL - L&N DIA DAS MÃES//CATALOGO_28-02-2024.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//CATÁLOGO ATUAL - L&N DIA DAS MÃES//CATALOGO_29-02-2024.indd",        
            "D://01-LUA&NEVE//INDD_Catalogo//FEVEREIRO 2024CATALOGO_02-01-2024//CATALOGO_01-02-2024-SEM_CARNAVAL.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//FEVEREIRO 2024CATALOGO_02-01-2024//CATALOGO_06-02-2024-NOVIDADES.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//FEVEREIRO 2024CATALOGO_02-01-2024//CATALOGO_08-02-2024-NOVIDADES-SEXTA.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//FEVEREIRO 2024CATALOGO_02-01-2024//CATALOGO_21-02-2024.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//FEVEREIRO 2024CATALOGO_02-01-2024//CATALOGO_28-02-2024.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//FEVEREIRO 2024CATALOGO_02-01-2024//CATALOGO_29-02-2024.indd",        
            "D://01-LUA&NEVE//INDD_Catalogo//JANEIRO 2024//CATALOGO_02-01-2024.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//JANEIRO 2024//CATALOGO_09-01-2024.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//JANEIRO 2024//CATALOGO_11-01-2024.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//JANEIRO 2024//CATALOGO_12-01-2024.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//JANEIRO 2024//CATALOGO_16-01-2024.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//JANEIRO 2024//CATALOGO_17-01-2024.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//JANEIRO 2024//CATALOGO_17-01-2024-ORGANIZAÇÃO.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//JANEIRO 2024//CATALOGO_18-01-2024.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//JANEIRO 2024//CATALOGO_19-01-2024-Novidades_Seg.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//JANEIRO 2024//CATALOGO_23-01-2024-Novidades_QUARTA.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//JANEIRO 2024//CATALOGO_23-01-2024-Novidades_QUARTA_TESTE.indd",        
            "D://01-LUA&NEVE//INDD_Catalogo//MAIO//CATALOGO_08-05-2024.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//MAIO//CATALOGO_08-05-2024_ATUAL.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//MAIO//CATALOGO_13-05-2024_ATUAL.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//MAIO//CATALOGO_15-05-2024_ATUAL.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//MARÇO 2024//CATALOGO_04-03-2024.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//MARÇO 2024//CATALOGO_08-03-2024.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//MARÇO 2024//CATALOGO_15-03-2024.indd",
            "D://01-LUA&NEVE//INDD_Catalogo//MARÇO 2024//CATALOGO_22-03-2024"            
    ];

    // Desativa temporariamente a atualização de links
    var preferenciaAtualizaLinks = app.linkingPreferences.checkLinksAtOpen;
    app.linkingPreferences.checkLinksAtOpen = false;

    // Cria um novo documento principal com dimensões específicas e sem páginas espelhadas
    var docPrincipal = app.documents.add({
        documentPreferences: {
            pageWidth: "1080px",
            pageHeight: "1920px",
            facingPages: false
        }
    });

    // Dicionário para armazenar hash de conteúdo único das páginas
    var conteudosUnicos = {};

    // Função auxiliar para gerar uma "assinatura" para cada página
    function obterHashConteudo(pagina) {
        var conteudo = pagina.textFrames.everyItem().contents.join(" ");
        return conteudo;
    }

    for (var i = 0; i < arquivos.length; i++) {
        try {
            var arquivoAtual = new File(arquivos[i]);
            if (!arquivoAtual.exists) continue;

            var docTemp = app.open(arquivoAtual);

            // Processa cada página para verificar duplicatas e adicionar ao documento final se única
            for (var j = 0; j < docTemp.pages.length; j++) {
                var pagina = docTemp.pages[j];
                var hashConteudo = obterHashConteudo(pagina);

                // Verifica duplicidade
                if (!conteudosUnicos[hashConteudo]) {
                    conteudosUnicos[hashConteudo] = true;
                    pagina.duplicate(LocationOptions.AT_END, docPrincipal.pages[-1]);
                }
            }

            docTemp.close(SaveOptions.NO); // Fecha o documento temporário

        } catch (e) {
            $.writeln("Erro ao processar o arquivo: " + arquivos[i] + "\nErro: " + e.message);
        }
    }

    // Restaura as preferências originais de atualização de links
    app.linkingPreferences.checkLinksAtOpen = preferenciaAtualizaLinks;

    // Salva o documento principal
    var caminhoSalvar = "C://Users//Li//Desktop//catalogos_antigos_unidos.indd";
    docPrincipal.save(new File(caminhoSalvar));

}, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT);

alert("Arquivos unidos e duplicatas removidas com sucesso.");
