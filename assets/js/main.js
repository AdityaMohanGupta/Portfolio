/*===== SHOW MENU =====*/
const showMenu = (toggleId,navId)=> {
    const toggle = document.getElementById(toggleId), nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click',()=> {
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click',linkAction))

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })

    updateNavIndicator()
}
window.addEventListener('scroll',scrollActive)

/*===== CHANGE BACKGROUND HEADER =====*/ 
function scrollHeader() {
    const header = document.getElementById('header')
    if (this.scrollY >= 200) header.classList.add('scroll-header'); else header.classList.remove('scroll-header');
}
window.addEventListener('scroll',scrollHeader)

/*===== SHOW SCROLL TOP =====*/
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top')
    if (this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll');
}
window.addEventListener('scroll',scrollTop)

/*===== MIXITUP FILTER PORTFOLIO =====*/
const mixer = mixitup('.portfolio__container', {
    selectors: {
        target: '.portfolio__content'
    },
    animation: {
        duration: 400
    }
});

/* Link active portfolio */ 
const linkPortfolio = document.querySelectorAll('.portfolio__item')
function activePortfolio() {
    if(linkPortfolio) {
        linkPortfolio.forEach(l => l.classList.remove('active-portfolio'))
        this.classList.add('active-portfolio')
    }
}
linkPortfolio.forEach(l => l.addEventListener('click', activePortfolio))

/*===== GSAP ANIMATION =====*/
function playHeroIntro() {
    gsap.from('.home__img',{opacity: 0, duration: 2, delay:.1, x:60})
    gsap.from('.home__data',{opacity: 0, duration: 2, delay:.25, y:25})
    gsap.from('.home__greeting, .home__name, .home__profession, .home__button',{opacity: 0, duration: 2, delay:.4, y:25, ease:'expo.out', stagger: .2})
    gsap.from('.nav__logo, .nav__toggle',{opacity: 0, duration: 2, delay:.8, y:25, ease:'expo.out', stagger: .2})
    gsap.from('.nav__item',{opacity: 0, duration: 2, delay:1.05, y:25, ease:'expo.out', stagger: .2})
    gsap.from('.home__social-icon',{opacity: 0, duration: 2, delay:1.5, y:25, ease:'expo.out', stagger: .2})
}

/*======================================================
  ROYAL UI ENHANCEMENTS
  Preloader · cursor glow · sliding nav indicator ·
  scroll reveal · animated counters · magnetic buttons ·
  3D tilt cards · hero parallax
======================================================*/

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

/*----- Preloader -----*/
;(function preloaderInit(){
    const preloader = document.getElementById('preloader')
    const fill = document.getElementById('preloaderFill')
    if (!preloader) { playHeroIntro(); return }

    function hidePreloader() {
        preloader.classList.add('is-hidden')
        document.body.classList.remove('is-loading')
        playHeroIntro()
        preloader.addEventListener('transitionend', () => preloader.remove(), { once: true })
    }

    let hidden = false
    function hideOnce() {
        if (hidden) return
        hidden = true
        if (fill) fill.style.width = '100%'
        setTimeout(hidePreloader, 650)
    }

    window.addEventListener('load', hideOnce)
    setTimeout(hideOnce, 2200)
})()

/*----- Cursor glow -----*/
if (isFinePointer && !prefersReducedMotion) {
    const glow = document.getElementById('cursorGlow')
    if (glow) {
        const moveGlowX = gsap.quickTo(glow, 'x', { duration: .6, ease: 'power3.out' })
        const moveGlowY = gsap.quickTo(glow, 'y', { duration: .6, ease: 'power3.out' })

        window.addEventListener('mousemove', (e) => {
            glow.classList.add('is-active')
            moveGlowX(e.clientX)
            moveGlowY(e.clientY)
        })

        document.addEventListener('mouseleave', () => glow.classList.remove('is-active'))
    }
}

/*----- Sliding gold nav indicator -----*/
const navIndicator = document.getElementById('nav-indicator')

function updateNavIndicator() {
    if (!navIndicator) return
    const active = document.querySelector('.nav__link.active-link')
    if (!active) {
        navIndicator.classList.remove('is-active')
        return
    }
    navIndicator.style.left = active.offsetLeft + 'px'
    navIndicator.style.width = active.offsetWidth + 'px'
    navIndicator.style.top = (active.offsetTop + active.offsetHeight + 6) + 'px'
    navIndicator.classList.add('is-active')
}

