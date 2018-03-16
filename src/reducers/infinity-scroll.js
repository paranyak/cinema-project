let currentPage = 1;

//json-server ./data.json

const getQuotesAPI = () => {
    console.log("LOCAL");
    return 'http://localhost:3000/datas/?_page=' + currentPage + '&_limit=30';
};

/**
 Process the data returned from the api
 **/
const processData = res => {
    console.log("PROCESS DATA", res);
    res.json()
        .then(news => {
            currentPage++;
            news.forEach(renderNews);
        });
};

/**
 Render each news on to the view
 **/
const renderNews = (news) => {
    console.log(news);
    const li = document.createElement('li');
    li.innerHTML = `${news.id} - ${news.title}`;
    scrollElem.appendChild(li);
};

/**
 check if the user is scrolling down by
 previous scroll position and current scroll position
 **/
const isUserScrollingDown = (positions) => {
    return positions[0].sT < positions[1].sT;
};

/** Check if the scroll position at required
 percentage relative to the container
 **/
const isScrollExpectedPercent = (position, percent) => {
    return ((position.sT + position.cH) / position.sH) > (percent / 100);
};


const scrollElem = document.getElementById('infinite-scroller');
const scrollEvent$ = Rx.Observable.fromEvent(scrollElem, 'scroll');


/**
 Stream logic
 **/
const userScrolledDown$ = scrollEvent$
    .map(e => ({
        sH: e.target.scrollHeight,
        sT: e.target.scrollTop,
        cH: e.target.clientHeight
    }))
    .pairwise()
    .filter(positions => {
        return isUserScrollingDown(positions) && isScrollExpectedPercent(positions[1], 90)
    });

const requestOnScroll$ =
    userScrolledDown$
        .startWith([])
        .exhaustMap(() => Rx.Observable.fromPromise(fetch(getQuotesAPI())))

/**
 Subscribe and apply effects
 **/
requestOnScroll$.subscribe(processData);