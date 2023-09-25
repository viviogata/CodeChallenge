// Calculate the number of buttons and conditions (mobile or desktop)
document.addEventListener("DOMContentLoaded", () => {
    let viewportWidth = window.screen.width;
    let carousel = '';
    let items = '';
    let totalPages = 0;
    let itemPerPage = 0;
    let widthItem = 0;

    function resizeWidth(size) {
        if (size < 768) {
            console.log('pequeno');
            carousel = document.querySelector('.slider-mobile');
            items = document.querySelectorAll('.slider-mobile .slide-group');
            itemPerPage = 1;
            totalPages = items.length;
            widthItem = 388;
        } else {
            console.log('grande');
            carousel = document.querySelector('.slider-desktop');
            items = document.querySelectorAll('.slider-desktop .slide-item');
            itemPerPage = 4;
            totalPages = Math.ceil(items.length / itemPerPage);
            widthItem = 100;
        }
    }
    
    // Every time you change the screen resolution, the function will be activated
    window.addEventListener('resize', () => {
        viewportWidth = window.innerWidth;
        resizeWidth(viewportWidth);
    });

    resizeWidth(viewportWidth);
    
    // Slide - Logic for building the slider
        const pagination = document.querySelector('.slide-pagination');
        let currentIndex = 0;

        function showSlide(index) {
            const offset = -index * widthItem; // Width of each "div"
            carousel.style.transform = `translateX(${offset}px)`;
    
            pagination.innerHTML = '';
    
            for (let i = 0; i < totalPages; i++) {
                const page = document.createElement('button');
                page.classList.add('page');
                pagination.appendChild(page);
                page.addEventListener('click', () => {
                    goToPage(i);
                });
            }
    
            const pages = document.querySelectorAll('.page');
            pages[index / itemPerPage].classList.add('active');
        }

        function nextSlide() {
            currentIndex = (currentIndex + itemPerPage) % items.length;
            showSlide(currentIndex);
        }
    
        function goToPage(page) {
            currentIndex = page * itemPerPage;
            showSlide(currentIndex);
        }
        
        showSlide(0);
        setInterval(nextSlide, 7000);
});