window.addEventListener('load', updateNavIndicator)
window.addEventListener('resize', updateNavIndicator)
navLink.forEach(n => n.addEventListener('click', () => setTimeout(updateNavIndicator, 60)))

/*----- Scroll reveal -----*/
const revealEls = document.querySelectorAll('.reveal')

revealEls.forEach((el) => {
    const parent = el.parentElement
    const siblings = parent ? Array.from(parent.children).filter(c => c.classList.contains('reveal')) : [el]
    const idx = siblings.indexOf(el)
    el.style.transitionDelay = prefersReducedMotion ? '0ms' : `${Math.min(idx, 5) * 90}ms`
})

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible')
                observer.unobserve(entry.target)
            }
        })
    }, { threshold: .15, rootMargin: '0px 0px -60px 0px' })

    revealEls.forEach(el => revealObserver.observe(el))
} else {
    revealEls.forEach(el => el.classList.add('is-visible'))
}

/*----- Animated stat counters -----*/
const counterEls = document.querySelectorAll('.about_number[data-count]')

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0
    const suffix = el.getAttribute('data-suffix') || ''
    const duration = 1400
    const start = performance.now()

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        el.textContent = Math.floor(eased * target) + suffix
        if (progress < 1) requestAnimationFrame(tick)
        else el.textContent = target + suffix
    }
    requestAnimationFrame(tick)
}

if (counterEls.length) {
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target)
                    observer.unobserve(entry.target)
                }
            })
        }, { threshold: .4 })
        counterEls.forEach(el => counterObserver.observe(el))
    } else {
        counterEls.forEach(el => {
            const target = el.getAttribute('data-count')
            const suffix = el.getAttribute('data-suffix') || ''
            el.textContent = target + suffix
        })
    }
}

/*----- Magnetic buttons -----*/
if (isFinePointer && !prefersReducedMotion) {
    document.querySelectorAll('.magnetic').forEach((el) => {
        const moveX = gsap.quickTo(el, 'x', { duration: .5, ease: 'power3.out' })
        const moveY = gsap.quickTo(el, 'y', { duration: .5, ease: 'power3.out' })
        const scale = gsap.quickTo(el, 'scale', { duration: .4, ease: 'power3.out' })

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect()
            const relX = e.clientX - (rect.left + rect.width / 2)
            const relY = e.clientY - (rect.top + rect.height / 2)
            moveX(relX * .35)
            moveY(relY * .5)
        })

        el.addEventListener('mouseenter', () => scale(1.04))

        el.addEventListener('mouseleave', () => {
            moveX(0)
            moveY(0)
            scale(1)
        })
    })
}

/*----- 3D tilt cards -----*/
if (isFinePointer && !prefersReducedMotion) {
    function initTilt(selector, maxDeg) {
        document.querySelectorAll(selector).forEach((el) => {
            const rotateX = gsap.quickTo(el, 'rotateX', { duration: .6, ease: 'power3.out' })
            const rotateY = gsap.quickTo(el, 'rotateY', { duration: .6, ease: 'power3.out' })
            const lift = gsap.quickTo(el, 'y', { duration: .6, ease: 'power3.out' })

            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect()
                const px = (e.clientX - rect.left) / rect.width
                const py = (e.clientY - rect.top) / rect.height
                rotateY((px - .5) * maxDeg * 2)
                rotateX((.5 - py) * maxDeg * 2)
                lift(-6)
            })

            el.addEventListener('mouseleave', () => {
                rotateX(0)
                rotateY(0)
                lift(0)
            })
        })
    }

    initTilt('.tilt', 7)
    initTilt('.tilt-soft', 3)
}

/*----- Hero photo parallax tilt -----*/
if (isFinePointer && !prefersReducedMotion) {
    const homeSection = document.getElementById('home')
    const homeImg = homeSection ? homeSection.querySelector('.home__img img') : null

    if (homeSection && homeImg) {
        const tiltX = gsap.quickTo(homeImg, 'rotateX', { duration: .8, ease: 'power3.out' })
        const tiltY = gsap.quickTo(homeImg, 'rotateY', { duration: .8, ease: 'power3.out' })

        homeSection.addEventListener('mousemove', (e) => {
            const rect = homeSection.getBoundingClientRect()
            const px = (e.clientX - rect.left) / rect.width
            const py = (e.clientY - rect.top) / rect.height
            tiltY((px - .5) * 14)
            tiltX((.5 - py) * 10)
        })

        homeSection.addEventListener('mouseleave', () => {
            tiltX(0)
            tiltY(0)
        })
    }
}

