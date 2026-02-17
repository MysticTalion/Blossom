document.addEventListener("DOMContentLoaded", () => {

    const links = document.querySelectorAll(".nav-link");
    const pages = document.querySelectorAll(".page");

    function showPage(id) {
        pages.forEach(p => p.classList.remove("active"));
        links.forEach(l => l.classList.remove("active"));

        const page = document.getElementById(id);
        const link = document.querySelector(`[data-page="${id}"]`);

        if (page) page.classList.add("active");
        if (link) link.classList.add("active");
    }

    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            showPage(link.dataset.page);
        });
    });

    // Loader hide
    window.addEventListener("load", () => {
        document.getElementById("loader").style.display = "none";
    });

    loadStartGG();
});

// ==========================
// LOAD START.GG VIA NETLIFY FUNCTION
// ==========================
async function loadStartGG() {

    try {
        const res = await fetch(`/.netlify/functions/startgg?slug=tournament/blossom`);
        const json = await res.json();

        const tournament = json.data.tournament;
        if (!tournament) return;

        // Participants
        document.getElementById("participant-count").textContent = tournament.numAttendees;

        // Date
        const date = new Date(tournament.startAt * 1000);
        document.getElementById("tournament-date").textContent =
            date.toLocaleDateString("fr-FR");

        // Bouton inscription
        document.getElementById("register-link").href =
            `https://start.gg/blossom/register`;

    } catch (err) {
        console.error("Erreur lors du fetch StartGG:", err);
    }
}