window.addEventListener("load", start, false);

function start() {
  const consultarBtn = document.getElementById("consultar");
  const titulo = document.getElementById("titulo");
  const director = document.getElementById("director");
  const nacionalidad = document.getElementById("nacionalidad");
  const productora = document.getElementById("productora");
  const fecha = document.getElementById("fecha");
  const campo = document.getElementById("campo");
  const valor = document.getElementById("valor");

  consultarBtn.addEventListener(
    "click",
    () => {
      cargarCatalogo();
    },
    false
  );

  function cargarCatalogo() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        cargarXML(this);
      }
    };
    xhr.open("GET", "catalogo.xml", true);
    xhr.send();
  }

  function cargarXML(xml) {
    var docXML = xml.responseXML;
    var tabla = "<table><tr>";

    if (titulo.checked) {
      tabla += "<th>Título</th>";
    }
    if (director.checked) {
      tabla += "<th>Director</th>";
    }
    if (nacionalidad.checked) {
      tabla += "<th>Nacionalidad</th>";
    }
    if (productora.checked) {
      tabla += "<th>Productora</th>";
    }
    if (fecha.checked) {
      tabla += "<th>Fecha</th>";
    }

    tabla += "</tr>";

    var peliculas = docXML.getElementsByTagName("PELICULA");
    for (var i = 0; i < peliculas.length; i++) {
      if (
        peliculas[i].getElementsByTagName(seleccionarCampo())[0].textContent == seleccionarValor()
      ) {
        tabla += "<tr>";
        if (titulo.checked) {
          tabla +=
            "<td>" +
            peliculas[i].getElementsByTagName("TITULO")[0].textContent +
            "</td>";
        }
        if (director.checked) {
          tabla +=
            "<td>" +
            peliculas[i].getElementsByTagName("DIRECTOR")[0].textContent +
            "</td>";
        }
        if (nacionalidad.checked) {
          tabla +=
            "<td>" +
            peliculas[i].getElementsByTagName("NACIONALIDAD")[0].textContent +
            "</td>";
        }
        if (productora.checked) {
          tabla +=
            "<td>" +
            peliculas[i].getElementsByTagName("PRODUCTORA")[0].textContent;
          +"</td>";
        }
        if (fecha.checked) {
          tabla +=
            "<td>" + peliculas[i].getElementsByTagName("FECHA")[0].textContent;
          +"</td>";
        }

        tabla += "</tr>";
      }
    }
    tabla += "</table>";
    document.getElementById("resultados").innerHTML = tabla;
  }

  function seleccionarCampo() {
    for (let i = 0; i < campo.length; i++) {
      if (campo[i].selected) {
        return campo[i].value.toUpperCase();
      }
    }
  }

  function seleccionarValor() {
    return valor.value;
  }
}
