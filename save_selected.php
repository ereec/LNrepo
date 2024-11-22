<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    if (isset($data['produtos']) && is_array($data['produtos'])) {
        $ids = implode(",", array_map('intval', $data['produtos']));

        // Conectar ao banco de dados
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "ln_catalogo";

        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die(json_encode(["success" => false, "message" => "Erro ao conectar ao banco de dados."]));
        }

        // Consultar os produtos selecionados
        $sql = "SELECT * FROM produtos WHERE id IN ($ids)";
        $result = $conn->query($sql);

        $produtosSelecionados = [];
        while ($row = $result->fetch_assoc()) {
            $produtosSelecionados[] = $row;
        }
        $conn->close();

        // Salvar em um arquivo JSON
        $jsonFile = __DIR__ . '/produtos_selecionados.json';
        if (file_put_contents($jsonFile, json_encode($produtosSelecionados, JSON_PRETTY_PRINT))) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "Erro ao salvar o arquivo JSON."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Nenhum produto selecionado."]);
    }
}
