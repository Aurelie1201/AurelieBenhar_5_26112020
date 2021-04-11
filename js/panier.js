// let produit = localStorage.getItem('0');
// console.log(localStorage);
// document.getElementById('container').innerHTML = produit;

for (let i=0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    console.log(key, localStorage.getItem(key));
}

promiseGetProduct
    .then(function(response){

        let ligne = '';
        let bouton = document.getElementById('button');
        
        for (let i=0; i < localStorage.length; i++){
            let key = localStorage.key(i);
            let prix = response[key].price/100;
            let url = response[key].imageUrl;
            let nom = response[key].name;
            ligne += creationLignePanier(url, nom, prix);
        }

        document.getElementById('liste').innerHTML = ligne;

        bouton.addEventListener('click', () => {
            
            localStorage.clear();
        });
    })

    .catch(function(erreur){
        console.log(erreur);
    });

const creationLignePanier = (url, nom, prix) =>{
    return '<li class="lignePanier"><div><img src="'+ url +'" alt="image ourson"/></div><div>'+ nom +'</div><div>'+ prix +' €</div></li>'
}