function processData() {


salida_total = "";
var output = document.getElementById('salida');
var input = document.getElementById('texto').value;
    var lineas = input.split('\n');
	if(lineas.length == 0){
		console.log("entrada sin contenido");
		return false;
	}
    var t = Number(lineas[0]);
    var i =0;
	if(validacionRestriccion("T",t))return;	
    for(var j = 0;j<t;j++){
        i++;
		if(validacionRestriccion("TEST CASE",lineas[i])) return;

        var casos = lineas[i].split(" ");
        var N = Number(casos[0]);
		if(validacionRestriccion("N",N)) return;
        var M = Number(casos[1]);
		if(validacionRestriccion("M",M)) return;
        var dims = {};
        for(var k = 0;k<M;k++){
            i++;
            var con = lineas[i];

            dims = leeAccion(con,dims);
			if(!dims)return;
        }
        
    }
	output.innerHTML = (salida_total == "")?"verifique la entrada":salida_total; 

} 
function validacionRestriccion(pos,valor){
	
	var error = false;
	var mensaje = "";
	console.log("ingreso a validacion:"+pos+":"+valor);
	switch(pos){
		case "TEST CASE":if(valor == NaN || valor == "" || valor == undefined){
			mensaje = "";
			error = true;
		}
		break;
		case "T":if(valor == NaN || valor < 1 || valor > 50  || valor == undefined){
			mensaje = "Debe estar entre 1 y 50";
			
			error = true;
		}else{
			objT = valor;
		}
		
		break;
		case "N":if(valor == NaN || valor < 1 || valor > 100  || valor == undefined){
			mensaje = "Debe estar entre 1 y 100";	
			error = true;		
		}else{
			objN = valor;
		}
		break;
		case "M":if(valor == NaN || valor < 1 || valor > 1000  || valor == undefined){
			mensaje = "Debe estar entre 1 y 1000";	
			error = true;
		}else{
			objM = valor;
		}
		break;
		case "X":
		case "Y":
		case "Z":
		if(valor == NaN || valor < 1 || valor > objN  || valor == undefined){
			mensaje = "Debe estar entre 1 y "+objN;	
			error = true;
		}
		break;
		case "W":
		var min = Math.pow(10,9)*-1;
		var max = Math.pow(10,9);

		if(valor == NaN || valor < min || valor > max  || valor == undefined){
			mensaje = "Debe estar entre -10 elevado a la 9 y 10 elevado a la 9";	
			error = true;
		}else{
			objM = valor;
		}
		break;
		case "QUERY":
		valor[1];
		valor[2];
		if(valor[1] < 1 || valor[1] > valor[2] || valor[2] > objN){
			mensaje = "Verifique la entrada en el QUERY";
			error = true;
		}
		
		
	}
	if(error)alert("Validación de "+pos+" invalida."+mensaje);
	return error;
}
function leeAccion(texto,matriz){
    var accion = texto.split(" ");
    if(accion[0] == "UPDATE"){

        var x = Number(accion[1]);
			if(validacionRestriccion("X",x))return false;	

        var y = Number(accion[2]);
			if(validacionRestriccion("Y",y))return false;	

        var z = Number(accion[3]);
			if(validacionRestriccion("Z",z))return false;	

        var valor = Number(accion[4]);
			if(validacionRestriccion("W",valor))return false;	

        var pos = ""+x+","+y+","+z;
        matriz[pos] = valor;
    }else if(accion[0] == "QUERY"){//QUERY
		
        var x1 = Number(accion[1]);
        var y1 = Number(accion[2]);
        var z1 = Number(accion[3]);
        var x2 = Number(accion[4]);
					if(validacionRestriccion("QUERY",{1:x1,2:x2}))return false;	

        var y2 = Number(accion[5]);
					if(validacionRestriccion("QUERY",{1:y1,2:y2}))return false;	

        var z2 = Number(accion[6]);
					if(validacionRestriccion("QUERY",{1:z1,2:z2}))return false;	

        var suma = 0;
        var keys1 = Object.keys(matriz);
        for(var mm = 0;mm<keys1.length;mm++){
            var pos = keys1[mm].split(",");
            var posx = Number(pos[0]);
            var posy = Number(pos[1]);
            var posz = Number(pos[2]);
            if((x1 <= posx && x2>= posx) && (y1 <= posy && y2>= posy) && (z1 <= posz && z2>= posz)){
                    var pos = ""+posx+","+posy+","+posz;
                    suma += matriz[pos];   
            }
        }
       salida_total += suma+"<br>";	
        
    }else{
		alert("Error en operacion ingresada.");
		return false;
	}
    return matriz;

}