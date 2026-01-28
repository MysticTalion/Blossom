// ===== NAVIGATION ENTRE PAGES =====
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Retirer la classe active de tous les liens
        navLinks.forEach(l => l.classList.remove('active'));
        // Ajouter la classe active au lien cliqué
        link.classList.add('active');
        
        // Cacher toutes les pages
        pages.forEach(p => p.classList.remove('active'));
        // Afficher la page correspondante
        const pageId = link.getAttribute('data-page');
        document.getElementById(pageId).classList.add('active');
        
        // Scroll vers le haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ===== FORMULAIRE DE CONTACT =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
        contactForm.reset();
    });
}

// ===== CHARGEMENT DES TWEETS =====
function loadTweets() {
    const container = document.getElementById('tweets-container');
    
    // Intégrer le widget Twitter officiel
    container.innerHTML = `
        <a class="twitter-timeline" 
           data-height="600" 
           data-theme="light"
           data-chrome="noheader nofooter noborders"
           href="https://twitter.com/blossom_ssbu?ref_src=twsrc%5Etfw">
           Chargement des tweets...
        </a>
        <p style="text-align: center; margin-top: 1rem;">
            <a href="https://x.com/blossom_ssbu" target="_blank" class="cta-button">
                Voir le profil complet
            </a>
        </p>
    `;
    
    // Charger le script Twitter (uniquement si pas déjà chargé)
    if (!document.querySelector('script[src*="platform.twitter.com"]')) {
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.charset = 'utf-8';
        document.body.appendChild(script);
    } else {
        // Si le script est déjà chargé, forcer le rafraîchissement du widget
        if (window.twttr && window.twttr.widgets) {
            window.twttr.widgets.load();
        }
    }
}

// ===== INFOS START.GG =====
// Récupère les données via Netlify Functions (token sécurisé côté serveur)
function loadStartGGData() {
    fetch("/.netlify/functions/startgg?slug=tournament/blossom")
        .then(res => res.json())
        .then(data => {
            const tournament = data.data.tournament;

            // Nombre total de participants
            document.getElementById('participant-count').textContent = 
                tournament.numAttendees || '--';

            // Date du tournoi
            const date = new Date(tournament.startAt * 1000);
            document.getElementById('tournament-date').textContent = 
                date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });

            // Trouver l'événement SSBU spécifique
            const ssbuEvent = tournament.events.find(e =>
                e.name.toLowerCase().includes("ssbu") || 
                e.name.toLowerCase().includes("ultimate")
            );

            if (ssbuEvent && document.getElementById('entrant-count')) {
                document.getElementById('entrant-count').textContent = 
                    ssbuEvent.numEntrants || '--';
            }
        })
        .catch(err => {
            console.error("Erreur Start.gg:", err);
            // Valeurs par défaut en cas d'erreur
            document.getElementById('participant-count').textContent = '--';
            document.getElementById('tournament-date').textContent = '--/--';
            if (document.getElementById('entrant-count')) {
                document.getElementById('entrant-count').textContent = '--';
            }
        });
}

// ===== MISE À JOUR AUTOMATIQUE TWITCH EMBED =====
// Le parent doit correspondre au domaine où vous hébergez le site
function updateTwitchEmbed() {
    const twitchIframe = document.querySelector('.twitch-embed iframe');
    
    if (twitchIframe) {
        const currentDomain = window.location.hostname;
        
        // Mise à jour du domaine parent pour Twitch
        // Fonctionne pour GitHub Pages, Netlify, ou votre propre domaine
        if (currentDomain !== 'localhost' && currentDomain !== '127.0.0.1') {
            twitchIframe.src = `https://player.twitch.tv/?channel=blossom_ssb&parent=${currentDomain}`;
        }
    }
}

// ===== CHARGEMENT INITIAL =====
window.addEventListener('load', () => {
    loadTweets();
    loadStartGGData();
    updateTwitchEmbed();
});

// ===== ACTUALISATION AUTOMATIQUE =====
// Actualiser les données Start.gg toutes les 5 minutes
setInterval(() => {
    loadStartGGData();
}, 5 * 60 * 1000);
