function getVegObjekter(vegId, objektID) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/" + objektID + "?inkluder=alle&veglenke=0.00-1.00@" + vegId);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
};

function getVeg(lat,lon) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://www.vegvesen.no/nvdb/api/v2/posisjon.json?lat=" + lat + "&lon=" + lon);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
};

function getFartsgrense(lat,lon){
    return new Promise((resolve, reject) => {
        var veg = getVeg(lat,lon);
        veg.then((successMessage) => {
            vegInfo = JSON.parse(successMessage);
            var vegObjekt = getVegObjekter(vegInfo[0].veglenke.id, 105);
            vegObjekt.then((successMessage) => {
                vegObjektInfo = JSON.parse(successMessage);
                var veglenkePosisjon = vegInfo[0].veglenke.posisjon;
                console.log(veglenkePosisjon);
                vegObjektInfo.objekter.forEach((element,id) => {
                    if(veglenkePosisjon > element.lokasjon.stedfestinger[0].fra_posisjon && veglenkePosisjon < element.lokasjon.stedfestinger[0].til_posisjon){
                        console.log(element);
                        element.egenskaper.forEach((element) => {
                            if(element.navn === "Fartsgrense"){
                                resolve(element.verdi);
                            }
                        })
                    }
                })
                reject("Fant ingen fartsgrense på din posisjon");
            }).catch((reason) => {
                reject("Kunne ikke hente vegObjekt, reason: " + reason);
            });
        }).catch((reason) => {
            reject("Kunne ikke finne veg, reason: " + reason);
        });
    })
}

document.getElementById("button").onclick = () => {
    var lat = document.getElementById("lat").value;
    var lon = document.getElementById("lon").value;
    console.log(lat + " : " + lon);

    fartsgrense = getFartsgrense(lat,lon);

    fartsgrense.then((successMessage) => {
        document.getElementById("o").innerHTML = successMessage;
    }).catch((reason) => {
        console.log(reason);
    })
}
