// ===== NAVIGATION ENTRE PAGES =====
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        pages.forEach(p => p.classList.remove('active'));
        const pageId = link.getAttribute('data-page');
        document.getElementById(pageId).classList.add('active');
        
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
    
    if (!document.querySelector('script[src*="platform.twitter.com"]')) {
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.charset = 'utf-8';
        document.body.appendChild(script);
    } else {
        if (window.twttr && window.twttr.widgets) {
            window.twttr.widgets.load();
        }
    }
}

// ===== INFOS START.GG =====
function loadStartGGData() {
    fetch("/.netlify/functions/startgg?slug=tournament/blossom")
        .then(res => res.json())
        .then(data => {
            const tournament = data.data.tournament;

            document.getElementById('participant-count').textContent = 
                tournament.numAttendees || '--';

            const date = new Date(tournament.startAt * 1000);
            document.getElementById('tournament-date').textContent = 
                date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });

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
            document.getElementById('participant-count').textContent = '--';
            document.getElementById('tournament-date').textContent = '--/--';
            if (document.getElementById('entrant-count')) {
                document.getElementById('entrant-count').textContent = '--';
            }
        });
}

// ===== TWITCH EMBED =====
function initTwitchEmbed() {
    const script = document.createElement('script');
    script.src = 'https://embed.twitch.tv/embed/v1.js';
    script.onload = () => {
        new Twitch.Embed('twitch-embed', {
            width: '100%',
            height: 480,
            channel: 'blossom_ssb',
            layout: 'video',
            autoplay: false,
            muted: false
        });
    };
    document.body.appendChild(script);
}

// ===== CHARGEMENT INITIAL =====
window.addEventListener('load', () => {
    loadTweets();
    loadStartGGData();
    initTwitchEmbed();
});

// ===== ACTUALISATION AUTOMATIQUE =====
setInterval(() => {
    loadStartGGData();
}, 5 * 60 * 1000);