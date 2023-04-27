const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

function manejaErros(erro){
    throw new Error(erro.message);
}

async function checaStatus(arrayURLs){
    try{

        const arrayDeStatus = await Promise
        .all(arrayURLs
            .map(async url => {
                const res = await fetch(url);
                return `${res.status} - ${res.statusText}`;
        }));

        return arrayDeStatus;

    } catch(erro) {
        manejaErros(erro);
    }

}

function geraArrayDeURLs(arrayDeLinks){
    return arrayDeLinks
        .map(objetoLink => Object
            .values(objetoLink).join());
}

async function validaURLs(arrayDeLinks){
    const links = geraArrayDeURLs(arrayDeLinks);
    const statusLinks = await checaStatus(links);
    const resultados = arrayDeLinks.map((objeto, indice) => ({ 
        ...objeto,
        status: statusLinks[indice]
    }));
    
    return resultados;
}

module.exports = validaURLs;
