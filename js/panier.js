//////////////////Affichage du panier dans la console////////////////////
for (let i=0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    console.log(key, localStorage.getItem(key));
}

let bouton = document.getElementById('boutonViderpanier');
let quantite = "";

//////////////////Création d'une ligne d'un produit dans le panier////////////////////
const creationLignePanier = (url, nom, couleur, quantite, prix) =>{
    return '<tr><td><img class="lignePanier-img"src="'+ url +'" alt="image ourson"/></td><td>'+ nom +'</td><td>'+ couleur +'</td><td>'+ quantite +'</td><td>'+ prix +'€ x '+ quantite +' = '+ prix * quantite +'€</td></tr>';
};

//////////////////Création d'une ligne produit pour tous les produits du panier////////////////////
const creationPanier = () =>{
    let ligne = '<tr><th  scope="col"></th><th  scope="col">Nom</th><th  scope="col">couleur</th><th  scope="col">quantité</th><th  scope="col">prix</th></tr>';
    let prixTotal = 0;
    for (let i=0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let produit = JSON.parse(localStorage.getItem(key)) ;

        ligne += creationLignePanier(produit.url, produit.nom, produit.couleur, produit.quantite, produit.prix);
        prixTotal += produit.prix * produit.quantite;
    };
    ligne += '<tr><td colspan="4">Prix total de votre panier</td><td>'+ prixTotal +'€</td></tr>'
    return ligne;
};

document.getElementById('liste').innerHTML = creationPanier();


//////////////////Au clic sur le bouton 'vider le panier', le panier est vidé////////////////////
bouton.addEventListener('click', () => {
    localStorage.clear();
    document.getElementById('liste').innerHTML = creationPanier();
    document.getElementById('quantitePanier').innerHTML = localStorage.length;
    window.scroll(0, 0);    /////Retour en haut de page
});

//////////////////Ajout du nombre de produit dans le panier dans la barre de navigation////////////////////
document.getElementById('quantitePanier').innerHTML = localStorage.length;
