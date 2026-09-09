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

const themeToggle =
    document.getElementById("themeToggle");


// ========================================
// ANO AUTOMÁTICO
// ========================================

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


// ========================================
// TEMA
// ========================================

function getCurrentTheme() {

    return (
        document.documentElement
            .dataset
            .theme ||
        "light"
    );

}


function updateThemeButton() {

    if (!themeToggle) {
        return;
    }


    const isDark =
        getCurrentTheme() ===
        "dark";


    themeToggle.setAttribute(
        "aria-label",
        isDark
            ? "Ativar modo claro"
            : "Ativar modo escuro"
    );


    themeToggle.setAttribute(
        "title",
        isDark
            ? "Modo claro"
            : "Modo escuro"
    );

}


function setTheme(theme) {

    document.documentElement
        .dataset
        .theme =
        theme;


    localStorage.setItem(
        "portfolio-theme",
        theme
    );


    updateThemeButton();

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const currentTheme =
                getCurrentTheme();


            const newTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";


            setTheme(newTheme);

        }
    );

}


updateThemeButton();


// ========================================
// ALTERAÇÃO DO TEMA DO SISTEMA
// ========================================

const systemTheme =
    window.matchMedia(
        "(prefers-color-scheme: dark)"
    );


systemTheme.addEventListener(
    "change",
    event => {

        /*
            Só acompanhamos o sistema
            se o usuário ainda não tiver
            escolhido manualmente um tema.
        */

        const savedTheme =
            localStorage.getItem(
                "portfolio-theme"
            );


        if (savedTheme) {
            return;
        }


        setTheme(
            event.matches
                ? "dark"
                : "light"
        );

    }
);


// ========================================
// HEADER AO ROLAR
// ========================================

function updateHeader() {

    if (!header) {
        return;
    }


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
// FUNÇÃO FECHAR MENU
// ========================================

function closeMenu() {

    if (!nav || !menuButton) {
        return;
    }


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


// ========================================
// MENU MOBILE
// ========================================

if (
    menuButton &&
    nav
) {

    menuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                nav.classList.toggle(
                    "active"
                );


            menuButton.classList.toggle(
                "active",
                isOpen
            );


            document.body.classList.toggle(
                "menu-open",
                isOpen
            );


            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );

}


// ========================================
// FECHAR MENU AO CLICAR EM LINK
// ========================================

navLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                closeMenu();

            }
        );

    }
);


// ========================================
// LINK ATIVO CONFORME O SCROLL
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
                scrollPosition >=
                sectionTop &&
                scrollPosition <
                sectionTop +
                sectionHeight
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

                        entry.target
                            .classList
                            .add(
                                "visible"
                            );


                        revealObserver
                            .unobserve(
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
// FECHAR MENU AO CLICAR FORA
// ========================================

document.addEventListener(
    "click",
    event => {

        if (
            !nav ||
            !menuButton
        ) {
            return;
        }


        if (
            !nav.classList.contains(
                "active"
            )
        ) {
            return;
        }


        const clickedInsideNav =
            nav.contains(
                event.target
            );


        const clickedMenuButton =
            menuButton.contains(
                event.target
            );


        if (
            !clickedInsideNav &&
            !clickedMenuButton
        ) {

            closeMenu();

        }

    }
);


// ========================================
// ESC FECHA MENU
// ========================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeMenu();

        }

    }
);


// ========================================
// PARALLAX DA JANELA
// ========================================

function handleCodeParallax(
    event
) {

    if (!codeWindow) {
        return;
    }


    /*
        Sem parallax em telas menores.
    */

    if (
        window.innerWidth <
        1000
    ) {

        codeWindow.style
            .transform =
            "translate3d(0, 0, 0)";

        return;
    }


    /*
        Também respeita pessoas
        que preferem menos movimento.
    */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {
        return;
    }


    const mouseX =
        event.clientX /
        window.innerWidth;


    const mouseY =
        event.clientY /
        window.innerHeight;


    const moveX =
        (mouseX - 0.5) *
        10;


    const moveY =
        (mouseY - 0.5) *
        10;


    codeWindow.style.transform =
        `
        translate3d(
            ${moveX}px,
            ${moveY}px,
            0
        )
        `;

}


window.addEventListener(
    "mousemove",
    handleCodeParallax
);


// ========================================
// RESET DO PARALLAX
// ========================================

document.documentElement
    .addEventListener(
        "mouseleave",
        () => {

            if (!codeWindow) {
                return;
            }


            codeWindow.style
                .transform =
                "translate3d(0, 0, 0)";

        }
    );


// ========================================
// RESIZE
// ========================================

window.addEventListener(
    "resize",
    () => {

        /*
            Desativa o movimento do
            card em tablet/mobile.
        */

        if (
            window.innerWidth <
            1000 &&
            codeWindow
        ) {

            codeWindow.style
                .transform =
                "translate3d(0, 0, 0)";

        }


        /*
            Se voltar para desktop
            com o menu aberto,
            fecha automaticamente.
        */

        if (
            window.innerWidth >
            760
        ) {

            closeMenu();

        }

    }
);
