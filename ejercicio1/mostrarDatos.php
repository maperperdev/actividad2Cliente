<?php

$campo = $_POST["campo"];
$valor = $_POST["valor"];


$servidor = "localhost";
$basedatos = "ajax";
$usuario = "ajax";
$password = "dwec";

$conexion = new mysqli($servidor, $usuario, $password, $basedatos);
mysqli_set_charset($conexion, "utf8");

if ($conexion->connect_errno) {
	echo "Fallo al conectar a MySQL: (" . $conexion->connect_errno . ") " . $conexion->connect_error;
}
$sql = "select * from libros where $campo LIKE '$valor'";
if ($resultado = $conexion->query($sql)) {
	$datos = array();

	while ($fila = $resultado->fetch_assoc()) {
		$datos[] = $fila;
	}
}
$resultado->free();
echo json_encode($datos);
$conexion->close();
