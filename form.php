<!-- search_form.php -->
 
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Busca de Produtos</title>
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h2>Buscar Produtos</h2>
        <form action="search_product.php" method="GET">
            <div class="mb-3">
                <label for="nome_codigo" class="form-label">Nome ou Código</label>
                <input type="text" class="form-control" id="nome_codigo" name="nome_codigo" placeholder="Buscar por nome ou código">
            </div>
            <div class="mb-3">
                <label for="quantidade_por_box" class="form-label">Quantidade por Box</label>
                <input type="number" class="form-control" id="quantidade_por_box" name="quantidade_por_box" placeholder="Buscar por quantidade por box">
            </div>
            <div class="mb-3">
                <label for="quantidade_por_caixa" class="form-label">Quantidade por Caixa</label>
                <input type="number" class="form-control" id="quantidade_por_caixa" name="quantidade_por_caixa" placeholder="Buscar por quantidade por caixa">
            </div>
            <div class="mb-3">
                <label for="preco_unidade" class="form-label">Preço Unidade</label>
                <input type="number" class="form-control" id="preco_unidade" name="preco_unidade" placeholder="Buscar por preço unidade">
            </div>
            <div class="mb-3">
                <label for="preco_box" class="form-label">Preço Box</label>
                <input type="number" class="form-control" id="preco_box" name="preco_box" placeholder="Buscar por preço box">
            </div>
            <div class="mb-3">
                <label for="desconto" class="form-label">Desconto</label>
                <input type="number" class="form-control" id="desconto" name="desconto" placeholder="Buscar por desconto">
            </div>
            <div class="mb-3">
                <label for="preco_com_desconto" class="form-label">Preço com Desconto</label>
                <input type="number" class="form-control" id="preco_com_desconto" name="preco_com_desconto" placeholder="Buscar por preço com desconto">
            </div>
            <button type="submit" class="btn btn-primary">Buscar</button>
        </form>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
