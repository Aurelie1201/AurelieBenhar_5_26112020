
const promiseGetProduct = new Promise(function(resolve, reject){
     
    let Url = new URL(window.location.href);  //////////////////Récupération de l'identifiant
    let id = Url.searchParams.get("id");      //////////////////du produit dans l'url de la page
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jwdp5.herokuapp.com/api/teddies/"+id, true);
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                resolve(JSON.parse(xhr.response)); 
            } else{
                reject(xhr.status);
            }
         }
    }
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
        // document.getElementById('container').innerHTML = creationCardProduit(url, description, couleurs, nom, prix);
        creationCardProduit(url, description, couleurs, nom, prix);

        let boutonCouleur = document.getElementById('couleur');
        let boutonQuantite = document.getElementById('quantite');
        

        //////////////////Au clic du bouton, ajout du produit au panier////////////////////
        bouton.addEventListener('click', () => {

            //////////////////Récupération de la quantité choisie par l'utilisateur////////////////////
            let quantitehoisie = '';
            quantiteChoisie = boutonQuantite.value;
            
            let produit = {"nom" : nom, "prix" : prix, "url" : url, "couleur" : couleurChoisie, "quantite" : quantiteChoisie, "id" : id};
            if (couleurChoisie == ""){
                document.getElementById('alerte').innerHTML = 'Veuillez choisir une couleur';
            }else{
                document.getElementById('alerte').innerHTML = '';
                localStorage.setItem(localStorage.length, JSON.stringify(produit));
                document.getElementById('quantitePanier').innerHTML = localStorage.length;
                console.log(localStorage);
                alert("L'ourson a bien été ajouté à votre panier");
                window.scroll(0, 0);    /////Retour en haut de page
            }

    });

    //////////////////Récupération de la couleur choisie par l'utilisateur////////////////////
    boutonCouleur.addEventListener('change', (selection) =>{
        couleurChoisie = selection.target.value;
    });


    //////////////////Ajout du nombre de produit dans le panier dans la barre de navigation////////////////////
    document.getElementById('quantitePanier').innerHTML = localStorage.length;

    })

    .catch(function(erreur) {
        console.log(erreur);
    });

const creationCardProduit = (url, description, couleurs, nom, prix) => {
    let carteProduitElement = document.getElementsByClassName('card')[0];
    let carteBodyElement = document.getElementsByClassName('card-body')[0];
    let imageProduitElement = document.createElement('img');

    imageProduitElement.classList.add('card-img-top');
    imageProduitElement.setAttribute('alt', 'image ourson');
    imageProduitElement.setAttribute('src', url);

    carteProduitElement.insertBefore(imageProduitElement, carteBodyElement);

    let titreProduitElement = document.getElementById('titre');
    let descriptionElement = document.getElementById('description');

    titreProduitElement.innerHTML = nom;

    descriptionElement.innerHTML = description;

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

    let prixElement = document.getElementById('prix');

    prixElement.innerHTML = prix + '€';
};