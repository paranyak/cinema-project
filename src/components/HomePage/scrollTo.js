const scrollTo = (params) => {
    const {
        el,
        to,
        duration,
        scrollDir
    } = params;
    const start = el[scrollDir];
    const change = to - start;
    const increment = 20;

    const animateScroll = (elapsedTime) => {
        elapsedTime += increment;
        el[scrollDir] = easeInOut(elapsedTime, start, change, duration);
        if (elapsedTime < duration) {
            setTimeout(() => {
                animateScroll(elapsedTime);
            }, increment);
        }
    };
    animateScroll(0);
};

const easeInOut = (curTime, start, change, duration) => {
    curTime /= duration / 2;
    if (curTime < 1) {
        return change / 2 * curTime * curTime + start;
    }
    curTime -= 1;
    return -change / 2 * (curTime * (curTime - 2) - 1) + start;
};

export default scrollTo;