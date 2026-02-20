// ===== CALENDRIER DES WEEKLIES =====
// Format: [année, mois (0-11), jour, "Lundi" ou "Mardi", "Simple" ou "Doubles"]
const weeklyDates = [
    [2026, 1, 23, "Lundi", "Simple"],      // 23 février 2026 (mois 1 = février)
    [2026, 2, 3, "Mardi", "Simple"],       // 3 mars 2026
    [2026, 2, 9, "Lundi", "Doubles"],      // 9 mars 2026
    [2026, 2, 16, "Lundi", "Simple"],      // 16 mars 2026
    [2026, 2, 24, "Mardi", "Simple"],      // 24 mars 2026
    [2026, 2, 31, "Mardi", "Simple"],      // 31 mars 2026
    [2026, 3, 6, "Lundi", "Simple"]        // 6 avril 2026
];

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

    // ===== AFFICHER LA DATE DU PROCHAIN WEEKLY =====
    updateNextWeekly();
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

// ===== FONCTION CALCUL PROCHAIN WEEKLY =====
function updateNextWeekly() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset l'heure pour comparer seulement les dates
    
    // Trouver le prochain weekly dans le calendrier
    let nextWeekly = null;
    
    for (let i = 0; i < weeklyDates.length; i++) {
        const [year, month, day, dayName, type] = weeklyDates[i];
        const weeklyDate = new Date(year, month, day);
        weeklyDate.setHours(0, 0, 0, 0);
        
        // Si cette date est dans le futur ou aujourd'hui
        if (weeklyDate >= today) {
            nextWeekly = {
                date: weeklyDate,
                dayName: dayName,
                type: type
            };
            break;
        }
    }
    
    if (nextWeekly) {
        // Noms des mois en français (complets)
        const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
                            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        
        // Formater la date : "Lundi 23 Février" ou "Mardi 3 Mars"
        const formattedDate = `${nextWeekly.dayName} ${nextWeekly.date.getDate()} ${monthNames[nextWeekly.date.getMonth()]}`;
        
        // Afficher la date
        const dateElement = document.getElementById('tournament-date');
        const dayElement = document.getElementById('tournament-day');
        
        if (dateElement) {
            dateElement.textContent = formattedDate;
        }
        
        if (dayElement) {
            if (nextWeekly.type === "Doubles") {
                dayElement.textContent = "Prochain tournoi Doubles";
            } else {
                dayElement.textContent = `Prochain ${nextWeekly.dayName.toLowerCase()}`;
            }
        }
        
        console.log('Prochain weekly:', formattedDate, '-', nextWeekly.type);
    } else {
        // Aucun weekly programmé
        const dateElement = document.getElementById('tournament-date');
        const dayElement = document.getElementById('tournament-day');
        
        if (dateElement) {
            dateElement.textContent = 'À venir';
        }
        if (dayElement) {
            dayElement.textContent = 'Calendrier à mettre à jour';
        }
        
        console.log('Aucun weekly programmé dans le calendrier');
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
