<?php
// Conectar ao banco de dados (ajuste com suas credenciais)
$servername = "localhost";
$username = "root";  // Usuário padrão do XAMPP
$password = "";      // Senha padrão do XAMPP
$dbname = "ln_catalogo"; // Nome do banco de dados

// Criando a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificando a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

$product_code = '';
$product_data = [];

if (isset($_POST['search'])) {
    // Buscando o produto pelo código
    $product_code = $_POST['codigo'];
    $sql = "SELECT * FROM produtos WHERE codigo = '$product_code'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Armazenando os dados do produto
        $product_data = $result->fetch_assoc();
    } else {
        echo "Produto não encontrado!";
    }
}

if (isset($_POST['update'])) {
    // Atualizando os dados do produto
    $codigo = $_POST['codigo'];
    $nome = $_POST['nome'];
    $quantidade_box = $_POST['quantidade_box'];
    $quantidade_caixa = $_POST['quantidade_caixa'];
    $preco_unidade = $_POST['preco_unidade'];
    $preco_box = $_POST['preco_box'];
    $desconto = $_POST['desconto'];
    $preco_com_desconto = $_POST['preco_com_desconto'];

    $sql_update = "UPDATE produtos SET 
        nome = '$nome',
        quantidade_por_box = '$quantidade_box',
        quantidade_por_caixa = '$quantidade_caixa',
        preco_unidade = '$preco_unidade',
        preco_box = '$preco_box',
        desconto = '$desconto',
        preco_com_desconto = '$preco_com_desconto'
        WHERE codigo = '$codigo'";

    if ($conn->query($sql_update) === TRUE) {
        echo "Produto atualizado com sucesso!";
        // Redirecionar de volta para a página de busca
        header("Location: search_results.php");
        exit;
    } else {
        echo "Erro ao atualizar o produto: " . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Atualizar Produto</title>
    <!-- Incluindo o Bootstrap -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<div class="container mt-5">
    <h1 class="text-center">Atualizar Produto</h1>

    <!-- Formulário de busca -->
    <form method="POST" class="mb-4">
        <div class="form-group">
            <label for="codigo">Código do Produto:</label>
            <input type="text" class="form-control" name="codigo" id="codigo" value="<?= htmlspecialchars($product_code) ?>" required>
        </div>
        <button type="submit" class="btn btn-primary" name="search">Buscar</button>
    </form>

    <?php if (!empty($product_data)): ?>
        <!-- Formulário de atualização -->
        <form method="POST">
            <input type="hidden" name="codigo" value="<?= htmlspecialchars($product_code) ?>">

            <div class="form-group">
                <label for="nome">Nome do Produto:</label>
                <input type="text" class="form-control" name="nome" id="nome" value="<?= htmlspecialchars($product_data['nome']) ?>" required>
            </div>

            <div class="form-group">
                <label for="quantidade_box">Quantidade por Box:</label>
                <input type="number" class="form-control" name="quantidade_box" id="quantidade_box" value="<?= htmlspecialchars($product_data['quantidade_por_box']) ?>" required>
            </div>

            <div class="form-group">
                <label for="quantidade_caixa">Quantidade por Caixa:</label>
                <input type="number" class="form-control" name="quantidade_caixa" id="quantidade_caixa" value="<?= htmlspecialchars($product_data['quantidade_por_caixa']) ?>" required>
            </div>

            <div class="form-group">
                <label for="preco_unidade">Preço por Unidade (R$):</label>
                <input type="text" class="form-control" name="preco_unidade" id="preco_unidade" value="<?= htmlspecialchars($product_data['preco_unidade']) ?>" required>
            </div>

            <div class="form-group">
                <label for="preco_box">Preço por Box (R$):</label>
                <input type="text" class="form-control" name="preco_box" id="preco_box" value="<?= htmlspecialchars($product_data['preco_box']) ?>" required>
            </div>

            <div class="form-group">
                <label for="desconto">Unid Desconto (R$):</label>
                <input type="text" class="form-control" name="desconto" id="desconto" value="<?= htmlspecialchars($product_data['desconto']) ?>" required>
            </div>

            <div class="form-group">
                <label for="preco_com_desconto">Box Desconto (R$):</label>
                <input type="text" class="form-control" name="preco_com_desconto" id="preco_com_desconto" value="<?= htmlspecialchars($product_data['preco_com_desconto']) ?>" required>
            </div>

            <button type="submit" class="btn btn-success" name="update">Atualizar Produto</button>
        </form>
    <?php endif; ?>
</div>

<!-- Incluindo o script do Bootstrap -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>

<?php
// Fechar a conexão
$conn->close();
?>
