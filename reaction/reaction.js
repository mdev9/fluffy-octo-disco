const rouge = '#EC407A'
const vert = '#9CCC65'
const bleu = '#1E88E5'

var tempsDebutReaction;
var timeoutDebutChrono;
var tour;

var listeTempsReaction = []



window.onload = function () {

    var zone = document.getElementById('zone')
    var zone_header = document.getElementById('zone_header')
    var zone_texte = document.getElementById('zone_texte')
    var btn_rejouer = document.getElementById('btn_rejouer')
    var div_fin_jeu = document.getElementById('div_fin_jeu')
    var btn_retour = document.getElementById('btn_retour')


    // On utilise une fonction anonyme car elle n'a pas besoin d'être réutilisée
    zone.onclick = function () {

        switch (page) {
            case 'accueil':
                pageAttenteSignal()
                break;
            case 'attente-signal':
                pageCliqueTropTot()
                break;
            case 'cliques-maintenant':
                pageTempsReaction()
                break;
            case 'clique-trop-tot':
                pageAttenteSignal()
                break;
            case 'temps-reaction':
                if (tour < 5) {
                    pageAttenteSignal()
                } else {
                    pageFinJeu()
                }
                break;
            case 'fin-jeu':
                pageAccueil()
                break;
        }
    }

    btn_retour.onclick = function () {
        location.href = '../index.html'
    }
    btn_rejouer.onclick = function () {
        pageAccueil()
    }

    pageAccueil();
}


function pageAccueil() {
    page = 'accueil'

    div_fin_jeu.style.display = 'none'
    zone_texte.style.display = 'block'
    zone.style.backgroundColor = bleu

    zone_header.textContent = `Teste ton temps de réaction`
    zone_texte.innerHTML = `Quand la boîte rouge devient verte, cliques le plus rapidement possible.
    <br>Cliques n'importe où pour commencer.`

    demarrerJeu()
}

function pageAttenteSignal() {
    page = 'attente-signal'
    zone.style.backgroundColor = rouge
    zone_texte.textContent = ''
    zone_header.textContent = 'Tiens-toi prêt ...'

    demarrerTour()
}

function pageCliquesMaintenant() {
    page = 'cliques-maintenant'

    zone.style.backgroundColor = vert
    zone_header.textContent = 'Clique !'
    zone_texte.textContent = ''

    tempsDebutReaction = Date.now()
}

// Le joueur clique trop tôt
function pageCliqueTropTot() {
    page = 'clique-trop-tot'

    zone.style.backgroundColor = bleu
    zone_header.textContent = 'Trop tôt!'
    zone_texte.textContent = 'Clique pour réessayer.'

    clearTimeout(timeoutDebutChrono)
}

function pageTempsReaction() {
    page = 'temps-reaction'

    var tempsFinReaction = Date.now()
    tempsReaction = tempsFinReaction - tempsDebutReaction

    zone.style.backgroundColor = bleu
    zone_header.textContent = tempsReaction + ' ms'
    zone_texte.textContent = 'Clique pour continuer.'

    clearTimeout(timeoutDebutChrono)
    finTour(tempsReaction)
}

function pageFinJeu() {
    page = 'fin-jeu'
    var tempsMoyen = calculTempsReactionMoyen()

    div_fin_jeu.style.display = 'block'
    zone_header.textContent = 'Fin de jeu!'
    zone_texte.textContent = 'Temps moyen : ' + tempsMoyen + ' ms.'
}

function demarrerJeu() {
    tour = 0
}

function demarrerTour() {

    var delaiDebutTour = 3000 + Math.random() * 2000
    timeoutDebutChrono = setTimeout(pageCliquesMaintenant, delaiDebutTour)
}

function finTour(tempsReaction) {
    listeTempsReaction.push(tempsReaction)

    tour = tour + 1
}

function calculTempsReactionMoyen() {

    var tempsTotal = 0
    listeTempsReaction.forEach(function (temps) {
        tempsTotal = tempsTotal + temps
    })

    return tempsTotal / listeTempsReaction.length
}