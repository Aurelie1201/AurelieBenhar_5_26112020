//https://jwdp5.herokuapp.com/api/teddies/
const promiseGetProduct = new Promise(function(resolve, reject){
    let Url = new URL(window.location.href);  //////////////////Récupération de l'identifiant
    let id = Url.searchParams.get("id");      //////////////////du produit dans l'url de la page
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/api/teddies/"+id, true);
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                resolve(JSON.parse(xhr.response)); 
            } else{
                reject(xhr.status);
            }
         }
    };
    xhr.send();
});

promiseGetProduct
    .then(function(response){
        console.log(response);
        let description = response.description;
        let prix = response.price/100;
        let url = response.imageUrl;
        let nom = response.name;
        let couleurs = response.colors;
        let parsedUrl = new URL(window.location.href);
        let id = parsedUrl.searchParams.get("id"); 
        let bouton = document.getElementById('button');
        let couleurChoisie = '';

        console.log(couleurs);
        
        //////////////////création de la carte produit////////////////////
        creationCardProduit(url, description, couleurs, nom, prix);

        let boutonCouleur = document.getElementById('couleur');
        let boutonQuantite = document.getElementById('quantite');
        
        //////////////////Récupération de la couleur choisie par l'utilisateur////////////////////
        boutonCouleur.addEventListener('change', (selection) =>{
            couleurChoisie = selection.target.value;
        });

        //////////////////Au clic du bouton, ajout du produit au panier////////////////////
        bouton.addEventListener('click', () => {

            //////////////////Récupération de la quantité choisie par l'utilisateur////////////////////
            let quantiteChoisie = boutonQuantite.value;
            let produit = {
                "nom" : nom, 
                "prix" : prix, 
                "url" : url, 
                "couleur" : couleurChoisie, 
                "quantite" : quantiteChoisie, 
                "id" : id
            };
            if (couleurChoisie == ""){
                document.getElementById('alerte').innerHTML = 'Veuillez choisir une couleur';
            }else if(quantiteChoisieVerif(quantiteChoisie) == false){
                document.getElementById('alerte').innerHTML = 'Veuillez choisir une quantité';
            }else{
                document.getElementById('alerte').innerHTML = '';
                localStorage.setItem(localStorage.length, JSON.stringify(produit));
                document.getElementById('quantitePanier').innerHTML = localStorage.length;
                console.log(localStorage);
                alert("L'ourson a bien été ajouté à votre panier");
                window.scroll(0, 0);    /////Retour en haut de page
            }

        });

        //////////////////Ajout du nombre de produit dans le panier dans la barre de navigation////////////////////
        document.getElementById('quantitePanier').innerHTML = localStorage.length;

        })

    .catch(function(erreur) {
        console.log(erreur);
    });

////Vérification que la quantité choisie soit bien un nombre////
const quantiteChoisieVerif = (quantiteChoisie) =>{
    let regNombre = new RegExp ("^[1-9]+[0-9]*");
    return regNombre.test(quantiteChoisie);
}

/////création d'une 'card' produit//////
const creationCardProduit = (url, description, couleurs, nom, prix) => {
    let carteProduitElement = document.getElementsByClassName('card')[0];
    let carteBodyElement = document.getElementsByClassName('card-body')[0];
    
    creationImageProduit(carteProduitElement, carteBodyElement, url);
    creationTitreProduit(nom);
    creationDescriptionProduit(description);
    creationOptionProduit(couleurs);
    creationPrixProduit(prix);
};

/////création d'un élément <img> en tant qu'enfant de l'élément 'elementParent'
/////mais avant l'élément 'elementSuivant'
/////avec 'url' comme valeur de l'attribut src
const creationImageProduit = (elementParent, elementSuivant, url) =>{
    let imageProduitElement = document.createElement('img');

    imageProduitElement.classList.add('card-img-top');
    imageProduitElement.setAttribute('alt', 'image ourson');
    imageProduitElement.setAttribute('src', url);

    elementParent.insertBefore(imageProduitElement, elementSuivant);
}

/////ajout du 'nom' dans l'élément d'id 'titre'/////
const creationTitreProduit = (nom) =>{
    let titreProduitElement = document.getElementById('titre');

    titreProduitElement.innerHTML = nom;
}

/////ajout de 'description' dans l'élément d'id 'description'/////
const creationDescriptionProduit = (description) =>{
    let descriptionElement = document.getElementById('description');

    descriptionElement.innerHTML = description;
}

/////Création des options de l'élément select d'id 'couleur'
/////avec les différentes couleurs du produit
const creationOptionProduit = (couleurs) =>{
    let selectElement = document.getElementById('couleur');
    let optionElement = document.createElement('option');

    optionElement.setAttribute('value', '');
    optionElement.innerHTML = 'Sélectionnez une couleur';

    selectElement.appendChild(optionElement);

    for(i=0 ; i < couleurs.length; i++){
        optionElement = document.createElement('option');
        optionElement.setAttribute('value', couleurs[i]);
        optionElement.innerHTML = couleurs[i];
        selectElement.appendChild(optionElement);
    };
}

/////ajout de 'prix' dans l'élément d'id 'prix'/////
const creationPrixProduit = (prix) =>{
    let prixElement = document.getElementById('prix');

    prixElement.innerHTML = prix + '€';
}