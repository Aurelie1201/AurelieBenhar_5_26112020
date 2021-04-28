//////////////////Affichage du panier dans la console////////////////////
for (let i=0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    console.log(key, localStorage.getItem(key));
}

localStorage.removeItem("commande");
let boutonVider = document.getElementById('boutonViderpanier');
let boutonValider = document.getElementById('boutonValiderCommande');
let quantite = "";
let productId = [];
let prixTotal = 0;

/////////////////////////////////////////////AFFICHAGE DU PANIER///////////////////////////////////////////////////////

/////////////////Création d'une ligne d'un produit dans le panier////////////////////
const creationLignePanier = (url, nom, couleur, quantite, prix) =>{
    return '<tr><td><img class="lignePanier-img"src="'+ url +'" alt="image ourson"/></td><td>'+ nom +'</td><td>'+ couleur +'</td><td>'+ quantite +'</td><td>'+ prix +'€ x '+ quantite +' = '+ prix * quantite +'€</td></tr>';
};

//////////////////Création d'une ligne produit pour tous les produits du panier////////////////////
const creationPanier = () =>{
    let ligne = '<tr><th  scope="col"></th><th  scope="col">Nom</th><th  scope="col">couleur</th><th  scope="col">quantité</th><th  scope="col">prix</th></tr>';
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

/////////////////////////////////////////////////FORMULAIRE////////////////////////////////////////////////////////
    
        ////Regex////
const testMail = (mail) =>{
    let regMail = new RegExp ("^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}");

    return regMail.test(mail);
};

const testMot = (mot) =>{
    let regMot = new RegExp ("^[a-zA-ZéèàçîïÉÈÎÏ '-]+$");

    return regMot.test(mot);
};

const testAdresse = (adresse) =>{
    let regAdresse = new RegExp ("^[a-zA-Z0-9éèàçîïÉÈÎÏ '-]+$");

    return regAdresse.test(adresse);
};

        /////Affichage des alertes si les entrées du formulaire ne sont pas correctes/////
const alerteValidation = (id, test) =>{
    let element = document.getElementById(id);
    let elementParent = element.parentElement;
    if(test){
        elementParent.children[2].style.display = 'block';
        elementParent.children[3].style.display = 'none';
    }else{
        elementParent.children[2].style.display = 'none';
        elementParent.children[3].style.display = 'block';
    }
}

        /////Vérification de tous les champs du formaulaire/////
const validationFormulaire = () =>{
    let mail = document.getElementById('email').value;
    let prenom = document.getElementById('prenom').value;
    let nom = document.getElementById('nom').value;
    let adresse = document.getElementById('adresse').value;
    let ville = document.getElementById('ville').value;

    alerteValidation('prenom', testMot(prenom));
    alerteValidation('nom', testMot(nom));
    alerteValidation('adresse', testAdresse(adresse));
    alerteValidation('ville', testMot(ville));
    alerteValidation('email', testMail(mail));

    if(testMot(prenom) && testMot(nom) && testAdresse(adresse) && testMot(ville) && testMail(mail)){
        return true;
    }else{
        return false;
    }
}

let formulaire = document.getElementsByTagName('form')[0];

//////////////////clic sur le bouton pour passer commande////////////////////
formulaire.addEventListener('submit', (event) =>{
    
    if(localStorage.length == 0){
        alert('Vous ne pouvez pas passer commande, votre panier est vide!');
    }else{
        if(validationFormulaire()){///////////Vérification que les données saisies soient valides
            let firstName = document.getElementById('prenom').value;
            let lastName = document.getElementById('nom').value;
            let address = document.getElementById('adresse').value;
            let city = document.getElementById('ville').value;
            let email = document.getElementById('email').value;
            let contact = {firstName : firstName, lastName : lastName, address : address, city : city, email : email};
            let commande = {contact : contact, products : productId};

            /////////Appel de l'API pour l'envoi des données///////////
            const promiseGetCommande = new Promise(function(resolve, reject){
                let requete = new XMLHttpRequest();
                requete.onreadystatechange = function(){
                    if(this.readyState == 4){
                        if(this.status == 201){
                            resolve(JSON.parse(this.response));
                        } else{
                            reject(this.status);
                        }
                    }
                }
                requete.open("POST", "http://localhost:3000/api/teddies/order");  //https://jwdp5.herokuapp.com/api/teddies/order
                requete.setRequestHeader('Content-Type', 'application/json');
                requete.send(JSON.stringify(commande));
            
            
            });

            promiseGetCommande
                .then(function (response) {
                    let confirmationCommande = {"prenom" : firstName, "nom" : lastName, "prix" : prixTotal, "idCommande" : response.orderId};
                    localStorage.setItem("commande", JSON.stringify(confirmationCommande));
                    console.log(localStorage);
                    alert('Votre commande est validée');
                    window.location = 'confirmation.html';
                })
                .catch(function (erreur) {
                    console.log(erreur);
                })

        }else{
            event.preventDefault();
        }
    }
    event.preventDefault();
});