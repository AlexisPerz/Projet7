/**
 * Parse le résultat d'une requete et vérifie son statut
 * @param {HttpMessage} result Résultat d'une requete fetch
 * @returns Les données recu de la requete
 */
async function fetchData(result){
    let data = await result.json();
    if(result.status == 200 || result.status == 201){
        return data;
    }
    else if(result.status == 401){
        localStorage.removeItem("user");
        window.location.assign("login.html");
        throw new Error(data.error);
    }
    else {
        throw new Error(data.error);
    }
}