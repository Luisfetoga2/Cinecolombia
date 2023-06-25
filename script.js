var total = {"mediana": 0, "grande": 0, "agua": 0, "perro": 0, "nachos": 0, "gaseosaP": 0, "gaseosaM": 0};

function restar(comida)
{
    if (total[comida] > 0) {
        total[comida] = total[comida] - 1; 
        document.getElementById(comida).innerHTML = total[comida];
    }
}

function sumar(comida)
{
    total[comida] = total[comida] + 1; 
    document.getElementById(comida).innerHTML = total[comida];
}

var precioTotal;

var precios = {"grande": 19500, "mediana": 17500, "perro": 13900, "agua": 5400, "gaseosaM": 9600, "gaseosaP": 7300, "nachos": 12500};
var combos = {"personal": 32500, "dos": 53800, "combito": 15300, "crispetas": 32500};

var combosPosibles = [];

function calcular()
{
    precioTotal = total["grande"]*precios["grande"] + total["mediana"]*precios["mediana"] + total["perro"]*precios["perro"] + total["agua"]*precios["agua"] + total["gaseosaM"]*precios["gaseosaM"] + total["gaseosaP"]*precios["gaseosaP"] + total["nachos"]*precios["nachos"];
    var total2 = {};
    Object.assign(total2, total);
    var resp = calcularCombos(total2);
    pedido = document.getElementById("pedido");
    if (pedido.getAttribute("hidden") && precioTotal > 0){
        pedido.removeAttribute("hidden");
    }
    productos = document.getElementById("productos");
    productos.innerText = resp[1]
    productos.innerText = productos.innerText + "\n\nPrecio sin combos: " + precioTotal + "\nPrecio con combos: " + resp[2] + "\nAhorro: " + (precioTotal - resp[2]);
}

