// ========================================
// ELEMENTOS
// ========================================

const header =
    document.getElementById("header");

const menuButton =
    document.getElementById("menuButton");

const nav =
    document.getElementById("nav");

const navLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll("section[id]");

const revealElements =
    document.querySelectorAll(".reveal");

const currentYear =
    document.getElementById("currentYear");

const codeWindow =
    document.getElementById("codeWindow");


// ========================================
// ANO
// ========================================

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


// ========================================
// HEADER
// ========================================

function updateHeader() {

    if (window.scrollY > 30) {

        header.classList.add(
            "scrolled"
        );

    } else {

        header.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);

updateHeader();


// ========================================
// MOBILE MENU
// ========================================

menuButton.addEventListener(
    "click",
    () => {

        const isOpen =
            nav.classList.toggle(
                "active"
            );

        menuButton.classList.toggle(
            "active"
        );

        document.body.classList.toggle(
            "menu-open"
        );

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

    }
);


// ========================================
// CLOSE MENU
// ========================================

function closeMenu() {

    nav.classList.remove(
        "active"
    );

    menuButton.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "menu-open"
    );

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

}


navLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    }
);


// ========================================
// ACTIVE SECTION
// ========================================

function updateActiveSection() {

    const scrollPosition =
        window.scrollY + 170;

    sections.forEach(
        section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute(
                    "id"
                );

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                navLinks.forEach(
                    link => {

                        link.classList.remove(
                            "active"
                        );

                        if (
                            link.getAttribute(
                                "href"
                            ) ===
                            `#${sectionId}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    }
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveSection,
    {
        passive: true
    }
);

updateActiveSection();


// ========================================
// REVEAL
// ========================================

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


// ========================================
// CLICK FORA DO MENU
// ========================================

document.addEventListener(
    "click",
    event => {

        const clickedInsideNav =
            nav.contains(
                event.target
            );

        const clickedMenuButton =
            menuButton.contains(
                event.target
            );

        if (
            nav.classList.contains("active") &&
            !clickedInsideNav &&
            !clickedMenuButton
        ) {

            closeMenu();

        }

    }
);


// ========================================
// ESC
// ========================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            nav.classList.contains(
                "active"
            )
        ) {

            closeMenu();

        }

    }
);


// ========================================
// PARALLAX CODE WINDOW
// ========================================

function handleCodeParallax(event) {

    if (!codeWindow) {
        return;
    }

    if (window.innerWidth < 1000) {

        codeWindow.style.transform =
            "translate3d(0, 0, 0)";

        return;
    }

    const mouseX =
        event.clientX /
        window.innerWidth;

    const mouseY =
        event.clientY /
        window.innerHeight;

    const moveX =
        (mouseX - 0.5) * 10;

    const moveY =
        (mouseY - 0.5) * 10;

    codeWindow.style.transform =
        `translate3d(${moveX}px, ${moveY}px, 0)`;

}


window.addEventListener(
    "mousemove",
    handleCodeParallax
);


// ========================================
// RESET PARALLAX
// ========================================

document.documentElement.addEventListener(
    "mouseleave",
    () => {

        if (codeWindow) {

            codeWindow.style.transform =
                "translate3d(0, 0, 0)";

        }

    }
);


// ========================================
// RESIZE
// ========================================

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth < 1000 &&
            codeWindow
        ) {

            codeWindow.style.transform =
                "translate3d(0, 0, 0)";

        }

        if (
            window.innerWidth > 760 &&
            nav.classList.contains(
                "active"
            )
        ) {

            closeMenu();

        }

    }
);
