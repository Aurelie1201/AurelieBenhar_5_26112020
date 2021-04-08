//////////////////récupération de la promesse de la requête à l'API////////////////////
promiseGetProduct
    .then(function(response){

        let url, nom, prix, id;
            //////////////////création d'une ligne tous les 2 produits////////////////////
        for(let i = 0; i < response.length; i++){
            if ( i%2 == 0){
            ajoutLigne(document.getElementById('container')); 
            }
        }
            //////////////////création de 2 colonnes pour chaque ligne////////////////////
        for(let i = 0; i < document.getElementsByClassName('row').length; i++){
            ajoutColonne(document.getElementsByClassName('row')[i]);
            ajoutColonne(document.getElementsByClassName('row')[i]);
        }
            //////////////////création d'une fiche produit pour chaque produit////////////////////
        for(let i = 0; i < response.length; i++){
            url = response[i].imageUrl;
            nom = response[i].name;
            prix = response[i].price/100;
            idProduit = response[i]._id;
            document.getElementsByClassName('col-md-6')[i].innerHTML = creationCarteProduit(url, nom, prix, idProduit);
        }
    })
    
    .catch(function(erreur){
        console.log(erreur);
    });
//////////création d'une <div> avec une classe .row enfant de l'élément mis en paramètre//////////
const ajoutLigne = (element) => {
    const row = document.createElement("div");
    row.classList.add("row");
    element.appendChild(row);
}
//////////création d'une <div> avec une classe .col-md-6 enfant de l'élément mis en paramètre//////////
const ajoutColonne = (element) => {
    const col = document.createElement("div");
    col.classList.add("col-md-6");
    element.appendChild(col);
}
//////////écriture du html pour créer une 'card' pour un produit//////////
const creationCarteProduit = (url, nom, prix, idProduit) => {
    return '<a class="card" href="produit.html?id='+ idProduit +'"><img class="card-img-top" alt="image ourson" src="'+ url +'"/><div class="card-body">'+ nom +' '+ prix +'€</div></a>';
}