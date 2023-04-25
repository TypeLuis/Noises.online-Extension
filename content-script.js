// Removes all of the unnecessary elements
const removeElements = () => {
    const removeOneElement = (id) => {
        const el = document.getElementById(id)
        el.remove()
    }
    const removeOneElementClass = (className) => {
        const el = document.getElementsByClassName(className)[0]
        el.remove()
    }
    const RemoveMultipleElements = (className) => {
        const els = document.getElementsByClassName(className)
        while (els[0]) els[0].parentNode.removeChild(els[0]) // removes all element with that className
    }
    const removeShare = () => {
        const controlSection = document.getElementsByClassName('ctrSection')[0]
        const controlImages = controlSection.getElementsByClassName('ctrlImg pTn')
        controlImages[controlImages.length - 1].remove()
    }

    removeShare() // removes share from control section
    document.getElementsByClassName('group')[2].remove() // removes User Sets
    removeOneElement('myWarning') // warning Page
    removeOneElementClass('sectionFirst') // Welcome to noises
    removeOneElementClass('sectionLast') // footer
    RemoveMultipleElements('anchor') // anchorclass
    RemoveMultipleElements('section') // usage & tips && more Noises
    removeOneElement('postit') // pick of the week
    removeOneElement('paymentOverlay') // payment overlay
    removeOneElement('title') // main title
    removeOneElement('hamburger') // Hamburger icon
    removeOneElement('myNav') // Navagation after hamburger click
    removeOneElement('radioTouch') // radioTouch div
    removeOneElement('msg2') // removes "⋮"
}


// gets computated height of each element then sets minHeight style that was set by website into combine height. This way the height of tile1 isn't exccesive.
const fixTile1 = () => {
    const controlSectionHeight = parseInt(getComputedStyle(document.getElementsByClassName('ctrSection')[0]).height)

    const messageHeight = parseInt(getComputedStyle(document.getElementById('msg')).height)

    const iconSetHeight = parseInt(getComputedStyle(document.getElementById('iconSet')).height)

    const tile1 = document.getElementsByClassName('tile1')[0]

    tile1.style.minHeight = `${controlSectionHeight + messageHeight + iconSetHeight}px`
}


// changes body to center contents , makes sound list 6 per row, removes extra height and darkens background
const fixBody = () => {
    document.body.style.width = '500px'
    document.body.style.height = 'max-content'
    document.body.style.margin = 'auto'
    document.body.style.color = 'white'
    document.body.style.background = 'black'
}


// promise function that waits for element to appear
const waitForElm = (selector) => {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}


// creates mouse events
const triggerMouseEvent = (node, eventType) => {
    const clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent(eventType, true, true);
    node.dispatchEvent(clickEvent);
}


// list of iconsets Ids
// liveliness = index 38 - 44;  tone = index 30 - 37;  Lastline = index 24 - 29;  FirstLine = index 0 - 5
const iconSet = [
    'aa', 'ab', 'ac', 'ad', 'ae', 'ba',
    'bb', 'bc', 'bd', 'be', 'ca', 'cb',
    'cc', 'cd', 'ce', 'cf', 'cg', 'da',
    'db', 'dc', 'dd', 'ea', 'fa', 'fb',
    'ga', 'gb', 'ha', 'ia', 'ib', 'ic',
    'eq0', 'eq1', 'eq2', 'eq3', 'eq4', 'eq5', 'eq6', 'eq7',
    'mo0', 'mo3', 'mo1', 'mo2', 'mo4', 'mo5', 'mo6'
]

// function calls
removeElements()
fixTile1()
fixBody()

// Uses wait for element function to scale first iconSet and mouses over
waitForElm('#aa').then((elm) => {
    console.log('Element is ready');

    const mouseFunction = () => {
        elm.style.transform = "scale(1.2)"

        elm.addEventListener('mouseover', function () {
            console.log('Event triggered');
        });

        const event = new MouseEvent('mouseover', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });

        elm.dispatchEvent(event);
    }

    mouseFunction()

});


