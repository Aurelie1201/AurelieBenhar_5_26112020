//////////////////Récupération de l'identifiant du produit dans l'url de la page/////////////////////
var parsedUrl = new URL(window.location.href);
console.log(parsedUrl.searchParams.get("id"));

promiseGetProduct
    .then(function(response){
        console.log('ok');
    })

    .catch(function(erreur){
        console.log(erreur);
    });