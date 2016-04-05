document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    if (document.getElementsByClassName('single-post')[0]) {
        var shareBts = document.getElementsByClassName('share-bts')[0];
        var aboutAuthor = document.getElementsByClassName('about-author')[0];

        // Get elements positions relative to the top of the viewport
        var aboutAuthorTop = window.scrollY + aboutAuthor.getBoundingClientRect().top;
        var shareBtTop = window.scrollY + shareBts.getBoundingClientRect().top;

        window.addEventListener('scroll', function() {
            if (window.scrollY > (aboutAuthorTop - shareBts.offsetHeight - 130)) {
                return false;
            } else if ((window.scrollY + 58) > shareBtTop) {
                shareBts.style.top = ((window.scrollY - shareBtTop) + shareBts.offsetHeight + 50) + 'px';
            } else {
                shareBts.style.top = '85px';
            }
        });
    }
});
