var texte = 'Les kiwis sont des fruits de plusieurs espèces de lianes du genre Actinidia, famille des Actinidiaceae. Ils sont originaires de Chine, notamment de la province de Shaanxi. On en trouve par ailleurs dans des climats dits montagnards tropicaux. En France, les kiwis de l\'Adour sont les seuls à disposer d\'une indication géographique protégée (IGP) et d\'un label rouge.';
var longueurTexte = texte.length;
var index = 0;
var listeCaracteresFormates = [];




window.onload = function () {
    var p_texte = document.getElementById('p_texte');
    var p_texte_ecrit = document.getElementById('p_texte_ecrit');
    var btn_recommencer = document.getElementById('btn_recommencer');
    var textarea = document.getElementById('textarea');

    p_texte.innerText = texte;


    textarea.addEventListener('keydown', function (e) {
        // e est un objet contenant les métadonnées de l'évenement

        var classe;
        var caractere = texte[index];
        var caractereAffiche = caractere;

        if (e.key == 'Backspace') {
            var elementSupprime = listeCaracteresFormates.pop();
            if (!elementSupprime.includes('caractere_en_trop')) {
                index -= 1;
            }
            majTexteEcrit();
            return; // si la touche est backspace, on n'éxécute pas le reste de la fonction
        }
        if (e.key == 'Shift') {
            return; // si la touche est shift, on n'éxécute pas le reste de la fonction
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
        majTexteEcrit();
    });
}

function majTexteEcrit() {

    var texteEcrit = '';
    listeCaracteresFormates.forEach(element => {
        texteEcrit += element;
    });
    p_texte_ecrit.innerHTML = texteEcrit;

}