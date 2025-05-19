window.addEventListener("DOMContentLoaded", (event) => {
    const sections = document.querySelectorAll(".transition");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
                entry.target.classList.add("fade-in");
            } else {
                entry.target.classList.remove("fade-in");
            }
        });
    });
    
    sections.forEach((section) => {
        observer.observe(section);
    });
});