const rouge = '#EC407A'
const vert = '#9CCC65'
const bleu = '#1E88E5'

var heureDebutChrono;
var timeoutDebutChrono;

var debutTour = false;
var debutJeu = false;
var debutChrono = false;

var tour = 1;
var listeTempsReaction = [];

function demarrerTour() {
    debutTour = true
    var delaiDebutJeu = 3000 + Math.random() * 2000
    timeoutDebutChrono = setTimeout(demarrerChrono, delaiDebutJeu)

    zone.style.backgroundColor = rouge
    zone_header.textContent = "Prépares-toi ..."
    zone_texte.textContent = ""
}

function demarrerJeu() {
    debutJeu = true
    demarrerTour()
}

function finirJeu() {
    debutJeu = false
    var tempsMoyen = calculMoyenne()
    tour = 0

    zone_header.textContent = "Fin de jeu !"
    zone_texte.textContent = "Temps moyen : " + tempsMoyen + " ms."
}

// Calcul moyenne du temps de réaction
function calculMoyenne() {

    var tempsTotal = 0
    listeTempsReaction.forEach(function (temps) {
        tempsTotal = tempsTotal + temps
    })

    return tempsTotal / listeTempsReaction.length
}

function demarrerChrono() {

    debutChrono = true

    zone.style.backgroundColor = vert
    zone_header.textContent = "Clique !"
    zone_texte.textContent = ""

    heureDebutChrono = Date.now()
}


function finirTour() {
    clearTimeout(timeoutDebutChrono)

    zone.style.backgroundColor = bleu

    if (debutChrono) {
        var heureFinJeu = Date.now()
        var tempsReaction = heureFinJeu - heureDebutChrono
        listeTempsReaction.push(tempsReaction)

        zone_header.textContent = tempsReaction + " ms."
        zone_texte.textContent = "Fin du tour. Cliques pour rejouer"

        tour = tour + 1
        if (tour > 5) {
            finirJeu()
        }

    } else {
        zone_header.textContent = "Trop tôt !"
        zone_texte.textContent = ""
    }

    debutChrono = false
    debutTour = false
}

window.onload = function () {

    var zone = document.getElementById('zone')
    var zone_header = document.getElementById('zone_header')
    var zone_texte = document.getElementById('zone_texte')

    // On utilise une fonction anonyme car elle n'a pas besoin d'être réutilisée
    zone.onclick = function () {

        if (!debutJeu)
            demarrerJeu()

        else if (!debutTour) {
            demarrerTour()
        } else {
            finirTour()
        }
    }

}