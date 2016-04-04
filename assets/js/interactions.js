document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    if (document.getElementsByClassName('single-post')[0]) {
        var shareBts = document.getElementsByClassName('share-bts')[0];
        var singlePosts = document.getElementsByClassName('single-post')[0];

        window.addEventListener('scroll', function() {
            if (window.scrollY - 20 > singlePosts.offsetTop) {
                singlePosts.classList.add('single-post--leftmargin');
                shareBts.classList.add('share-bts--fixed');
            } else {
                singlePosts.classList.remove('single-post--leftmargin');
                shareBts.classList.remove('share-bts--fixed');
            }
        });
    }
});
