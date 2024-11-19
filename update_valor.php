<?php
// Conexão com o banco de dados
$host = 'localhost';     // Endereço do servidor de banco de dados
$dbname = 'ln_catalogo'; // Nome do banco de dados
$username = 'root';      // Nome de usuário do banco de dados
$password = '';          // Senha do banco de dados

try {
    // Criação da conexão PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Consulta para selecionar os registros onde preco_box é 0
    $sql = "SELECT codigo, nome, preco_unidade, quantidade_por_box 
            FROM produtos 
            WHERE preco_box = '0' AND preco_unidade <> '0' AND quantidade_por_box <> 0";
    
    // Preparar e executar a consulta
    $stmt = $pdo->query($sql);

    // Iniciar uma transação para garantir integridade dos dados
    $pdo->beginTransaction();

    // Loop para atualizar os registros
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $codigo = $row['codigo'];
        $nome = $row['nome'];
        $preco_unidade = (float)str_replace(['R$', ','], ['', '.'], $row['preco_unidade']); // Remover 'R$' e ',' e converter para float
        $quantidade_por_box = $row['quantidade_por_box'];

        // Calcular o preço do box
        $preco_box = $preco_unidade * $quantidade_por_box;

        // Formatando o valor do preço box para o formato monetário
        $preco_box_formatado = 'R$' . number_format($preco_box, 2, ',', '.');

        // Atualizar o preço_box no banco de dados
        $updateSql = "UPDATE produtos 
                      SET preco_box = :preco_box 
                      WHERE codigo = :codigo";
        
        $updateStmt = $pdo->prepare($updateSql);
        $updateStmt->execute([
            ':preco_box' => $preco_box_formatado,
            ':codigo' => $codigo
        ]);

        echo "Produto $nome ($codigo) atualizado: Preço Box = $preco_box_formatado\n";
    }

    // Commit da transação
    $pdo->commit();
    echo "Atualização concluída com sucesso!";
    
} catch (PDOException $e) {
    // Em caso de erro, faz o rollback da transação
    $pdo->rollBack();
    echo "Erro: " . $e->getMessage();
}
?>
