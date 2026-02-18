// ===== ATTENDRE QUE LA PAGE SOIT CHARGÉE =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVIGATION ENTRE PAGES =====
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Retirer active de tous les liens et pages
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            // Ajouter active au lien cliqué et à la page correspondante
            link.classList.add('active');
            const pageId = link.getAttribute('data-page');
            document.getElementById(pageId).classList.add('active');
            
            // Scroll vers le haut
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // ===== INITIALISER TWITCH =====
    initTwitchEmbed();

    // ===== CALCULER LA DATE DU PROCHAIN MARDI =====
    updateNextTuesday();
});

// ===== FONCTION TWITCH EMBED =====
function initTwitchEmbed() {
    // Vérifier que le script Twitch est chargé
    if (typeof Twitch !== 'undefined' && Twitch.Embed) {
        try {
            new Twitch.Embed('twitch-embed', {
                width: '100%',
                height: '100%',
                channel: 'blossom_ssb',
                layout: 'video',
                autoplay: false,
                muted: false
            });
            console.log('Twitch embed chargé avec succès');
        } catch (error) {
            console.error('Erreur lors du chargement Twitch:', error);
        }
    } else {
        console.error('Le script Twitch n\'est pas chargé');
        // Réessayer après 1 seconde
        setTimeout(initTwitchEmbed, 1000);
    }
}

// ===== FONCTION CALCUL PROCHAIN MARDI =====
function updateNextTuesday() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0=dimanche, 1=lundi, 2=mardi, etc.
    
    // Calculer le nombre de jours jusqu'au prochain mardi
    // Si on est mardi, on prend le mardi prochain (dans 7 jours)
    let daysUntilTuesday;
    if (dayOfWeek === 2) {
        // On est mardi, prendre le prochain mardi
        daysUntilTuesday = 7;
    } else if (dayOfWeek < 2) {
        // On est avant mardi cette semaine
        daysUntilTuesday = 2 - dayOfWeek;
    } else {
        // On est après mardi, prendre le mardi de la semaine prochaine
        daysUntilTuesday = 9 - dayOfWeek;
    }
    
    // Créer la date du prochain mardi
    const nextTuesday = new Date(today);
    nextTuesday.setDate(today.getDate() + daysUntilTuesday);
    
    // Noms des jours et mois en français
    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 
                        'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    
    // Formater la date : "Mar 25 Fév"
    const formattedDate = `${dayNames[nextTuesday.getDay()]} ${nextTuesday.getDate()} ${monthNames[nextTuesday.getMonth()]}`;
    
    // Afficher la date
    const dateElement = document.getElementById('tournament-date');
    if (dateElement) {
        dateElement.textContent = formattedDate;
        console.log('Date du prochain mardi:', formattedDate);
    }
}

// ===== FORCER LE RECHARGEMENT DU WIDGET TWITTER =====
window.addEventListener('load', function() {
    // Attendre que le script Twitter soit chargé
    if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
        console.log('Widget Twitter rechargé');
    } else {
        // Réessayer après 2 secondes
        setTimeout(function() {
            if (window.twttr && window.twttr.widgets) {
                window.twttr.widgets.load();
                console.log('Widget Twitter rechargé (2ème tentative)');
            }
        }, 2000);
    }
});
