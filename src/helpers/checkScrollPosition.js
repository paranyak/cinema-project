const checkScrollPosition = (carousel, rBut, lBut) => {
    let carouselWidth = carousel.offsetWidth;
    let scrollWidth = carousel.scrollWidth;

    (carousel.scrollLeft <= 0) ?
        lBut.setAttribute('style', 'display: none') :
        lBut.removeAttribute('style');

    (scrollWidth - carousel.scrollLeft <= carouselWidth) ?
        rBut.setAttribute('style', 'display: none') :
        rBut.removeAttribute('style');
};

export default checkScrollPosition;