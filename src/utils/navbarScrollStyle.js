export const navbarScrollStyle = (navbar, container = null) => {
    if(!container){
        navbar.current.classList.add('navbar-scrolled')
    } else {
        const observer = new IntersectionObserver(function(entries){
            entries.forEach(entry => {
                if(!entry.isIntersecting){
                    navbar.current.classList.add('navbar-scrolled')
                } else {
                    navbar.current.classList.remove('navbar-scrolled')
                }
            })
        }, {})
        observer.observe(container)
    }
}