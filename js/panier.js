for (let i=0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    console.log(key, localStorage.getItem(key));
}

let bouton = document.getElementById('button');

const creationLignePanier = (url, nom, prix) =>{
    return '<li class="lignePanier"><div><img src="'+ url +'" alt="image ourson"/></div><div>'+ nom +'</div><div>'+ prix +' €</div></li>'
};

const creationPanier = () =>{
    let ligne = '';
    for (let i=0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let produit = JSON.parse(localStorage.getItem(key)) ;

        ligne += creationLignePanier(produit.url, produit.nom, produit.prix);
    };

    return ligne;
};

document.getElementById('liste').innerHTML = creationPanier();

bouton.addEventListener('click', () => {
    localStorage.clear();
    document.getElementById('liste').innerHTML = creationPanier();
});

// promiseGetAPI
//     .then(function(response){

//         let bouton = document.getElementById('button');
        
//         document.getElementById('liste').innerHTML = creationPanier(response);

//         bouton.addEventListener('click', () => {
//             localStorage.clear();
//             document.getElementById('liste').innerHTML = creationPanier(response);
//         });
//     })

//     .catch(function(erreur){
//         console.log(erreur);
//     });

// const creationLignePanier = (url, nom, prix) =>{
//     return '<li class="lignePanier"><div><img src="'+ url +'" alt="image ourson"/></div><div>'+ nom +'</div><div>'+ prix +' €</div></li>'
// }

// const creationPanier = (response) =>{
    
//     let ligne = '';
//     for (let i=0; i < localStorage.length; i++){
//         let key = localStorage.key(i);
//         let prix = response[key].price/100;
//         let url = response[key].imageUrl;
//         let nom = response[key].name;
//         ligne += creationLignePanier(url, nom, prix);
//     }

//     return ligne;
// }