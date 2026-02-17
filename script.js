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

        history.replaceState(null, "", `#${id}`);
    }

    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            showPage(link.dataset.page);
        });
    });

    const hash = location.hash.replace("#", "");
    if (hash) showPage(hash);
});