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
$id = isset($_GET['id']) ? $_GET['id'] : '';
$nome_ou_codigo = isset($_GET['nome_ou_codigo']) ? $_GET['nome_ou_codigo'] : '';
$quantidade_por_box = isset($_GET['quantidade_por_box']) ? $_GET['quantidade_por_box'] : '';
$quantidade_por_caixa = isset($_GET['quantidade_por_caixa']) ? $_GET['quantidade_por_caixa'] : '';
$preco_unidade = isset($_GET['preco_unidade']) ? $_GET['preco_unidade'] : '';
$preco_box = isset($_GET['preco_box']) ? $_GET['preco_box'] : '';
$desconto = isset($_GET['desconto']) ? $_GET['desconto'] : '';
$preco_com_desconto = isset($_GET['preco_com_desconto']) ? $_GET['preco_com_desconto'] : '';

// Iniciar a parte básica da consulta SQL
$sql = "SELECT * FROM produtos WHERE 1=1";

    // Adicionar condições para os campos preenchidos
    if (!empty($nome_ou_codigo)) {
        $sql .= " AND (nome LIKE '%$nome_ou_codigo%' OR codigo LIKE '%$nome_ou_codigo%')";
    }
    if (!empty($quantidade_por_box)) {
        $sql .= " AND quantidade_por_box = $quantidade_por_box";
    }
    if (!empty($quantidade_por_caixa)) {
        $sql .= " AND quantidade_por_caixa = $quantidade_por_caixa";
    }
    if (!empty($preco_unidade)) {
        $sql .= " AND preco_unidade = $preco_unidade";
    }
    if (!empty($preco_box)) {
        $sql .= " AND preco_box = $preco_box";
    }
    if (!empty($desconto)) {
        $sql .= " AND desconto = $desconto";
    }
    if (!empty($preco_com_desconto)) {
        $sql .= " AND preco_com_desconto = $preco_com_desconto";
    }

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
                        <th>Selecionar</th>
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
                            <td><input type="checkbox" type="checkbox" id="<?= $row['id'] ?>" name="<?= $row['nome'] ?>" value="<?= $row['id'] ?>"/></td>
                            <td>
                                <a href="edit_form.php?id=<?= $row['id'] ?>" class="btn btn-warning btn-sm">Editar</a>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
            <!-- Botão para salvar os produtos selecionados -->
            <button id="saveSelected" class="btn btn-primary mt-3">Salvar Selecionados</button>
        <?php else: ?>
            <div class="alert alert-warning" role="alert">
                Nenhum produto encontrado com os parâmetros fornecidos.
            </div>
        <?php endif; ?>
    </div>

    <!-- Bootstrap JS -->
     <!-- Bootstrap JS -->
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Função para capturar os produtos selecionados e enviá-los ao servidor
        document.getElementById('saveSelected').addEventListener('click', function () {
            const selectedProducts = [];
            document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
                selectedProducts.push(checkbox.value);
            });

            if (selectedProducts.length > 0) {
                // Enviar os dados ao servidor
                fetch('save_selected.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ produtos: selectedProducts })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Produtos selecionados salvos com sucesso!');
                    } else {
                        alert('Erro ao salvar os produtos: ' + data.message);
                    }
                })
                .catch(error => console.error('Erro:', error));
            } else {
                alert('Nenhum produto selecionado.');
            }
        });
    </script>
</body>
</html>
</body>
</html>

<?php
// Fechar a conexão
$conn->close();
?>
