promise
    .then(function(response){

        let url;

        for(let i = 0; i < response.length; i++){
            if ( i%2 == 0){
            ajoutLigne(document.getElementById('container')); 
            }
        }

        for(let i = 0; i < document.getElementsByClassName('row').length; i++){
            ajoutColonne(document.getElementsByClassName('row')[i]);
            ajoutColonne(document.getElementsByClassName('row')[i]);
        }

        for(let i = 0; i < response.length; i++){
            url = response[i].imageUrl;
            document.getElementsByClassName('col-6')[i].innerHTML = '<img alt="image ourson" src="' + url +'"/>';
        }
    })
    
    .catch(function(erreur){
        console.log(erreur);
    });

const ajoutLigne = (element) => {
    const row = document.createElement("div");
    row.classList.add("row");
    element.appendChild(row);
}

const ajoutColonne = (element) => {
    const col = document.createElement("div");
    col.classList.add("col-6");
    element.appendChild(col);
}