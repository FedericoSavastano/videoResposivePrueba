// JSONP Fetching
let script = document.createElement('script');
script.src =
    'https://jovial-elion-3a9d86.netlify.app/.netlify/functions/videos?format=jsonp';
document.body.appendChild(script);

// JSONP Fetching callback function
function processResponse(obj) {
    if (obj.data) {
        renderTitle(obj.data);
        renderMainVideo(obj.data.videos[0]);
        renderRelatedVideo(obj.data.videos);
    }

    if (obj.error) {
        console.log(obj.error.message);
        renderError();
    }
}

const title = document.querySelector('.main-title__container');
const mainVideo = document.querySelector('.video-main__container');
const relatedVideosList = document.querySelector('.video-related__list');
const generalContainerForError = document.querySelector('.videos__container');

const renderTitle = function (data) {
    const html = `
    <h1 class="main-title">${data.title}</h1>
    `;
    title.insertAdjacentHTML('beforeend', html);
};

const renderMainVideo = function (data) {
    const html = `
    <div class="video-main__element">
    <ul class="video-main__overlay">
        <li class="video-main__logo-container overlay__element--left">
            <div class="video-main__logo">
                <div class="circle"></div>
                <div class="triangle-right"></div>
            </div>
        </li>

        <li class="video-main__title-container overlay__element--left">

            <h4 class="video-main__title">${data.title}
            </h4>
        </li>

        <li class="video-main__date-container overlay__element--left">

            <p class="video-main__date">${data.date}</p>

        </li>

        <li class="video-main__link-container overlay__element--left">
            <a class="video-main__link" href="${data.link.url}">Visit Fund</a>
        </li>


        <li class="video-main__time-container overlay__element--right">

            <p class="video-main__time">${data.time}</p>

        </li>

    </ul>
    <img class="video-main__img" src="${data.image.url}" alt="foto">
</div>
    `;
    mainVideo.insertAdjacentHTML('beforeend', html);
};

const renderRelatedVideo = function (data) {
    data.shift();

    data.forEach((element) => {
        const html = `
        <li class="video-related__element">
        <div class="video-related__wrapper">
            <div class="video-related__preview">
    
                <ul class="video-related__overlay">
    
                    <li class="video-related__logo-container">
                        <div class="video-related__logo  video-related-overlay__element--left">
                            <div class="video-related__logo__circle"></div>
                            <div class="video-related__logo__triangle-right"></div>
                        </div>
                    </li>
    
                    <li class="video-related__title-container video-related-overlay__element--left">
                        <h4 class="video-related__title">${element.title}</h4>
                    </li>
    
                    <li class="video-related__time-container video-related-overlay__element--left">
                        <p class="video-related__time">${element.time}</p>
                    </li>
    
                </ul>
    
                <img class="video-related__img" src="${element.image.url}" alt="foto">
    
            </div>
    
    
            <div class="video-related__text">
                <h4 class="video-related__subtitle">${element.description}</h4>
                <p class="video-related__date">${element.date}</p>
                <a class="video-related__link" href="">${element.link.url}</a>
            </div>
        </div>
    </li>
    
        `;

        relatedVideosList.insertAdjacentHTML('beforeend', html);
    });
};

const renderError = function () {
    const html = `
    <h1 class="main-title">Something Went Wrong, try again later</h1>
    `;
    generalContainerForError.insertAdjacentHTML('beforeend', html);
};
