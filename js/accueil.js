promise
    .then(function(response){

        let url;
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
            document.getElementsByClassName('col-md-6')[i].innerHTML = creationCarteProduit(url, nom, prix);
        }
    })
    
    .catch(function(erreur){
        console.log(erreur);
    });

const ajoutLigne = (element) => {
    const row = document.createElement("div");
    row.classList.add("row");
    element.appendChild(row);
}

const ajoutColonne = (element) => {
    const col = document.createElement("div");
    col.classList.add("col-md-6");
    element.appendChild(col);
}

const creationCarteProduit = (url, nom, prix) => {
    return '<figure><img alt="image ourson" src="'+ url +'"/><figcaption>'+ nom +' '+ prix +'€</figcaption></figure>';
}