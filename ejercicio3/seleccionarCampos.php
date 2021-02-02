<?php
$atributo = $_GET["atributo"];


// Configuración BASE DE DATOS MYSQL
$servidor = "localhost";
$basedatos = "ajax";
$usuario = "ajax";
$password = "dwec";

// Creamos la conexión al servidor.
$conexion = new mysqli($servidor, $usuario, $password, $basedatos);
mysqli_set_charset($conexion, "utf8");

if ($conexion->connect_error) {
  die("Error en la conexion: " + $conexion->connect_error);
} else {

  $sql = "select distinct $atributo from vehiculos";
  if ($resultado = $conexion->query($sql)) {
    $datos = array();

    while ($fila = $resultado->fetch_assoc()) {
      // Almacenamos en un array  cada una de las filas que vamos leyendo del recordset.
      $datos[] = $fila;
    }
  }
  /* liberar el conjunto de resultados */
  $resultado->free();

  echo json_encode($datos);
}
/* cerrar la conexión */
$conexion->close();
