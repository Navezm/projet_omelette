/** Créer un objet personne. Cette personne doit avoir des propriétés et des méthodes : 
* - nom
* - lieu
* - argent
* - mainDroite
* ( du coup main gauche)
* - seDeplacer(lieu)
* - payerArticle(article)
* - couper(ingredient, outil)
*/

let personne = {
    nom: "Martin",
    lieu: "Bruxelles",
    argent: 20,
    mainDroite: [],
    mainGauche: [],
    seDeplacer(lieu){
        this.lieu = lieu;
    },
    payerArticle(article){
        this.argent = this.argent - article.prix;
    },
    couper(ingredient, outil){
        ingredient.etat = outil.action;
    },
};

/**
* Créer un lieu "maison" (un objet) avec comme propriété "nom: 'maison'" et "personnes = []" => qui sera un tableau de personnes présentes dans la maison :
*/

let maison = {
    nom: "maison",
    personnes: [],
};


/**
* Créer un outil (couteau) pour découper les ingrédients achetés
* propriétés : nom et action.
* action a comme valeur l'état "coupé" (qui sera mis aux légumes lorsqu'ils seront coupés avec le méthode de "personne".)
*/

let couteau = {
    nom: "couteau",
    action: "coupé",
};

/**
 * Créer des produits (ingrédients) à mettre dans le magasin qui serviront à créer l'omelette (oignon, oeuf, epice, fromage, ...);
 * attributs : nom, etats ( entier,coupé, moulu), prix
 */

class Ingredients{
    constructor(nom, etat, prix){
        this.nom = nom;
        this.etat = etat;
        this.prix = prix;
    };
};

let oignon = new Ingredients("oignon", "entier", 5);
let oeuf = new Ingredients("oeuf", "entier", 0.5);
let epice = new Ingredients("epice", "moulu", 2);
let fromage = new Ingredients("fromage", "entier", 3);


// Créer un lieu "epicerie" qui a comme propriétés :
// nom, personnes = [], paniers (plusieurs objets paniers avec le type de panier et le contenu du panier),
// Les "ingrédients" créés juste au dessus contenus dans un tableau.

let epicerie = {
    nom: "epicerie",
    personnes: [],
    paniers: [panier1 = {nom: "panier", contenu: []}, panier2 = {nom: "panier", contenu: []}, panier3 = {nom: "panier", contenu: []}, panier4 = {nom: "panier", contenu: []}],
    ingredients: [oignon, oeuf, epice, fromage],
};

/**
 * Créer un poele avec un tableau comme contenu. Et avec une méthode cuir() qui, après 4 secondes, met l'état 'cuit' à this.contenu[0]. On peut faire ça avec la fonction setTimeout(()=> {}, 4000)
 */

 let poele = {
    contenu: [],
    cuir(){
        setTimeout(() => {
            this.contenu[0].etat = "cuit";
            console.log(`C'est bon c'est cuit !`);
        }, 4000);
    },
 };

// Créer un bol avec un tableau comme contenu
// ajouter une méthode melanger(nomMelange) qui va créer un nouvel objet "newMelange" avec comme nom la variable nomMelange passé en paramètre et avec 'pas cuit' en etat. cette méthode remplacera this.contenu par [l'obj newMelange]

let bol = {
    contenu: [],
    melanger(nomMelange){
        let newMelange = {
            nom: nomMelange,
            etat: "pas cuit",
        };
        while (this.contenu.length > 0){
            this.contenu.pop();
        };
        this.contenu.push(newMelange);
    },
};


/**** DEBUT DE L'OMELETTE ****/

// Pour dire que le personnage est à la maison :
// Avec l'objet personnage, utiliser la method seDeplacer et de passer en paramètre l'objet maison

personne.seDeplacer("Maison");

// Afficher un message tel que :
// console.log(personnage.nom + " est actuellement à la " + personnage.lieu);

console.log(`${personne.nom} est actuellement à la ${personne.lieu}`);

