const formatted = (valor: string) => {
  let nuevovalor = ""; 
    for(let i = valor.length; i <= 7; i++) {
      nuevovalor+= '0';   
  }
  nuevovalor+= valor;
  return nuevovalor;
}
export {formatted};