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
  btnConsultar.style.visibility = "hidden";
  const resultados = document.getElementById("resultados");

  listaCampos.addEventListener(
    "change",
    () => {
      btnConsultar.style.visibility = "visibility";
      var url = `seleccionarCampos.php?atributo=${seleccionaConsulta()}`;
      var httpRequest = new XMLHttpRequest();
      var datos;
      httpRequest.open("GET", url, true);
      httpRequest.onreadystatechange = function () {
        if (
          httpRequest.readyState === XMLHttpRequest.DONE &&
          httpRequest.status === 200
        ) {
          datos = JSON.parse(httpRequest.responseText);
          if (document.getElementById("listaAtributos") != null) {
            document.getElementById("listaAtributos").remove();
          }
          cargarValores(datos);
          btnConsultar.style.visibility = "visible";
        }
      };
      httpRequest.send();
    },
    false
  );

  btnIntroducir.addEventListener(
    "click",
    () => {
      var url = `insertar.php?marca=${marca.value}&modelo=${
        modelo.value
      }&combustible=${seleccionaCombustible()}&cilindrada=${
        cilindrada.value
      }&numPuertas=${numPuertas.value}`;
      var httpRequest = new XMLHttpRequest();
      httpRequest.open("GET", url, true);
      httpRequest.onreadystatechange = function () {
        if (
          httpRequest.readyState === XMLHttpRequest.DONE &&
          httpRequest.status === 200
        ) {
        }
      };
      httpRequest.send();
    },
    false
  );

  btnConsultar.addEventListener(
    "click",
    () => {
      btnConsultar.style.visibility = "hidden";
      var url = `ejecutaConsulta.php?campo=${seleccionaConsulta()}&atributo=${seleccionaAtributosParaConsulta()}`;
      var httpRequest = new XMLHttpRequest();
      var datos;
      httpRequest.open("GET", url, true);

      httpRequest.onreadystatechange = function () {
        if (
          httpRequest.readyState === XMLHttpRequest.DONE &&
          httpRequest.status === 200
        ) {
          datos = JSON.parse(httpRequest.responseText);
          resultados.appendChild(mostrarConsulta(datos));
          btnConsultar.style.visibility = "visible";
        }
      };
      httpRequest.send();
    },
    false
  );

  function seleccionaCombustible() {
    for (let i = 0; i < combustible.length; i++) {
      if (combustible[i].selected) {
        return combustible[i].value;
      }
    }
  }

  function seleccionaAtributosParaConsulta() {
    var listaAtributos = document.getElementById("listaAtributos");
    for (let i = 0; i < listaAtributos.length; i++) {
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
    for (let i = 0; i < datos.length; i++) {
      var opt = document.createElement("option");
      opt.setAttribute("value", datos[i][consulta]);
      opt.innerText = datos[i][consulta];
      select.appendChild(opt);
    }
    listaCampos.insertAdjacentElement("afterend", select);
  }

  function mostrarConsulta(datos) {
    if (document.getElementById("tablaGenerada") != null) {
      document.getElementById("tablaGenerada").remove();
    }
    var tabla = `<table>
    <tr>
      <th>Id</th>
      <th>Marca</th>
      <th>Modelo</th>
      <th>Tipo Combustible</th>
      <th>Cilindrada</th>
      <th>Número de puertas</th>
    </tr>`;
    for (let i = 0; i < datos.length; i++) {
      if (typeof datos[i] == "object") {
        tabla += `<tr>
        <td>${datos[i]["id"]}</td>
        <td>${datos[i]["marca"]}</td>
        <td>${datos[i]["modelo"]}</td>
        <td>${datos[i]["combustible"]}</td>
        <td>${datos[i]["cilindrada"]}</td>
        <td>${datos[i]["numPuertas"]}</td>
       </tr>`;
      }
    }
    tabla += "</table>";
    var nodeTable = document.createElement("table");
    nodeTable.setAttribute("id", "tablaGenerada");
    nodeTable.innerHTML = tabla;
    console.log(nodeTable);
    return nodeTable;
  }
}
