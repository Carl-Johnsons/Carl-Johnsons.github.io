document.addEventListener("DOMContentLoaded", () => {
    main();
});

function main() {
    const BACKGROUND_CIRCLE = ["background-min-circle-", "background-max-circle-"];
    const DEFAULT_BACKGROUND_CIRCLE = 0;
    const BACKGROUND_CIRCLE_COLOR = "background-circle-color-";
    const DEFAULT_BACKGROUND_CIRCLE_COLOR = "red";
    const INNER_CIRCLE_BORDER_WIDTH = "inner-circle-border-width-";
    const DEFAULT_BORDER_WIDTH = "10px";
    const INNER_CIRCLE_BORDER_COLOR = "inner-circle-border-color-";
    const DEFAULT_BORDER_COLOR = "black";
    let backgroundCircles = document.querySelectorAll(BACKGROUND_CIRCLE.map(prefix => `[class*='${prefix}']`).join(','));

    for (let backgroundCircle of backgroundCircles) {

        let eleClassList = backgroundCircle.classList;
        let innerCircles = getClassValue(eleClassList, DEFAULT_BACKGROUND_CIRCLE, ...BACKGROUND_CIRCLE);
        // Edge case: if not found
        if (innerCircles === DEFAULT_BACKGROUND_CIRCLE) {
            continue;
        }
        let backgroundCircleColor = getClassValue(eleClassList, DEFAULT_BACKGROUND_CIRCLE_COLOR, BACKGROUND_CIRCLE_COLOR);
        let innerCircleBorderWidth = getClassValue(eleClassList, DEFAULT_BORDER_WIDTH, INNER_CIRCLE_BORDER_WIDTH);
        innerCircleBorderWidth = parseInt(innerCircleBorderWidth.match(/\d+/g));

        let innerCircleBorderColor = getClassValue(eleClassList, DEFAULT_BORDER_COLOR, INNER_CIRCLE_BORDER_COLOR);
        let isMin = false;
        eleClassList.forEach(className => {
            if (className.startsWith(BACKGROUND_CIRCLE[0])) {
                isMin = true;
            }
        })

        let value;
        value = isMin ?
            Math.min(backgroundCircle.offsetWidth, backgroundCircle.offsetHeight)
            : Math.max(backgroundCircle.offsetWidth, backgroundCircle.offsetHeight);
        value -= (innerCircleBorderWidth * 2);
        let margin = (value / innerCircles);
        let innerCircleValue = value;
        // Set up the background
        backgroundCircle.style.overflow = "hidden";
        backgroundCircle.style.backgroundColor = backgroundCircleColor;
        for (let i = 0; i < innerCircles; i++) {
            let div = generateEle("div", "inner-circle pos-absolute position-center");
            div.style.width = `${innerCircleValue}px`;
            div.style.height = `${innerCircleValue}px`;
            div.style.borderWidth = `clamp(1px, 2vw, ${innerCircleBorderWidth}px)`;
            div.style.borderStyle = "solid";
            div.style.borderColor = innerCircleBorderColor;
            div.style.borderRadius = "50%";

            backgroundCircle.append(div);
            innerCircleValue -= margin;
        }
        new ResizeObserver(function () {
            let value = isMin ?
                Math.min(backgroundCircle.offsetWidth, backgroundCircle.offsetHeight)
                : Math.max(backgroundCircle.offsetWidth, backgroundCircle.offsetHeight);
            updateInnerCircleWidth(backgroundCircle, value - (innerCircleBorderWidth * 2));
        }).observe(backgroundCircle);
    }
}

/*
Edge case: 
    "inner-circle-border-width"
    "inner-circle-border-width-"
    ""
*/
function getClassValue(elementClassList, defaultValue, ...prefixClassNames) {
    let value = Array.from(elementClassList).find(
        function (className) {
            for (let prefix of prefixClassNames) {
                if (className.startsWith(prefix)) return true;
            }
            return false;
        });

    if (!value) {
        value = `${prefixClassNames[0]}${defaultValue}`;
    }
    value = getLastElement(value, "-");
    // inner-circle-border-width- this testcase need a second time validation
    if (!value) {
        value = defaultValue;
    }
    return value;
}
function getLastElement(str, seperator) {
    let splitArray = str.split(seperator);
    return splitArray[splitArray.length - 1]
}

function updateInnerCircleWidth(div, value) {
    let innerCircles = div.querySelectorAll(".inner-circle");
    let margin = (value / innerCircles.length);
    for (let innerCircle of innerCircles) {
        innerCircle.style.width = `${value}px`;
        innerCircle.style.height = `${value}px`;
        value -= margin;
    }
}
function generateEle(tag, className) {
    let element = document.createElement(tag);
    element.classList = className;
    return element
}