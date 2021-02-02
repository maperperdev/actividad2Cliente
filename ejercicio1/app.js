window.addEventListener("load", start, false);

function start() {
  const tituloTxt = document.getElementById("titulo");
  const autorTxt = document.getElementById("autor");
  const editorialTxt = document.getElementById("editorial");
  const ano_publiTxt = document.getElementById("ano_publi");
  const precioTxt = document.getElementById("precio");
  const valorTxt = document.getElementById("valor");
  const insertarBtn = document.getElementById("insertar");
  const campoSeleccion = document.getElementById("campo");
  const consultarBtn = document.getElementById("consultar");
  const resultados = document.getElementById("resultados");
	const indicador = document.getElementById("indicador");
	
  insertarBtn.addEventListener(
    "click",
    () => {
      const titulo = tituloTxt.value;
      const autor = autorTxt.value;
      const editorial = editorialTxt.value;
      const ano_publi = ano_publiTxt.value;
      const precio = precioTxt.value;
      const params = `titulo=${titulo}&autor=${autor}&editorial=${editorial}&ano_publi=${ano_publi}&precio=${precio}`;

      var url = "insertarDatos.php";
      var http = new XMLHttpRequest();
      http.open("POST", url, true);
      http.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      http.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
					// indicador.innerHTML = "";
				} else {	
					// indicador.innerHTML = "<img src=\"ajax-loader.gif\" alt=\"\">";
				}
      };
      http.send(params);
    },
    false
  );

  consultarBtn.addEventListener(
    "click",
    () => {
      if (!valorTxt.value.includes("%")) {
        alert("Debe incluir un %");
        return;
      }

      var url = "mostrarDatos.php";
      var http = new XMLHttpRequest();
      http.open("POST", url, true);
      http.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );

      http.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          var datos = JSON.parse(http.responseText);
          renderHTML(datos);
        }
      };
      http.send(`campo=${campoSeleccionado()}&valor=${valorTxt.value}`);
    },
    false
  );

  function campoSeleccionado() {
    for (let i = 0; i < campoSeleccion.length; i++) {
      if (campoSeleccion[i].selected) {
        return campoSeleccion[i].value;
      }
    }
    return "titulo";
  }

  function renderHTML(datos) {
    var textoInner = "";
    for (var objeto of datos) {
      textoInner +=
				"<tr><td>" +
				objeto.id +	
        "</td><td>" +
        objeto.titulo +
        "</td><td>" +
        objeto.autor +
        "</td><td>" +
        objeto.editorial +
        "</td><td>" +
        objeto.ano_publi +
        "</td><td>" +
        objeto.precio +
        "</td></tr>";
    }
    if (textoInner.length == 0) {
      resultados.innerHTML = "No existen resultados";
    } else {
      textoInner =
        "<table border=1><tr><th>Id</th><th>Título</th><th>Autor</th><th>Editorial</th><th>Año de publicación</th><th>Precio</th></tr>" +
        textoInner;
      resultados.innerHTML = textoInner;
    }
  }
}
