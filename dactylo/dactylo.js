var texte = 'Les kiwis sont des fruits de plusieurs espèces de lianes du genre Actinidia, famille des Actinidiaceae. Ils sont originaires de Chine, notamment de la province de Shaanxi. On en trouve par ailleurs dans des climats dits montagnards tropicaux. En France, les kiwis de l\'Adour sont les seuls à disposer d\'une indication géographique protégée (IGP) et d\'un label rouge.';
var listeTouchesIgnores = ['Shift', 'Alt', 'OS', 'CapsLock', 'Unidentified', 'Delete', 'Escape', 'Control', 'Tab', 'Enter', 'F12', 'F11', 'F10', 'F9', 'F8', 'F7', 'F6', 'F5', 'F4', 'F3', 'F2', 'F1', 'Insert', 'End', 'AltGraph', 'PageUp', 'PageDown', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp']
var longueurTexte = texte.length;
var index = 0;
var texteRestant = texte;
var listeCaracteresFormates = [];
var tempsDebutReaction;
var jeuCommence = false;
var texteEcrit = '';

window.onload = function () {
    var span_texte_restant = document.getElementById('span_texte_restant');
    var span_texte_ecrit = document.getElementById('span_texte_ecrit');
    var btn_recommencer = document.getElementById('btn_recommencer');
    var span_mpm = document.getElementById('span_mpm');


    span_texte_restant.innerText = texteRestant;



    window.addEventListener('keydown', function (e) {
        // e est un objet contenant les métadonnées de l'évenement

        var classe;
        var caractere = texte[index];
        var caractereAffiche = caractere;
        var elementSupprime;

        if (!jeuCommence) {
            tempsDebutReaction = Date.now()
            jeuCommence = true;
        }
        if (e.key == 'Backspace') {
            var elementSupprime = listeCaracteresFormates.pop();
            if (!elementSupprime.includes('caractere_en_trop')) {
                index -= 1;
            }
            majTexte();
            return; // si la touche est backspace, on n'éxécute pas le reste de la fonction
        }
        if (listeTouchesIgnores.includes(e.key)) {
            return; // si la touche est une touche parmie la liste, on n'éxécute pas le reste de la fonction.
        }
        if (e.key == texte[index]) {
            classe = 'caractere_bon';
            index += 1;
        } else {
            classe = 'caractere_mauvais';
            if (caractere == ' ') {
                classe = 'caractere_en_trop';
                caractereAffiche = e.key;
            } else {
                index += 1;
            }
        }

        var caractereFormate = `<span class="${classe}">${caractereAffiche}</span>`;
        listeCaracteresFormates.push(caractereFormate);
        majTexte();
    });


    function compteur() {
        // Mots par minute = (nombre de charactères / 5) / temps
        var temps = Date.now() - tempsDebutReaction;
        tempsMinutes = temps / 60000;
        console.log(temps);
        var motsParMinute = (index / 5 / tempsMinutes).toFixed(0);
        return motsParMinute;
    }

    function majTexte() {

        texteEcrit = '';
        listeCaracteresFormates.forEach(element => {
            texteEcrit += element;
            texteRestant = texte.substring(index, longueurTexte)
            //console.log(index);
        });
        span_texte_ecrit.innerHTML = texteEcrit;
        span_texte_restant.innerHTML = texteRestant;
        span_mpm.innerText = compteur();

        if (texteRestant == '') {
            finjeu()
        }

    }

}




function accuidite() {

}


function score() {
    // Score = MPM * Accuidité


}

function finjeu() {

}

// texteExcrit, texteRestant, texteReference
// Mettre à jour variable texteRestant, se baser sur les variables index et texteReference en utilisant la méthode substring()
// majTexte() --> mettre à jour affichage de texteEcrit et texteRestant

//todo: enlever la recherche ' dans la page 