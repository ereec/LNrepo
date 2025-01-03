<?php
// Conectar ao banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ln_catalogo";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Recuperar parâmetros de busca
$nome_ou_codigo = isset($_GET['nome_ou_codigo']) ? $_GET['nome_ou_codigo'] : '';
$quantidade_por_box = isset($_GET['quantidade_por_box']) ? $_GET['quantidade_por_box'] : '';
$quantidade_por_caixa = isset($_GET['quantidade_por_caixa']) ? $_GET['quantidade_por_caixa'] : '';
$preco_unidade = isset($_GET['preco_unidade']) ? $_GET['preco_unidade'] : '';
$preco_box = isset($_GET['preco_box']) ? $_GET['preco_box'] : '';
$desconto = isset($_GET['desconto']) ? $_GET['desconto'] : '';
$preco_com_desconto = isset($_GET['preco_com_desconto']) ? $_GET['preco_com_desconto'] : '';

// Iniciar a parte básica da consulta SQL sem o "WHERE 1=1"
$sql = "SELECT * FROM produtos WHERE codigo LIKE '%$nome_ou_codigo%'";

// Adicionar condições para os campos preenchidos
if (!empty($nome_ou_codigo)) {
    $sql .= " OR (nome LIKE '%$nome_ou_codigo%";
}
if (!empty($quantidade_por_box)) {
    $sql .= " OR quantidade_por_box = $quantidade_por_box";
}
if (!empty($quantidade_por_caixa)) {
    $sql .= " OR quantidade_por_caixa = $quantidade_por_caixa";
}
if (!empty($preco_unidade)) {
    $sql .= " OR preco_unidade = $preco_unidade";
}
if (!empty($preco_box)) {
    $sql .= " OR preco_box = $preco_box";
}
if (!empty($desconto)) {
    $sql .= " OR desconto = $desconto";
}
if (!empty($preco_com_desconto)) {
    $sql .= " OR preco_com_desconto = $preco_com_desconto";
}

// Executar a consulta
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultados da Busca</title>
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h2>Resultados da Busca</h2>
        <a href="form.php" class="btn btn-secondary mb-3">Voltar para a Busca</a>

        <?php if ($result->num_rows > 0): ?>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Nome do Produto</th>
                        <th>Código</th>
                        <th>Quantidade por Box</th>
                        <th>Quantidade por Caixa</th>
                        <th>Preço Unidade</th>
                        <th>Preço Box</th>
                        <th>Unid Desconto</th>
                        <th>Box Desconto</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($row = $result->fetch_assoc()): ?>
                        <tr>
                            <td><?= $row['nome'] ?></td>
                            <td><?= $row['codigo'] ?></td>
                            <td><?= $row['quantidade_por_box'] ?></td>
                            <td><?= $row['quantidade_por_caixa'] ?></td>
                            <!-- Formatação dos preços -->
                            <td>R$ <?= number_format(floatval(str_replace(',', '.', str_replace('R$', '', $row['preco_unidade']))), 2, ',', '.') ?></td>
                            <td>R$ <?= number_format(floatval(str_replace(',', '.', str_replace('R$', '', $row['preco_box']))), 2, ',', '.') ?></td>
                            <td><?= $row['desconto'] ?></td>
                            <td>R$ <?= number_format(floatval(str_replace(',', '.', str_replace('R$', '', $row['preco_com_desconto']))), 2, ',', '.') ?></td>
                            <td>
                                <a href="edit_form.php?id=<?= $row['id'] ?>" class="btn btn-warning btn-sm">Editar</a>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        <?php else: ?>
            <div class="alert alert-warning" role="alert">
                Nenhum produto encontrado com os parâmetros fornecidos.
            </div>
        <?php endif; ?>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

<?php
// Fechar a conexão
$conn->close();
?>
