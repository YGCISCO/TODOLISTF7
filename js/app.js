// 1. Initialisation de Framework7 et configuration des routes
var app = new Framework7({
    el: '#app',
    name: 'My ToDo App',
    theme: 'auto',
    // Définition des écrans (routes)
    routes: [
        {
            path: '/',
            url: './index.html',
        },
        {
            path: '/taches/',
            url: './pages/pages.html', // CORRIGÉ : correspond à ton fichier actuel
        },
    ],
});

// Initialisation de la vue principale
var mainView = app.views.create('.view-main');

// Raccourci Framework7 pour manipuler le DOM
var $$ = Dom7;

// Tableau de données initial (Séance 2)
let taches = [
    "Module F7 - Introduction",
    "Module F7 - Session 1",
    "Module F7 - Session 2",
    "Module F7 - Session 3"
];

/* ============================================================
   Gestion événementielle de la page "taches"
   Le code s'exécute uniquement quand l'écran des tâches est chargé.
   ============================================================ */
$$(document).on('page:init', '.page[data-name="taches"]', function (e) {
    
    const container = document.getElementById('todo-container');
    const inputTache = document.getElementById('todo-input');
    const btnAjouter = document.getElementById('add-btn');

    // Fonction pour afficher graphiquement les tâches du tableau
    function rendreListe() {
        container.innerHTML = ''; // On vide l'interface avant de reconstruire
        
        taches.forEach((tache, index) => {
            const li = document.createElement('li');
            li.className = 'item-content';
            li.innerHTML = `
                <div class="item-media">
                    <label class="checkbox">
                        <input type="checkbox" class="todo-checkbox">
                        <i class="icon-checkbox"></i>
                    </label>
                </div>
                <div class="item-inner">
                    <div class="item-title">${tache}</div>
                </div>
                <div class="right margin-right">
                    <a href="#" class="link delete-btn" data-id="${index}">
                        <i class="f7-icons text-color-red" style="font-size: 22px;">trash</i>
                    </a>
                </div>
            `;
            container.appendChild(li);
        });

        // Réassigner les écouteurs de suppression sur les nouveaux boutons
        creerEcouteursSuppression();
    }

    // Action : Ajouter une tâche
    btnAjouter.addEventListener('click', function() {
        const texte = inputTache.value.trim();
        if (texte !== "") {
            taches.push(texte); // Ajout dans le tableau
            inputTache.value = ""; // Vider le champ
            rendreListe(); // Actualiser l'écran
        } else {
            app.dialog.alert("Veuillez inscrire une tâche valide.");
        }
    });

    // Action : Supprimer une tâche
    function creerEcouteursSuppression() {
        const boutonsSuppr = document.querySelectorAll('.delete-btn');
        boutonsSuppr.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const indexASupprimer = this.getAttribute('data-id');
                taches.splice(indexASupprimer, 1); // Retire du tableau
                rendreListe(); // Actualiser l'écran
            });
        });
    }

    // Premier affichage au chargement de la page
    rendreListe();
});