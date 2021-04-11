//////////////////Récupération de l'identifiant du produit dans l'url de la page/////////////////////
let parsedUrl = new URL(window.location.href);
let id = parsedUrl.searchParams.get("id");

//////////////////récupération de la promesse de la requête à l'API////////////////////
promiseGetProduct
    .then(function(response){
        
        let idProduit = getIdProduit(response);
        let description = response[idProduit].description;
        let prix = response[idProduit].price/100;
        let url = response[idProduit].imageUrl;
        let bouton = document.getElementById('button');
        // localStorage.clear();
        titreProduit(response, idProduit);
        document.getElementById('container').innerHTML = creationCardProduit(url, description, prix, idProduit);

        //////////////////Au clic du bouton, ajout du produit au panier////////////////////
        bouton.addEventListener('click', () => {
            
            localStorage.setItem(idProduit, response[idProduit].name);
        
            console.log(localStorage);
        });
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

//////////////////Ajout du nom du nounours comme titre h1////////////////////
const titreProduit = (response, idProduit) => {
    const titre = document.createElement("h1");
    document.getElementById('titre').appendChild(titre);
    titre.innerHTML = response[idProduit].name;
}

const creationCardProduit = (url, description, prix, idProduit) => {
    return '<div class="card" ><img class="card-img-top" alt="image ourson" src="'+ url +'"/><div class="card-body"><div class="card-text">'+ description +'</div><div class="card-text">'+ prix +'€</div></div></div>';
}
