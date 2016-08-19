/*Not supported by Safari*/

$(function() {
    var template;
    var old = document.getElementById('wrapp');
    var zzzz = document.getElementById('nearest-newImage');

    if (window.File && window.FileList && window.FileReader)
        newTemplate();
    else
        alert("Your browser version low then needs so it dosn't support FileReader.");

    function newTemplate() {
        var wrapp = document.getElementById('wrapp');
        template = wrapp.cloneNode(true);
        Init();
    }

    function Init() {
        var fileSelect = document.getElementById('file-select'),
            fileDrag = document.getElementById('image-select');

        fileSelect.addEventListener('change', fileSelectFunc);
        fileDrag.addEventListener('drop', fileSelectFunc);
        fileDrag.addEventListener('dragover', dragOverFunc);
        fileDrag.addEventListener('dragleave', dragOverFunc);
    }

    function dragOverFunc(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.className = (e.type == 'dragover' ? 'hover' : '');
    }

    function fileSelectFunc(e) {
        e.stopPropagation();
        e.preventDefault();
        var file = e.target.files || e.dataTransfer.files;
        if (file[0].type.match('image/*'))
            ParseFile(file[0]);
        else
            e.target.className = '';
    }

    function ParseFile(f) {
        var view = document.createElement('div'),
            span = document.createElement('span');
        var wrap = document.getElementById('image-wrapp'),
            text = document.getElementById('text-wrapp');

        wrap.className = "select";

        view.id = 'image-view';
        wrap.appendChild(view);

        span.innerHTML = 'Uploading...';
        text.children[0].style.opacity = 0;
        text.insertBefore(span, text.children[1]);

        ShowImage(f);
    }

    function ShowImage(f) {
        var reader = new FileReader();

        reader.onload = (function() {
            return function(e) {
                var container = document.createElement('div'),
                    img = document.createElement('div'),
                    line = document.createElement('div');
                var view = document.getElementById('image-view');

                container.className = 'image';

                img.style.backgroundImage = 'url(' + e.target.result + ')';
                container.appendChild(img);

                line.className = 'line';

                line.addEventListener("webkitAnimationEnd", AnimationEnd, false);
                line.addEventListener("animationend", AnimationEnd, false);
                line.addEventListener("oanimationend", AnimationEnd, false);

                view.appendChild(container);
                view.appendChild(line);
            }
        })(f);

        reader.readAsDataURL(f);
    }

    function AnimationEnd() {
        var check = document.createElement('div'),
            next = document.createElement('div'),
            load = document.createElement('span');
        var wrap = document.getElementById('image-wrapp'),
            text = document.getElementById('text-wrapp'),
            view = document.getElementById('image-view');

        check.innerHTML = '<svg viewBox="0 0 50 50">' +
            '<polyline points="15,25 23,31 33,15"/>' +
            '</svg>';
        check.id = 'check';
        view.appendChild(check);

        load.innerHTML = 'Upload complete!';
        text.children[1].style.opacity = 0;
        text.insertBefore(load, text.children[2]);

        next.className = 'button next';
        next.innerHTML = 'Next file';
        next.addEventListener('click', nextImage, false);
        wrap.appendChild(next);
    }

    function nextImage() {
    	
        var old = document.getElementById('wrapp');
        old.addEventListener("webkitTransitionEnd", New, false);
        old.addEventListener("transitionend", New, false);
        old.addEventListener("oTransitionEnd", New, false);
        old.style.top = '200%';
        zzzz.appendChild(template);
    }

    function New() {
        zzzz.removeChild(this);
        newTemplate();
    }

});