// keydown event listener
let index = 0
window.addEventListener("keydown", async function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    // function that delays code
    const delay = ms => new Promise(res => setTimeout(res, ms));

    // reverts old element scale
    const oldElm = (index) => {
        const oldElm = document.getElementById(iconSet[index])
        oldElm.style.transform = "scale(1)"
    }

    // function that mouseOver elements and increase their scale
    const newElm = (index) => {
        const elm = document.getElementById(iconSet[index])

        elm.style.transform = "scale(1.2)"


        elm.addEventListener('mouseover', function () {
        });

        const event = new MouseEvent('mouseover', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });

        elm.dispatchEvent(event);
    }

    // function that simulates mouse click
    const clickElement = (element) => {
        triggerMouseEvent(element, "mouseover");
        triggerMouseEvent(element, "mousedown");
        triggerMouseEvent(element, "mouseup");
        triggerMouseEvent(element, "click");
    }

    //function that simulates holding mouse click for 3 seconds (turns off iconSet sounds)
    const holdClickElement = async (index) => {
        const targetNode = document.getElementById(iconSet[index]);
        triggerMouseEvent(targetNode, "mouseover");
        triggerMouseEvent(targetNode, "mousedown");
        await delay(3000);
        triggerMouseEvent(targetNode, "mouseup");
        triggerMouseEvent(targetNode, "click");
    }

    const currentElement = document.getElementById(iconSet[index]);

    const checkActive = () => {
        if (index >= 30 && index <= 37 && !currentElement.classList.contains('tone')) currentElement.style.opacity = '0.2'
        if (index >= 38 && index <= 44 && !currentElement.classList.contains('liveliness')) currentElement.style.opacity = '0.2'
    }

    const switchActive = () => {
        const tone = document.getElementsByClassName('tone')[0]
        const liveliness = document.getElementsByClassName('liveliness')[0]
        if (index >= 30 && index <= 37 && currentElement.classList.contains('tone')) return
        else if (index >= 30 && index <= 37 && !currentElement.classList.contains('tone')) {
            if (tone) tone.classList.remove("tone");
            currentElement.classList.add("tone");
        }

        if (index >= 38 && index <= 44 && currentElement.classList.contains('liveliness')) return
        else if (index >= 38 && index <= 44 && !currentElement.classList.contains('liveliness')) {
            if (liveliness) liveliness.classList.remove("liveliness");
            currentElement.classList.add("liveliness");
        }
    }

    switch (event.key) {
        case "ArrowDown":
            // code for "down arrow" key press.
            oldElm(index)

            checkActive()

            if (index >= 24 && index <= 29) index = 30
            else if (index >= 30 && index <= 37) index = 38
            else if (index >= 38 && index <= 44) index = 0
            else index += 6

            await delay(250);
            newElm(index)
            break;
        case "ArrowUp":
            // code for "up arrow" key press.
            oldElm(index)

            checkActive()

            if (index >= 0 && index <= 5) index = 38
            else if (index >= 38 && index <= 44) index = 30
            else if (index >= 30 && index <= 37) index = 24
            else index -= 6

            await delay(250);
            newElm(index)
            break;
        case "ArrowLeft":
            // code for "left arrow" key press.
            oldElm(index)

            checkActive()

            if (index === 0) index = iconSet.length - 1
            else index -= 1

            await delay(250);
            newElm(index)

            break;
        case "ArrowRight":

            oldElm(index)

            checkActive()

            if (iconSet.length - 1 === index) index = 0
            else index += 1

            await delay(250);
            newElm(index)

            // code for "right arrow" key press.
            break;
        case "Enter":
            switchActive()


            clickElement(currentElement)
            // code for "Enter" key press.
            break;
        case " ":
            switchActive()

            await holdClickElement(index)

            // code for "Space" key press.
            break;

        case "PageDown":
            const volDown = document.getElementsByClassName('ctrlImg pTn')[0]
            clickElement(volDown)
            // code for "PageDown" key press.
            break;
        case "PageUp":
            const volUp = document.getElementsByClassName('ctrlImg pTn')[1]
            clickElement(volUp)
            // code for "Pageup" key press.
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);