const rouge = '#EC407A'
const vert = '#9CCC65'
const bleu = '#1E88E5'

var heureDebutChrono;
var timeoutDebutChrono;

var debutTour = false;
var debutJeu = false;
var debutChrono = false;
var listeTempsReaction = []
var tour;
var fin = false;



function demarrerTour() {
    debutTour = true
    var delaiDebutJeu = 3000 + Math.random() * 2000
    timeoutDebutChrono = setTimeout(demarrerChrono, delaiDebutJeu)

    zone.style.backgroundColor = rouge
    zone_header.textContent = 'Prépares-toi ...'
    zone_texte.textContent = ''

}

function demarrerJeu() {
    tour = 4
    debutJeu = true
    div_fin_jeu.style.display = 'none'
    demarrerTour()
}

function finirJeu() {
    debutJeu = false
    var tempsMoyen = calculMoyenne()
    tour = 0

    zone_header.textContent = 'Fin de jeu!'
    zone_texte.textContent = 'Temps moyen : ' + tempsMoyen + ' ms.'
    div_fin_jeu.style.display = 'block'

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
    zone_header.textContent = 'Cliques !'
    zone_texte.textContent = ''

    heureDebutChrono = Date.now()
}


function finirTour() {
    clearTimeout(timeoutDebutChrono)

    zone.style.backgroundColor = bleu

    if (debutChrono) {
        var heureFinJeu = Date.now()
        var tempsReaction = heureFinJeu - heureDebutChrono
        listeTempsReaction.push(tempsReaction)

        zone_header.textContent = tempsReaction + ' ms'
        zone_texte.textContent = 'Cliques pour continuer.'

        tour = tour + 1
        if (tour >= 5) {
            finirJeu()
        }

    } else {
        zone_header.textContent = 'Trop tôt!'
        zone_texte.textContent = 'Cliques pour réessayer.'
    }

    debutChrono = false
    debutTour = false
}


window.onload = function () {

    var zone = document.getElementById('zone')
    var zone_header = document.getElementById('zone_header')
    var zone_texte = document.getElementById('zone_texte')
    var btn_rejouer = document.getElementById('btn_rejouer')
    var div_fin_jeu = document.getElementById('div_fin_jeu')
    var btn_retour = document.getElementById('btn_retour')


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

    div_fin_jeu.style.display = 'none'
    btn_retour.onclick = function () {
        location.href = '../index.html'
    }
    btn_rejouer.onclick = demarrerJeu()

}