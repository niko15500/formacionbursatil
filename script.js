console.log("Trabajo Complementario")

let num = prompt("1 para elevar un numero, -1 para salir")

while (num >= 0) {
    let result = num * num
    num = prompt("(-1 para salir) El resultado es" + " " + result)
    if (num < 0) {
        alert("Gracias por confiar en nosotros")
        break
    }
}
