
const promiseGetProduct = new Promise(function(resolve, reject){
     
    let parsedUrl = new URL(window.location.href);  //////////////////Récupération de l'identifiant
    let id = parsedUrl.searchParams.get("id");      //////////////////du produit dans l'url de la page
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
        let bouton = document.getElementById('button');
        let couleurChoisie = '';

        console.log(couleurs);
        //////////////////Ajout du nom du nounours comme titre h1////////////////////
        document.getElementById('titre').innerHTML = nom;
        
        //////////////////création de la carte produit////////////////////
        document.getElementById('container').innerHTML = creationCardProduit(url, description, couleurs, prix);

        let boutonCouleur = document.getElementById('couleur');

        //////////////////Au clic du bouton, ajout du produit au panier////////////////////
        bouton.addEventListener('click', () => {
            
            let produit = {"nom" : nom, "prix" : prix, "url" : url, "couleur" : couleurChoisie};
            if (couleurChoisie == ""){
                document.getElementById('alerte').innerHTML = 'Veuillez choisir une couleur';
            }else{
                document.getElementById('alerte').innerHTML = '';
                localStorage.setItem(localStorage.length, JSON.stringify(produit));
                document.getElementById('quantitePanier').innerHTML = localStorage.length;
                console.log(localStorage);
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




const creationCardProduit = (url, description,couleurs, prix) => {
    return '<div class="card carteProduit" ><img class="card-img-top" alt="image ourson" src="'+ url +'"/><div class="card-body carteProduit-ref"><div class="card-text">'+ description +'</div><div class="card-text carteproduit-ref_colorPrix"><label for="couleur">Choisissez la couleur que vous souhaitez<br /><select name="couleur" id="couleur">'+ creationListeCouleur(couleurs) +'</select></label><div class="card-text">'+ prix +'€</div></div><div id="alerte"></div></div></div>';
}

const creationListeCouleur = (couleurs) =>{
let ligne = '<option value="">sélectionnez votre couleur</option>';;
    for(i=0 ; i < couleurs.length; i++){
        ligne += '<option value="'+ couleurs[i] +'">'+ couleurs[i] +'</option>';
    }
return ligne;
}
