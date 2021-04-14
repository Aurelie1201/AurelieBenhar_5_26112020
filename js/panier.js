//////////////////Affichage du panier dans la console////////////////////
for (let i=0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    console.log(key, localStorage.getItem(key));
}

let bouton = document.getElementById('button');

//////////////////Création d'une ligne d'un produit dans le panier////////////////////
const creationLignePanier = (url, nom, couleur, prix) =>{
    return '<li class="lignePanier"><div><img src="'+ url +'" alt="image ourson"/></div><div>'+ nom +'</div><div>'+ couleur +'</div><div>'+ prix +' €</div></li>'
};

//////////////////Création d'une ligne produit pour tous les produits du panier////////////////////
const creationPanier = () =>{
    let ligne = '';
    for (let i=0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let produit = JSON.parse(localStorage.getItem(key)) ;

        ligne += creationLignePanier(produit.url, produit.nom, produit.couleur, produit.prix);
    };

    return ligne;
};

document.getElementById('liste').innerHTML = creationPanier();

//////////////////Au clic sur le bouton 'vider le panier' , le panier est vidé////////////////////
bouton.addEventListener('click', () => {
    localStorage.clear();
    document.getElementById('liste').innerHTML = creationPanier();
});
