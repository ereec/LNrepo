<?php
// Credenciais de conexão com o banco de dados no XAMPP
$host = 'localhost';     // Endereço do servidor de banco de dados
$dbname = 'ln_catalogo'; // Nome do banco de dados
$username = 'root';      // Usuário do banco de dados (padrão no XAMPP)
$password = '';          // Senha (padrão no XAMPP é em branco)

try {
    // Criação da conexão PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consulta para selecionar os registros
    $sql = "SELECT codigo, nome, preco_unidade, quantidade_por_box 
            FROM produtos";

    // Preparar e executar a consulta
    $stmt = $pdo->query($sql);

    // Verifica se há registros
    if ($stmt->rowCount() == 0) {
        echo "Nenhum produto encontrado.";
        exit;
    }

    // Loop para processar os registros
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $codigo = $row['codigo'];
        $nome = $row['nome'];
        
        // Remove 'R$' e outras possíveis formatações (pontos)
        $preco_unidade_raw = str_replace(['R$', '.'], ['', ''], $row['preco_unidade']);
        $preco_unidade = (float)$preco_unidade_raw;
        $quantidade_por_box = $row['quantidade_por_box'];

        // Exibe o valor de preco_unidade antes de qualquer verificação
        echo "<strong>Produto: $nome ($codigo)</strong><br>";
        echo "Preço Unidade (Raw): $preco_unidade_raw<br>";
        echo "Preço Unidade (Float): $preco_unidade<br>";
        echo "Quantidade por Box: $quantidade_por_box<br>";

        // Verifica a quantidade de caracteres antes do ponto
        $preco_unidade_str = (string)$preco_unidade_raw;
        $pos_ponto = strpos($preco_unidade_str, '.');
        $antes_ponto = $pos_ponto !== false ? substr($preco_unidade_str, 0, $pos_ponto) : '';

        // Exibe o número de caracteres antes do ponto
        echo "Antes do ponto: " . strlen($antes_ponto) . " caracteres<br>";
        echo "Preço Unitário (antes do ponto): $antes_ponto<br>";

        // Se houver 3 caracteres antes do ponto
        if (strlen($antes_ponto) == 3) {
            // Verifica se quantidade_por_box é diferente de zero para evitar divisão por zero
            if ($quantidade_por_box != 0) {
                // Divide o valor de preco_unidade pela quantidade por box
                $novo_preco_unidade = $preco_unidade / $quantidade_por_box;

                // Salva o valor original de preco_unidade para inserir em preco_box
                $preco_box = $preco_unidade;

                // Formata os valores para o formato monetário com ponto
                $novo_preco_unidade_formatado = 'R$' . number_format($novo_preco_unidade, 2, '.', ',');
                $preco_box_formatado = 'R$' . number_format($preco_box, 2, '.', ',');

                // Exibe os resultados apenas para os que atendem à condição
                echo "Novo Preço Unidade (Calculado): $novo_preco_unidade_formatado<br>";
                echo "Preço Box (Original): $preco_box_formatado<br><br>";
            } else {
                echo "Produto $nome ($codigo) tem quantidade por box igual a 0, não foi possível calcular.<br><br>";
            }
        } else {
            echo "Produto $nome ($codigo) NÃO tem 3 caracteres antes do ponto.<br><br>";
        }
    }

    echo "Processamento concluído com sucesso!";
    
} catch (PDOException $e) {
    // Em caso de erro
    echo "Erro: " . $e->getMessage();
}
?>
