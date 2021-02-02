
 <?php
	// header("Content-Type: application/json; charset=UTF-8");
	// header('Cache-Control: no-cache, must-revalidate');
	// header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


	$titulo = $_POST["titulo"];
	$autor = $_POST["autor"];
	$editorial = $_POST["editorial"];
	$ano_publi = $_POST["ano_publi"];
	$precio= $_POST["precio"];


	// $titulo = "holaaaa";
	// $autor = "hoalaaa";
	// $editorial = "holaaaa";
	// $ano_publi = "2";
	// $precio = "4";


	$servidor = "localhost";
	$basedatos = "ajax";
	$usuario = "ajax";
	$password = "dwec";

	$conexion = new mysqli($servidor, $usuario, $password, $basedatos);
	mysqli_set_charset($conexion, "utf8");

	if ($conexion->connect_errno) {
		echo "Fallo al conectar a MySQL: " . $conexion->connect_errno . ") " . $conexion->connect_error;
	}
	$sql = "insert into libros (titulo, autor, editorial, ano_publi, precio) values "
		. "('$titulo', '$autor', '$editorial', '$ano_publi', '$precio')";
	$conexion->query($sql);
	$conexion->close();


	// $conexion = new mysqli($servidor, $usuario, $password, $basedatos);
	// $sql = "select * from centros order by nombrecentro";
	// if ($resultado = $conexion->query($sql)) {
	// 	$datos = array();

	// 	while ($fila = $resultado->fetch_assoc()) {
	// 		$datos[] = $fila;
	// 	}
	// }
	// $resultado->free();

	// echo json_encode($datos);
	// $conexion->close();

	?>