window.addEventListener("load", start, false);

function start() {
  const marca = document.getElementById("marca");
  const modelo = document.getElementById("modelo");
  const combustible = document.getElementById("combustible");
  const cilindrada = document.getElementById("cilindrada");
  const numPuertas = document.getElementById("numPuertas");
  const btnIntroducir = document.getElementById("btnIntroducir");
  const listaCampos = document.getElementById("lista_campos");
  const btnConsultar = document.getElementById("btnConsultar");
  const resultados = document.getElementById("resultados");

  listaCampos.addEventListener("change", () => {
    console.log();
    var url = `seleccionarCampos.php?atributo=${seleccionaConsulta()}`;
    var httpRequest = new XMLHttpRequest()
    var datos;
    httpRequest.open("GET", url, true);
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
        datos = JSON.parse(httpRequest.responseText);
        if (document.getElementById("listaAtributos") != null) {
          document.getElementById("listaAtributos").remove();
        }
        cargarValores(datos);
        btnConsultar.style.visibility = "visible";
      }
    };
    httpRequest.send();
  }, false);

  btnIntroducir.addEventListener("click", () => {
    var url = `insertar.php?marca=${marca.value}&modelo=${modelo.value}&combustible=${seleccionaCombustible()}&cilindrada=${cilindrada.value}&numPuertas=${numPuertas.value}`;
    var httpRequest = new XMLHttpRequest()
    httpRequest.open("GET", url, true);
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
        console.log(httpRequest.responseText);
      }
    };
    httpRequest.send();
  }, false);

  btnConsultar.addEventListener("click", () => {
    btnConsultar.style.visibility = "hidden";
    console.log(seleccionaConsulta());
    console.log(seleccionaAtributosParaConsulta());
    var url = `ejecutaConsulta.php?campo=${seleccionaConsulta()}&atributo=${seleccionaAtributosParaConsulta()}`
    var httpRequest = new XMLHttpRequest()
    httpRequest.open("GET", url, true);
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
        datos = JSON.parse(httpRequest.responseText);
        resultados.appendChild(mostrarConsulta(datos));
      }
    };
    httpRequest.send();
  }, false);

  function seleccionaCombustible() {
    for (let i = 0; i < combustible.length; i++) {
      if (combustible[i].selected) {
        return combustible[i].value;
      }
    }
  }

  function seleccionaAtributosParaConsulta() {
    const listaAtributos = document.getElementById("listaAtributos");
    console.log(listaAtributos);
    for (let i = 1; i < listaAtributos.length; i++) {
      if (listaAtributos[i].selected) {
        return listaAtributos[i].value;
      }
    }

  }

  function seleccionaConsulta() {
    for (let i = 1; i < listaCampos.length; i++) {
      if (listaCampos[i].selected) {
        return listaCampos[i].value;
      }
    }
  }

  function cargarValores(datos) {
    var select = document.createElement("select");
    select.setAttribute("id", "listaAtributos");
    select.style.display = "inline";
    const consulta = seleccionaConsulta();
    console.log(consulta);
    for (let i = 0; i < datos.length; i++) {
      var opt = document.createElement("option");
      opt.setAttribute("value", datos[i][consulta]);
      opt.innerText = datos[i][consulta];
      select.appendChild(opt);
    }
    listaCampos.insertAdjacentElement("afterend", select);
  }


  function mostrarConsulta(datos) {
    var tabla = `<table>
    <tr>
      <th>Id</th>
      <th>Marca</th>
      <th>Modelo</th>
      <th>Tipo Combustible</th>
      <th>Cilindrada</th>
      <th>Número de puertas</th>
    </tr>`;
    for (let i = 0; datos.length; i++) {
      tabla += `	<tr>
      <td>${datos[i].id}</td>
      <td>${datos[i].marca}</td>
      <td>${datos[i].modelo}</td>
      <td>${datos[i].combustible}</td>
      <td>${datos[i].cilindrada}</td>
      <td>${datos[i].numPuertas}</td>
    </tr>`
    }
    tabla += "</table>";
  }
}