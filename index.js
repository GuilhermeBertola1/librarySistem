const chalk = require('chalk');
const fs = require('fs');
const { url } = require('inspector');

function extraiLinks(texto){
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  const arrayResultados = [];
  let temp;

  while((temp = regex.exec(texto)) !== null){
    arrayResultados.push({[temp[1]]: temp[2]});
  }

  return arrayResultados.length === 0 ? 'não há links' : arrayResultados;
}

function trataErro(erro){
  throw new Error(chalk.red(erro.code, 'não há arquivo no caminho'));
}

async function pegaArquivo(caminhoDoarquivo){
  const encoding = 'utf-8';
  try{
    const texto = await fs.promises.readFile(caminhoDoarquivo, encoding);
    return extraiLinks(texto);
  }catch(erro){
    trataErro(erro);
  }finally{
    console.log(chalk.yellow('operação concluída'));
  }
}

module.exports = pegaArquivo;