navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 0) {
        navbar.classList.add('bg-slate-900');
        navbar.classList.remove('bg-slate-950');
    } else {
        navbar.classList.add('bg-slate-950');
        navbar.classList.remove('bg-slate-900');
    }
});