const HEADER = document.querySelector("header");
const NAV_BAR = HEADER.querySelector(".nav-bar");
const menuBtn = HEADER.querySelector("header .menu-btn");
const collapseItems = HEADER.querySelectorAll("li.collapse");

let menuBtnToggle = false;

menuBtn.addEventListener("click", (e) => {
    console.log("clicked");
    menuBtnToggle = !menuBtnToggle;
    if (menuBtnToggle) {
        menuBtn.classList.add("bg-gray");
    } else {
        menuBtn.classList.remove("bg-gray");
    }
});

const menu_collaspe_item = document.createElement("div");
menu_collaspe_item.classList = "w-100";
const ul = document.createElement("ul");
ul.classList = "list-style-type-none d-flex flex-direction-col";
menu_collaspe_item.append(ul);
NAV_BAR.append(menu_collaspe_item);

for (const item of collapseItems) {
    const link = item.querySelector("a");
    let trimText;

    if (link?.innerText) {
        const li = document.createElement("li");
        li.classList = "w-100";
        trimText = removeExtraSpace(link?.innerText);
        const anchor = createAnchorTag(trimText, "#");
        li.append(anchor);
        ul.append(li);
        continue;
    }

    const divider = createMenuDivider();
    menu_collaspe_item.append(divider);

    console.log("|" + trimText + "|" + (trimText?.length || 0));
}

function createAnchorTag(text, href) {
    const anchor = document.createElement("a");
    anchor.classList = "text-decoration-none clr-black font-size-22px";
    anchor.href = href;
    anchor.innerText = text;
    return anchor;
}

function createMenuDivider() {
    const div = document.createElement("div");
    div.classList = "divider bg-light-gray";
    return div;
}


function removeExtraSpace(str) {
    if (!str)
        return;
    str = str.replace("\n", "").trim();
    //Remove sequential extra space
    str = str.replaceAll(/\s+/g, " ");
    return str;
}