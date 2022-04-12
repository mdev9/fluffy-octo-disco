var texte = 'Les kiwis sont des fruits de plusieurs espèces de lianes du genre Actinidia, famille des Actinidiaceae. Ils sont originaires de Chine, notamment de la province de Shaanxi. On en trouve par ailleurs dans des climats dits montagnards tropicaux. En France, les kiwis de l\'Adour sont les seuls à disposer d\'une indication géographique protégée (IGP) et d\'un label rouge.';
var listeTouchesIgnores = ['Shift', 'Alt', 'OS', 'CapsLock', 'Unidentified', 'Delete', 'Escape', 'Control', 'Tab', 'Enter', 'F12', 'F11', 'F10', 'F9', 'F8', 'F7', 'F6', 'F5', 'F4', 'F3', 'F2', 'F1', 'Insert', 'End', 'AltGraph', 'PageUp', 'PageDown', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp']
var longueurTexte = texte.length;
var index = 0;
var listeCaracteresFormates = [];



window.onload = function () {
    var span_texte = document.getElementById('span_texte');
    var span_texte_ecrit = document.getElementById('span_texte_ecrit');
    var btn_recommencer = document.getElementById('btn_recommencer');
    var textarea = document.getElementById('textarea');

    span_texte.innerText = texte;


    textarea.addEventListener('keydown', function (e) {
        // e est un objet contenant les métadonnées de l'évenement

        var classe;
        var caractere = texte[index];
        var caractereAffiche = caractere;
        var elementSupprime;

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
}

function majTexte() {

    var texteEcrit = '';
    listeCaracteresFormates.forEach(element => {
        texteEcrit += element;
    });
    span_texte_ecrit.innerHTML = texteEcrit;

}


// texteExcrit, texteRestant, texteReference
// Mettre à jour variable texteRestant, se baser sur les variables index et texteReference
// majTexte() --> mettre à jour affichage de texteEcrit et texteRestant