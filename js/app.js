// Loading Screen

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.transition = "0.8s";

        setTimeout(() => {
            loader.style.display = "none";
        }, 800);

    }, 1500);

});
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if(navLinks.classList.contains("active")){
        menuToggle.innerHTML = "✕";
    }else{
        menuToggle.innerHTML = "☰";
    }
});
document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");
        menuToggle.innerHTML = "☰";

    });

});
/* ===========================
   Scroll Reveal
=========================== */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){

    reveals.forEach(section=>{

        const windowHeight = window.innerHeight;
        const revealTop = section.getBoundingClientRect().top;

        if(revealTop < windowHeight - 100){
            section.classList.add("active");
        }

    });

}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
/* ===========================
   Navbar Scroll Effect
=========================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 60){
        navbar.classList.add("scrolled");
    }else{
        navbar.classList.remove("scrolled");
    }

});
/* ===========================
   AUTOMATIC ARTWORK COUNTER
=========================== */

async function updateArtworkCount() {

    const counter = document.getElementById("artworks-count");

    if (!counter) return;

    try {

        const response = await fetch("gallery.html");

        if (!response.ok) {
            throw new Error("Gallery page not found");
        }

        const galleryHTML = await response.text();

        const parser = new DOMParser();
        const galleryDoc = parser.parseFromString(
            galleryHTML,
            "text/html"
        );

        const artworks = galleryDoc.querySelectorAll(
            ".full-art-card"
        );

        const totalArtworks = artworks.length;

        let current = 0;

        const duration = 1200;
        const startTime = performance.now();

        function animate(currentTime) {

            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            current = Math.floor(
                progress * totalArtworks
            );

            counter.textContent = current;

            if (progress < 1) {

                requestAnimationFrame(animate);

            } else {

                counter.textContent = totalArtworks;

            }

        }

        requestAnimationFrame(animate);

    } catch (error) {

        console.error(
            "Artwork counter error:",
            error
        );

    }

}

window.addEventListener(
    "DOMContentLoaded",
    updateArtworkCount
);