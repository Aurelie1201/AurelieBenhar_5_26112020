//////////////////Affichage du panier dans la console////////////////////
for (let i=0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    console.log(key, localStorage.getItem(key));
}

let boutonVider = document.getElementById('boutonViderpanier');
let boutonValider = document.getElementById('boutonValiderCommande');
let quantite = "";
let productId = [];

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

        productId.push(produit.id);
        ligne += creationLignePanier(produit.url, produit.nom, produit.couleur, produit.quantite, produit.prix);
        prixTotal += produit.prix * produit.quantite;
    };
    ligne += '<tr><td colspan="4">Prix total de votre panier</td><td>'+ prixTotal +'€</td></tr>'
    return ligne;
};

document.getElementById('liste').innerHTML = creationPanier();

//////////////////Ajout du nombre de produit dans le panier dans la barre de navigation////////////////////
document.getElementById('quantitePanier').innerHTML = localStorage.length;

//////////////////Au clic sur le bouton 'vider le panier', le panier est vidé////////////////////
boutonVider.addEventListener('click', () => {
    localStorage.clear();
    document.getElementById('liste').innerHTML = creationPanier();
    document.getElementById('quantitePanier').innerHTML = localStorage.length;
    window.scroll(0, 0);    /////Retour en haut de page
});

let formulaire = document.getElementsByTagName('form')[0];

//////// ajout de la classe "was-validated" au formulaire pour la vérification des valeurs saisies au clique du bouton pour passer commande//////
boutonValider.addEventListener('click', () => {
    formulaire.classList.add('was-validated');
    console.log(formulaire.classList);
})

//////////////////clic sur le bouton pour passer commande////////////////////
formulaire.addEventListener('submit', (event) =>{
    
    ///////////Vérificaction que les données saisies soient valides////////
    if(formulaire.checkValidity()){
        let firstName = document.getElementById('prenom').value;
        let lastName = document.getElementById('nom').value;
        let address = document.getElementById('adresse').value;
        let city = document.getElementById('ville').value;
        let email = document.getElementById('email').value;
        let contact = {firstName : firstName, lastName : lastName, address : address, city : city, email : email};
        let commande = {contact : contact, products : productId};

        ///////////Appel de l'API pour l'envoi des données///////////
        let requete = new XMLHttpRequest();
        requete.onreadystatechange = function(){
            if(this.readyState == 4){
                if(this.status == 201){
                    console.log(this.response); 
                } else{
                    alert(this.status);
                }
            }
        }
        requete.open("POST", "https://jwdp5.herokuapp.com/api/teddies/order");
        requete.setRequestHeader('Content-Type', 'application/json');
        requete.send(JSON.stringify(commande));
    };
    
    event.preventDefault();
    
});


// const promiseGetAPI = new Promise(function(resolve, reject){
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", "https://jwdp5.herokuapp.com/api/teddies", true);
//     xhr.onreadystatechange = function(){
//         if(this.readyState == 4){
//             if(this.status == 200){
//                 resolve(JSON.parse(xhr.response)); 
//             } else{
//                 reject(xhr.status);
//             }
//          }
//     }
//     xhr.send();
// });