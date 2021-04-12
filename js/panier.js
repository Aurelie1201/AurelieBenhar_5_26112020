
for (let i=0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    console.log(key, localStorage.getItem(key));
}

promiseGetProduct
    .then(function(response){

        let bouton = document.getElementById('button');
        
        document.getElementById('liste').innerHTML = creationPanier(response);

        bouton.addEventListener('click', () => {
            localStorage.clear();
            document.getElementById('liste').innerHTML = creationPanier(response);
        });
    })

    .catch(function(erreur){
        console.log(erreur);
    });

const creationLignePanier = (url, nom, prix) =>{
    return '<li class="lignePanier"><div><img src="'+ url +'" alt="image ourson"/></div><div>'+ nom +'</div><div>'+ prix +' €</div></li>'
}

const creationPanier = (response) =>{
    
    let ligne = '';
    for (let i=0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let prix = response[key].price/100;
        let url = response[key].imageUrl;
        let nom = response[key].name;
        ligne += creationLignePanier(url, nom, prix);
    }

    return ligne;
}