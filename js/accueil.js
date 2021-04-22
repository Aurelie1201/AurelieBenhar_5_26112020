//////////////////récupération de la promesse de la requête à l'API////////////////////
promiseGetAPI
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
            creationCarteProduit(url, nom, prix, idProduit, i);
        }
            //////////////////Ajout du nombre de produit dans le panier dans la barre de navigation////////////////////
        document.getElementById('quantitePanier').innerHTML = localStorage.length;
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
const creationCarteProduit = (url, nom, prix, idProduit, i) => {
    let aElement = document.createElement('a');
    let imgElement = document.createElement('img');
    let divCardBody = document.createElement('div');
    let divCardText = document.createElement('div');
    let divNom = document.createElement('div');
    let divPrix = document.createElement('div');

    aElement.classList.add('card', 'm-4', 'carteAccueil');
    aElement.setAttribute('href', 'produit.html?id='+idProduit);

    imgElement.setAttribute('alt', 'image ourson');
    imgElement.setAttribute('src', url);
    imgElement.classList.add('card-img-top', 'carteAccueil-img');

    divCardBody.classList.add('card-body');

    divCardText.classList.add('card-text', 'carteAccueil-ref');

    divNom.innerHTML = nom;
    divPrix.innerHTML = prix+'€';

    document.getElementsByClassName('col-md-6')[i].appendChild(aElement);
    aElement.appendChild(imgElement);
    aElement.appendChild(divCardBody);
    divCardBody.appendChild(divCardText);
    divCardText.appendChild(divNom);
    divCardText.appendChild(divPrix);
}