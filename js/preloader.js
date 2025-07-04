window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');

    setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.style.overflow = 'auto';

        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1000);
    }, 2500);
});
