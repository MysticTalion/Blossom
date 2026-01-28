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
// Utilise le widget Twitter officiel pour afficher les tweets en temps réel
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
// NOTE: Pour récupérer les vraies données, vous devrez utiliser l'API Start.gg
// Documentation: https://developer.start.gg/docs/intro
// Vous aurez besoin d'une clé API

function loadStartGGData() {
  fetch("/.netlify/functions/startgg?slug=tournament/blossom")
    .then(res => res.json())
    .then(data => {
      const tournament = data.data.tournament;

      document.getElementById('participant-count').textContent =
        tournament.numAttendees;

      const date = new Date(tournament.startAt * 1000);
      document.getElementById('tournament-date').textContent =
        date.toLocaleDateString('fr-FR');

      const ssbuEvent = tournament.events.find(e =>
        e.name.toLowerCase().includes("ssbu")
      );

      if (ssbuEvent) {
        document.getElementById('entrant-count').textContent =
          ssbuEvent.numEntrants;
      }
    })
    .catch(err => console.error("Start.gg error:", err));
}

        
        // Mettre à jour la date
        const date = new Date(tournament.startAt * 1000);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
        document.getElementById('tournament-date').textContent = formattedDate;
    })
    .catch(error => {
        console.error('Erreur lors du chargement des données Start.gg:', error);
    });
    */
}

// ===== MISE À JOUR AUTOMATIQUE TWITCH EMBED =====
// Le parent doit correspondre au domaine où vous hébergez le site
function updateTwitchEmbed() {
    const twitchIframe = document.querySelector('.twitch-embed iframe');
    const currentDomain = window.location.hostname;
    
    // Si vous hébergez sur GitHub Pages, le domaine sera : votre-username.github.io
    // Modifiez cette ligne avec votre vrai domaine une fois en ligne
    if (currentDomain !== 'localhost' && currentDomain !== '127.0.0.1') {
        twitchIframe.src = `https://player.twitch.tv/?channel=blossom_ssb&parent=${currentDomain}`;
    }
}

// ===== CHARGEMENT INITIAL =====
window.addEventListener('load', () => {
    loadTweets();
    loadStartGGData();
    updateTwitchEmbed();
});

// ===== ACTUALISATION AUTOMATIQUE (optionnel) =====
// Actualiser les données Start.gg toutes les 5 minutes
setInterval(() => {
    loadStartGGData();
}, 5 * 60 * 1000);
