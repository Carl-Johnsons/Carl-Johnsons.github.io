
document.addEventListener("DOMContentLoaded", () => {
    main();
});

function main() {
    const BACKGROUND_CIRCLE = "background-circle-";
    const DEFAULT_BACKGROUND_CIRCLE = -1;
    const INNER_CIRCLE_BORDER_WIDTH = "inner-circle-border-width-";
    const DEFAULT_BORDER_WIDTH = "10px";
    const INNER_CIRCLE_BORDER_COLOR = "inner-circle-border-color-";
    const DEFAULT_BORDER_COLOR = "black";
    let backgroundCircles = document.querySelectorAll(`[class*='${BACKGROUND_CIRCLE}']`);

    for (let backgroundCircle of backgroundCircles) {
        minValue = Math.min(backgroundCircle.offsetWidth, backgroundCircle.offsetHeight);

        let eleClassList = backgroundCircle.classList;
        console.log(eleClassList)
        let innerCircles = getClassValue(eleClassList, BACKGROUND_CIRCLE, DEFAULT_BACKGROUND_CIRCLE);
        // Edge case: if not found
        if (innerCircles === DEFAULT_BACKGROUND_CIRCLE) {
            continue;
        }
        let innerCircleBorderWidth = getClassValue(eleClassList, INNER_CIRCLE_BORDER_WIDTH, DEFAULT_BORDER_WIDTH);
        innerCircleBorderWidth = parseInt(innerCircleBorderWidth.match(/\d+/g));

        let innerCircleBorderColor = getClassValue(eleClassList, INNER_CIRCLE_BORDER_COLOR, DEFAULT_BORDER_COLOR);

        minValue -= (innerCircleBorderWidth * 2);
        let margin = (minValue / innerCircles);
        let innerCircleValue = minValue;
        for (let i = 0; i < innerCircles; i++) {
            let div = generateEle("div", "inner-circle pos-absolute position-center");
            div.style.width = `${innerCircleValue}px`;
            div.style.height = `${innerCircleValue}px`;
            div.style.borderWidth = `${innerCircleBorderWidth}px`;
            div.style.borderStyle = "solid";
            div.style.borderColor = innerCircleBorderColor;
            div.style.borderRadius = "50%";

            backgroundCircle.append(div);
            innerCircleValue -= margin;
        }
        new ResizeObserver(function () {
            updateInnerCircleWidth(backgroundCircle, Math.min(backgroundCircle.offsetWidth, backgroundCircle.offsetHeight) - (innerCircleBorderWidth * 2));
        }).observe(backgroundCircle);
    }
}

/*
Edge case: 
    "inner-circle-border-width"
    "inner-circle-border-width-"
    ""
*/
function getClassValue(elementClassList, prefixClassName, defaultValue) {
    let value = Array.from(elementClassList).find(className => className.startsWith(prefixClassName));

    if (!value) {
        value = `${prefixClassName}${defaultValue}`;
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