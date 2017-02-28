var noteCount = 1;

//create new toDo list
function createToDo() {
    var main = document.getElementById("to-do");
    var toDo = main.cloneNode(true);
    toDo.id = "to-do-" + noteCount;
    toDo.getElementsByClassName("to-do-title")[0].value = '';
    toDo.getElementsByClassName("to-do-input")[0].value = '';
    toDo.style.display = "block";
    noteCount++;
    document.getElementById("to-do-area").appendChild(toDo);
    document.getElementById(toDo.id).style.backgroundColor = '#00c4ff';
}

//get "i"th parent node of an element
function getParent(elem, i) {
    while (i > 0) {
        elem = elem.parentNode;
        i--;
    }
    return elem;
}

//info button function
function closeDescription(mainID) {
    console.log(mainID);
    var description = document.getElementById(mainID).getElementsByClassName("to-do-input")[0];
    var button = document.getElementById(mainID).getElementsByClassName("expand-btn")[0];
    if (description.style.display == "none") {
        description.style.display = "block";
        button.src = "Info_96px_1.png";
    }
    else {
        description.style.display = "none";
        button.src = "Info_96px.png";
    }
}

//handles color palette show/hide
function paletteShow(mainID) {
    document.getElementById(mainID).getElementsByClassName("color-palette")[0].style.display = "block";
    document.getElementById(mainID).getElementsByClassName("color-change")[0].src = "Paint%20Palette_96px_1.png";
}

function paletteHide(mainID) {
    document.getElementById(mainID).getElementsByClassName("color-palette")[0].style.display = "none";
    document.getElementById(mainID).getElementsByClassName("color-change")[0].src = "Paint%20Palette_96px.png";
}

//color palette options can make changes
function changeColor(mainID, color) {
    document.getElementById(mainID).style.backgroundColor = color;
}

//handles most hover effects
function hoverChange(element, source) {
    element.setAttribute('src', source);
}

//crosses out text
function crossOut(mainID) {
    var checkMark = document.getElementById(mainID).getElementsByClassName("check-mark")[0];
    var txtArea = "#" + mainID + " textarea";
    if (checkMark.getAttribute('src') == "Ok_96px_1.png") {
        checkMark.src = "Ok_96px_2.png";
        $(txtArea).wrap('<s></s>');
    }
    else {
        checkMark.src = "Ok_96px_1.png";
        $(txtArea).unwrap();
    }
}

//deletes toDo
function removeToDo(mainID) {
    if (confirm('Are you sure you want to delete this note?')) {
        var parentElem = document.getElementById(mainID).parentNode;
        parentElem.removeChild(document.getElementById(mainID));
    }
}

//make elements dragable
interact('.to-do-item').draggable({
    // enable inertial throwing
    inertia: true, // keep the element within the area of it's parent
    restrict: {
        restriction: "parent"
        , endOnly: true
        , elementRect: {
            top: 0
            , left: 0
            , bottom: 1
            , right: 1
        }
    }, // enable autoScroll
    autoScroll: true, // call this function on every dragmove event
    onmove: dragMoveListener, // call this function on every dragend event
    onend: function (event) {
        var textEl = event.target.querySelector('p');
        textEl && (textEl.textContent = 'moved a distance of ' + (Math.sqrt(event.dx * event.dx + event.dy * event.dy) | 0) + 'px');
    }
});

function dragMoveListener(event) {
    var target = event.target, // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
        , y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    // translate the element
    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}
// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;
//resize function
interact('.to-do-item').draggable({
    onmove: window.dragMoveListener
}).resizable({
    //preserveAspectRatio: true,
    edges: {
        left: true
        , right: true
        , bottom: true
        , top: true
    }
}).on('resizemove', function (event) {
    var target = event.target
        , x = (parseFloat(target.getAttribute('data-x')) || 0)
        , y = (parseFloat(target.getAttribute('data-y')) || 0);
    // update the element's style
    target.style.width = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';
    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;
    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
});