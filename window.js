const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const tableify = require("tableify");
var COM;
//correções precisam ser feitas

SerialPort.list().then((ports) => {
  ports.forEach(function (porta) {
    document.getElementById("ports").innerText = porta.path;
  });
});

//SerialPort.list().then((ports, err) => {
// tableHTML = tableify(ports);
// document.getElementById("ports").innerHTML = tableHTML;
// console.log(
//   "ports",
//   document.getElementById("ports").innerText.search("COM" + 4)
//  );
// console.log("ports", document.getElementById("ports").innerHTML);
//});

port = new SerialPort("COM4", {
  baudRate: 115200,
});

port.on("data", function (data) {
  document.getElementById("output").value = data;
  console.log(document.getElementById("ports").innerHTML[3]);
});

var valores = [];

function tempColor(x) {
  if (x < 20) {
    return "#003AFF";
  } else if (x >= 20 && x < 21) {
    return "#1B70FB";
  } else if (x >= 21 && x < 22) {
    return "#07E9FC";
  } else if (x >= 22 && x < 23) {
    return "#07E9FC";
  } else if (x >= 23 && x < 24) {
    return "#07FCB5";
  } else if (x >= 24 && x < 25) {
    return "#07FC82";
  } else if (x >= 25 && x < 26) {
    return "#07FC4E";
  } else if (x >= 26 && x < 27) {
    return "#07FC34";
  } else if (x >= 27 && x < 28) {
    return "#07FC12";
  } else if (x >= 28 && x < 29) {
    return "#21FC07";
  } else if (x >= 29 && x < 30) {
    return "#B9FC07";
  } else if (x >= 30 && x < 31) {
    return "#F1FC07";
  } else if (x >= 31 && x < 32) {
    return "#FCD707";
  } else if (x >= 32 && x < 33) {
    return "#FCBD07";
  } else if (x >= 33 && x < 34) {
    return "#FC9407";
  } else if (x >= 34 && x < 35) {
    return "#FC7307";
  } else if (x >= 35 && x < 36) {
    return "#FC5107";
  } else if (x >= 36 && x < 37) {
    return "#FC4607";
  } else if (x >= 37 && x < 38) {
    return "#FC3007";
  } else if (x >= 38 && x < 39) {
    return "#FC1D07";
  } else if (x >= 39 && x < 40) {
    return "#FC0707";
  }
}

var aux;
var state;
var j;
var TAM = 0;
var str;
var res;
function getTemp() {
  TAM =
    document.getElementById("xtext").value *
    document.getElementById("ytext").value;

  if (TAM > 0) {
    str = "repeat(16, 40px)";
    res = str.replace("16", document.getElementById("xtext").value);
    document.getElementById("tabela").style.gridTemplateColumns = res;

    str = "repeat(4, 40px)";
    res = str.replace("4", document.getElementById("ytext").value);
    document.getElementById("tabela").style.gridTemplateRows = res;

    aux = 0;
    state = -1;
    for (var k = 0; k < 1000; k++) {
      //como achar esse numero? 1000?
      //console.log("data: ", document.getElementById("output").value[k]);
      if (document.getElementById("output").value[k].indexOf("\n") < 0) {
        j = k;
        while (document.getElementById("output").value[j].indexOf(" ") < 0) {
          //contabiliza a quantidade de caracteres em sequência até o prox espaço
          state = state + 1;
          j = j + 1;
        }
        valores[aux] = 0;
        while (document.getElementById("output").value[k].indexOf(" ") < 0) {
          //calcula o valor numérico da sequência
          valores[aux] =
            valores[aux] +
            parseInt(document.getElementById("output").value[k]) *
              Math.pow(10, state);
          state = state - 1;
          k = k + 1;
        }

        state = -1;
        aux = aux + 1; //próximo numero
      } else if (aux == TAM) break;
    }
    console.log("valores: ", valores);
    aux = 0;
    for (var i = 1; i < TAM + 1; i++) {
      document.getElementById("sqr" + i).style.backgroundColor = tempColor(
        valores[aux]
      );
      if (document.querySelector("#check:checked") !== null) {
        document.getElementById("sqr" + i).innerText = valores[aux];
      } else document.getElementById("sqr" + i).innerText = null;

      aux = aux + 1;
    }
  }
}

setInterval(getTemp, 50);
