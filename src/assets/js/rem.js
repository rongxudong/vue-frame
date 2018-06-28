/**
 * PC端适配rem
 * 1rem：100px
 * @param {Object} _D
 */
(function(win) {
    let doc = win.document;
    let docEl = doc.documentElement;
    let tid;

    function refreshRem() {
        let width = docEl.getBoundingClientRect().width;
        if (width > 1920) { // 最大宽度
            width = 1920;
        }
        let rem = width / 19.2;
        docEl.style.fontSize = rem + 'px';
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    refreshRem();

})(window);