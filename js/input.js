var count = 0;
var oldStr = "";
$(document).ready(function() {
  for (var i = 0; i < 6; i++) {
    var line = "<tr>";
    for (var p = 0; p < 9; p++) {
      line += "<td style='width:62px;'><input id='" + p.toString() + count.toString() + "' style='width:60px;' /></td>";
    }
    line += "</tr>";
    $("#inputTable").html($("#inputTable").html() + line);
    count++;
  }
});

setInterval(function() {
  if($("#toBeParsed").val() !== oldStr) {
    oldStr = $("#toBeParsed").val();
    parseAndCreate($("#toBeParsed").val());
  }
}, 100);
function normalize() {
  for(var i = 0; i < 9; i++) {
    var value = 0;
    var div = 0;
    for(var t = 0; t < 6; t++) {
      if($("#" + i.toString() + t.toString()).val() !== "") {
        div++;
        value += Number($("#" + i.toString() + t.toString()).val());
      }
    }
    if(div !== 0) {
      value = value / div / 10;
    } else {
      value = null;
    }
    if(i < 4) {
      if(!$("#homeAdv").is(":checked")) {
        value -= 0.03;
      }
    }
    if(value !== null) {
      KPNN.layers[0].neurons[i].value = value;
      values[0][i] = value;
    }
  }
}
function parseAndCreate(str) {
  const json = JSON.parse(str);
  for(var i = 0; i < json.home.length; i++) {
    for(var t = 0; t < json.home[i].length; t++) {
      $("#" + i.toString() + t.toString()).val(json.home[i][t]);
    }
  }
  for(var i2 = 0; i2 < json.away.length; i2++) {
    for(var t2 = 0; t2 < json.away[i2].length; t2++) {
      $("#" + (i2 + 4).toString() + t2.toString()).val(json.away[i2][t2]);
    }
  }
  normalize();
  KPNN.reset(values);
  KPNN.run();
  calcProbs();
}
function calcProbs() {
  const H = KPNN.layers[KPNN.layers.length - 1].neurons[0].value;
  const D = KPNN.layers[KPNN.layers.length - 1].neurons[1].value;
  const A = KPNN.layers[KPNN.layers.length - 1].neurons[2].value;
  const peruH = H / (H + D + A);
  const peruD = D / (H + D + A);
  const peruA = A / (H + D + A);
  const certH = peruH - Math.abs(D - A) / 2;
  const certD = peruD - Math.abs(H - A) / 2;
  const certA = peruA - Math.abs(D - H) / 2;
  $("#hPr").val(certH.toFixed(3));
  $("#dPr").val(certD.toFixed(3));
  $("#aPr").val(certA.toFixed(3));
}
function keyPressed() {
  if(keyCode === 32) {
    KPNN.reset(values);
    KPNN.run();
    calcProbs();
  }
  if(keyCode === 84) {
    normalize();
  }
}