'use strict';

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.share-bts')) {
        var shareBts = document.querySelector('.share-bts'),
            shareBtsTopDistance = window.scrollY + shareBts.getBoundingClientRect().top,
            tocContainer = document.querySelector('#toc-container'),
            tocContainerDistance = window.scrollY + tocContainer.getBoundingClientRect().top;
        fixedElementsOnScroll(shareBts, shareBtsTopDistance);
        fixedElementsOnScroll(tocContainer, tocContainerDistance);
    }

    hljs.initHighlightingOnLoad();

    function fixedElementsOnScroll(element, elementTop) {
        var scrollYPos = window.scrollY,
            aboutAuthor = document.getElementsByClassName('about-author')[0],
            aboutAuthorTopDistance = window.scrollY + aboutAuthor.getBoundingClientRect().top,
            elementFixedSpaceFromTop = 30,
            extraSpaceBeforeBottomStop = 130;

        if (scrollYPos > aboutAuthorTopDistance - extraSpaceBeforeBottomStop) {
            element.classList.remove('fixed-element');
            return false;
        } else if ((scrollYPos + elementFixedSpaceFromTop) > elementTop) {
            element.classList.add('fixed-element');
        } else {
            element.classList.remove('fixed-element');
        }
    }

    if (document.getElementsByClassName('single-post')[0]) {
        window.addEventListener('scroll', function() {
            fixedElementsOnScroll(shareBts, shareBtsTopDistance);
            fixedElementsOnScroll(tocContainer, tocContainerDistance);
        });
    }

    if (document.querySelector('.share-bts')) {
        var $tocContainer = document.querySelector('#toc-container'),
            contentToMap = [
                '.single-post__content h1',
                '.single-post__content h2',
                '.single-post__content h3',
                '.single-post__content h4',
                '.single-post__content h5',
                '.single-post__content h6'
            ],
            contents = gajus.Contents({
                articles: document.querySelectorAll(contentToMap.join(', '))
            });

        $tocContainer.appendChild(contents.list());

        contents.eventEmitter().on('ready', function() {
            var tocLinks = $tocContainer.querySelectorAll('a');
            [].map.call(tocLinks, function(link) {
                link.setAttribute('data-scroll', '');
            });
            smoothScroll.init();
        });

        contents.eventEmitter().on('change', function(data) {
            if (data.previous) {
                data.previous.article.classList.remove('active');
                data.previous.guide.classList.remove('active');
            }

            data.current.article.classList.add('active');
            data.current.guide.classList.add('active');
        });
    }

});