// Pour aller à l'épicerie acheter les ingrédients pour l'omelette, je répète la première étape en changeant le parametre de la method seDeplacer par l'epicerie

personne.seDeplacer("Épicerie");

// Mon personnage prend un des paniers dans l'épicerie (il récupère le panier dans les objets de l'épicerie et le met dans sa main droite.)

personne.mainDroite.push(epicerie.paniers[0]);
epicerie.paniers.pop();

// Il doit y avoir un objet dans la main droite de personnage et un panier en moins. Vérifier avec des console.log() ensuite afficher un message du type : 
// console.log(`${personnage.nom} a pris un ${personnage.mainDroite.type}`);

console.log(epicerie);
console.log(personne);
console.log(`${personne.nom} a pris un ${personne.mainDroite[0].nom}`);


// Je créer une boucle qui va prendre chaque élément (ingrédient) du contenu de l'épicerie (1 à 1) et en faire une COPIE dans le panier du personnage
// Afficher un message à chaque ingrédient pris

for (let i = 0; i < epicerie.ingredients.length; i++) {
    personne.mainDroite[0].contenu.push(epicerie.ingredients[i]);
    console.log(`Dans mon panier je met : ${epicerie.ingredients[i].nom}`);
};

console.log(personne);
// Payer chaque ingrédient récupéré dans le panier. Avec une boucle aussi, on va les passer 1 à 1 dans la fonction payerArticle()

for (let i = 0; i < personne.mainDroite[0].contenu.length; i++) {
    personne.payerArticle(epicerie.ingredients[i]);
};

// Afficher un message de ce qu'il reste d'argent sur le personnage.

console.log(personne.argent);

// rentrer à la maison (comme ça on pourra cuisiner)

personne.seDeplacer("Maison");

// mettre chaque ingrédient dans le bol (1 à 1 donc avec une boucle)

for (let i = 0; i < personne.mainDroite[0].contenu.length; i++) {
    bol.contenu.push(personne.mainDroite[0].contenu[i]);
    console.log(`Dans mon bol je met : ${personne.mainDroite[0].contenu[i].nom}`);
    delete personne.mainDroite[0].contenu[i];

};

// Vérifier que les ingrédients ne se trouvent plus dans le panier (oups ! on a oublié de le rapporter x)

console.log(personne.mainDroite[0].contenu);

// Afficher un petit message de chaque ingrédient qu'on met dans le bol.

// Retourner à l'épicerie pour rapporter le panier. (donc seDeplacer puis enlever le panier de la main droite et le remetre dans les paniers de l'épicerie.)

personne.seDeplacer("Épicerie");
epicerie.paniers.push(personne.mainDroite[0]);
personne.mainDroite.splice(0,1);

console.log(epicerie);
console.log(personne);

// Afficher un petit message

console.log(`J'ai ramené mon panier à l'épicerie`);

// Retourner à la maison pour continuer l'omelette

personne.seDeplacer("Maison");

// Afficher un petit message

console.log(`Je suis rentré à la maison je peux continuer mon omelette`);

// Vérifier chaque ingrédient dans le bol et le couper seulement s'il est entier ! Pour ça on utilise la méthode couper de personnage

for (let i = 0; i < bol.contenu.length; i++) {
    if (bol.contenu[i].etat == "entier"){
        personne.couper(bol.contenu[i], couteau);
    };
};

// Mélanger le contenu du bol avec la méthode melanger. on va nommer ce mélange une 'omelette' (à passer en param).

bol.melanger("omelette");

// Afficher un message avec le nouveau mélange

console.log(`Dans mon bol j'ai : ${bol.contenu[0].nom}`);

// vider le contenu du bol dans la poele. Il ne doit plus rien avoir dans le bol et y avoir juste l'omelette pas cuite.

poele.contenu.push(bol.contenu[0]);

poele.cuir();

// Afficher un message final, notre omelette est cuite :)

console.log(poele);