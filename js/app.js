const promiseGetAPI = new Promise(function(resolve, reject){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jwdp5.herokuapp.com/api/teddies", true);
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
