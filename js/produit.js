//////////////////Récupération de l'identifiant du produit dans l'url de la page/////////////////////
var parsedUrl = new URL(window.location.href);
var id = parsedUrl.searchParams.get("id");

promiseGetProduct
    .then(function(response){
        
        let idProduit = getIdProduit(response);
        let description = response[idProduit].description;
        let prix = response[idProduit].price/100;
        let url = response[idProduit].imageUrl;
        titreProduit(response, idProduit);
        document.getElementById('container').innerHTML = creationCardProduit(url, description, prix, idProduit);
    })

    .catch(function(erreur){
        console.log(erreur);
    });

const getIdProduit = (response) => {
    let i=0, produit='', idProduit = '';
    do{
        idProduit = response[i]._id;
        if(idProduit == id){
            produit = i;
        }
        i++;
    }while(id != idProduit && i < response.length);
    return produit;
}

const titreProduit = (response, idProduit) => {
    const titre = document.createElement("h1");
    document.getElementById('titre').appendChild(titre);
    titre.innerHTML = response[idProduit].name;
}

const creationCardProduit = (url, description, prix, idProduit) => {
    return '<div class="card" ><img class="card-img-top" alt="image ourson" src="'+ url +'"/><div class="card-body"><div class="card-text">'+ description +'</div><div class="card-text">'+ prix +'€</div></div></div>';
}