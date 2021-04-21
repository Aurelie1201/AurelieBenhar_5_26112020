let commande = JSON.parse(localStorage.getItem("commande")) ;

document.getElementsByClassName('confirmation')[0].innerHTML = "Bonjour "+ commande.prenom +" "+ commande.nom + "!</br>Votre commande d'un montant de "+ commande.prix +"€ a bien été validée.</br>L'identifiant de votre commande est "+ commande.idCommande +".<br/>Merci et à bientôt!";

localStorage.clear();