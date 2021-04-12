
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
        let bouton = document.getElementById('button');

        titreProduit(nom);
        document.getElementById('container').innerHTML = creationCardProduit(url, description, prix);

        //////////////////Au clic du bouton, ajout du produit au panier////////////////////
        bouton.addEventListener('click', () => {
            
            let produit = {"nom" : nom, "prix" : prix, "url" : url};
            localStorage.setItem(localStorage.length, JSON.stringify(produit));
            console.log(localStorage);
        });
    })
    .catch(function(erreur) {
        console.log(erreur);
    });

//////////////////Ajout du nom du nounours comme titre h1////////////////////
const titreProduit = (nom) => {
    const titre = document.createElement("h1");
    document.getElementById('titre').appendChild(titre);
    titre.innerHTML = nom;
}

const creationCardProduit = (url, description, prix) => {
    return '<div class="card" ><img class="card-img-top" alt="image ourson" src="'+ url +'"/><div class="card-body"><div class="card-text">'+ description +'</div><div class="card-text">'+ prix +'€</div></div></div>';
}