function calcularCombos(comida)
{
    var seArmoCombo = true;
    var combosActuales = [];
    var combosNuevos = [[comida, "", 0, ""]];
    while (seArmoCombo)
    {
        combosActuales = combosNuevos;
        combosNuevos = [];
        seArmoCombo = false;
        for (let i = 0; i < combosActuales.length; i++) {
            var comidaActual = combosActuales[i][0];
            var textoActual = combosActuales[i][1];
            var precioActual = combosActuales[i][2];
            var textoPrecios = combosActuales[i][3];

            if (comidaActual["mediana"] >= 1 && comidaActual["perro"] + comidaActual["nachos"]>=1 && comidaActual["gaseosaP"] + comidaActual["agua"] >= 1)
            {
                seArmoCombo = true;
                // combo personal
                var comidaNueva = {};
                var textoNuevo = textoActual + "Combo personal:\n";
                Object.assign(comidaNueva, comidaActual);
                comidaNueva["mediana"] = comidaNueva["mediana"] - 1;
                textoNuevo = textoNuevo + "\t- Crispeta mediana\n";
                if (comidaNueva["perro"] >= 1) {
                    comidaNueva["perro"] = comidaNueva["perro"] - 1;
                    textoNuevo = textoNuevo + "\t- Perro caliente\n";
                } else {
                    comidaNueva["nachos"] = comidaNueva["nachos"] - 1;
                    textoNuevo = textoNuevo + "\t- Nachos\n";
                }
                if (comidaNueva["gaseosaP"] >= 1) {
                    comidaNueva["gaseosaP"] = comidaNueva["gaseosaP"] - 1;
                    textoNuevo = textoNuevo + "\t- Gaseosa pequeña\n";
                } else {
                    comidaNueva["agua"] = comidaNueva["agua"] - 1;
                    textoNuevo = textoNuevo + "\t- Agua\n";
                }
                combosNuevos.push([comidaNueva, textoNuevo+"\n", precioActual + combos["personal"], textoPrecios + combos["personal"]+"\n\n\n\n"]);
            }
            if (comidaActual["mediana"] >= 1 && comidaActual["perro"] + comidaActual["nachos"] >= 2 && comidaActual["gaseosaP"] + comidaActual["agua"] >= 2)
            {
                seArmoCombo = true;
                // combo dos
                var comidaNueva = {};
                var textoNuevo = textoActual + "Combo dos:\n";
                Object.assign(comidaNueva, comidaActual);
                comidaNueva["mediana"] = comidaNueva["mediana"] - 1;
                textoNuevo = textoNuevo + "\t- Crispeta mediana\n";
                for (let j = 0; j < 2; j++) {
                    if (comidaNueva["perro"] >= 1) {
                        comidaNueva["perro"] = comidaNueva["perro"] - 1;
                        textoNuevo = textoNuevo + "\t- Perro caliente\n";
                    } else {
                        comidaNueva["nachos"] = comidaNueva["nachos"] - 1;
                        textoNuevo = textoNuevo + "\t- Nachos\n";
                    }
                }
                for (let j = 0; j < 2; j++) {
                    if (comidaNueva["gaseosaP"] >= 1) {
                        comidaNueva["gaseosaP"] = comidaNueva["gaseosaP"] - 1;
                        textoNuevo = textoNuevo + "\t- Gaseosa pequeña\n";
                    } else {
                        comidaNueva["agua"] = comidaNueva["agua"] - 1;
                        textoNuevo = textoNuevo + "\t- Agua\n";
                    }
                }
                combosNuevos.push([comidaNueva, textoNuevo+"\n", precioActual + combos["dos"], textoPrecios + combos["dos"]+"\n\n\n\n\n\n"]);
            }
            if (comidaActual["grande"] >= 1 && comidaActual["gaseosaP"] + comidaActual["agua"] >= 2)
            {
                seArmoCombo = true;
                // combo crispetas
                var comidaNueva = {};
                var textoNuevo = textoActual + "Combo crispetas:\n";
                Object.assign(comidaNueva, comidaActual);
                comidaNueva["grande"] = comidaNueva["grande"] - 1;
                textoNuevo = textoNuevo + "\t- Crispeta grande\n";
                for (let j = 0; j < 2; j++) {
                    if (comidaNueva["gaseosaP"] >= 1) {
                        comidaNueva["gaseosaP"] = comidaNueva["gaseosaP"] - 1;
                        textoNuevo = textoNuevo + "\t- Gaseosa pequeña\n";
                    } else {
                        comidaNueva["agua"] = comidaNueva["agua"] - 1;
                        textoNuevo = textoNuevo + "\t- Agua\n";
                    }
                }
                combosNuevos.push([comidaNueva, textoNuevo+"\n", precioActual + combos["crispetas"], textoPrecios + combos["crispetas"]+"\n\n\n\n\n\n"]);
            }
            

            var comidaNueva = {};
            var precioNuevo = precioActual;
            var textoNuevo = textoActual;
            var textoPreciosNuevo = textoPrecios;
            Object.assign(comidaNueva, comidaActual);
            var nombres = {"grande": "- Crispeta grande\n", "mediana": "- Crispeta mediana\n", "perro": "- Perro caliente\n", "nachos": "- Nachos\n", "gaseosaP": "- Gaseosa pequeña\n", "gaseosaM": "- Gaseosa mediana\n", "agua": "- Agua\n"};
            var str = [];
            for (const key in comidaNueva) {
                if (comidaNueva[key] > 0) {
                    for (let j = 0; j < comidaNueva[key]; j++) {
                        str.push(nombres[key]);
                        precioNuevo = precioNuevo + precios[key];
                        textoPreciosNuevo = textoPreciosNuevo + precios[key] + "\n";
                    }
                }
                comidaNueva[key] = 0;
            }
            
            
            textoNuevo = textoNuevo + str.join("\n");
            combosNuevos.push([comidaNueva, textoNuevo, precioNuevo, textoPreciosNuevo]);
            
        }
    }
    //select the best combo (min price)
    var min = Math.pow(10, 1000);;
    var minIndex = 0;
    Object.assign(combosPosibles, combosNuevos)
    
    for (let i = 0; i < combosNuevos.length; i++) {
        if (combosNuevos[i][2] < min) {
            min = combosNuevos[i][2];
            minIndex = i;
        }
    }
    return combosNuevos[minIndex];
}