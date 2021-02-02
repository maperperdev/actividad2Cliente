<?php
$marca = $_GET["marca"];
$modelo = $_GET["modelo"];
$combustible = $_GET["combustible"];
$cilindrada = $_GET["cilindrada"];
$numPuertas = $_GET["numPuertas"];


// Configuración BASE DE DATOS MYSQL
$servidor = "localhost";
$basedatos = "ajax";
$usuario = "ajax";
$password = "dwec";

// Creamos la conexión al servidor.
$conexion = new mysqli($servidor, $usuario, $password, $basedatos);
mysqli_set_charset($conexion, "utf8"); //necesario para que codifique bien los datos de la BBDD y funcione correctamente json_encode más adelante.

if ($conexion->connect_errno) {
  echo "Fallo al conectar a MySQL: (" . $conexion->connect_errno . ") " . $conexion->connect_error;
}

// Consulta SQL para obtener los datos de los centros.
$sql = "insert into vehiculos (marca, modelo, combustible, cilindrada, numPuertas) "
      . "values ('$marca', '$modelo', '$combustible', '$cilindrada', '$numPuertas')";
$conexion->query($sql);
$conexion->close();
