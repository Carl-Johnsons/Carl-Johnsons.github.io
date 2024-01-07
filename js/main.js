const HEADER = document.querySelector("header");
const NAV_BAR = HEADER.querySelector(".nav-bar");
const menuBtn = HEADER.querySelector("header .menu-btn");
const collapseItems = HEADER.querySelectorAll("li.collapse");

let menuBtnToggle = false;


const menu_collaspe_item = document.createElement("div");
menu_collaspe_item.classList = "menu-dropdown w-100";
const ul = document.createElement("ul");
ul.classList = "no-padding list-style-type-none d-flex flex-direction-col";
menu_collaspe_item.append(ul);
NAV_BAR.append(menu_collaspe_item);

hide(menu_collaspe_item)

window.addEventListener("resize", () => {
    let isMdSize = window.matchMedia("(min-width: 768px)").matches;
    if (isMdSize) {
        menuBtn.classList.remove("active");
        hide(menu_collaspe_item)
    }
});
menuBtn.addEventListener("click", (e) => {
    console.log("clicked");
    menuBtnToggle = !menuBtnToggle;
    if (menuBtnToggle) {
        menuBtn.classList.add("active");
        show(menu_collaspe_item)
    } else {
        menuBtn.classList.remove("active");
        hide(menu_collaspe_item)
    }
});


for (const item of collapseItems) {
    const html = item?.innerHTML;

    if (html) {
        const li = document.createElement("li");
        li.classList = "w-100 d-flex justify-content-end";
        li.innerHTML = html;
        li.children[0].style = "width:100%; text-align:right";
        ul.append(li);
        continue;
    }
    const divider = createMenuDivider();
    menu_collaspe_item.append(divider);
}

function show(ele) {
    if (ele.classList.contains("d-none")) {
        ele.classList.remove("d-none")
    }
}
function hide(ele) {
    if (!ele.classList.contains("d-none")) {
        ele.classList.add("d-none")
    }
}
function createMenuDivider() {
    const div = document.createElement("div");
    div.classList = "divider bg-light-gray";
    return div;
}