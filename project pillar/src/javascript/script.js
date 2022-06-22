function nav_toggle() {
  let toggle = document.getElementById("toggle");
  let link = document.getElementById("nav-links");
  toggle.classList.toggle("toggle-active");

  if (link.className === "nav-links-disable") {
    link.classList.remove("nav-links-disable");
    link.classList.add("nav-links-active");
  } else {
    link.classList.remove("nav-links-active");
    link.classList.add("nav-links-disable");
  }
}

let img = document.querySelectorAll("img");
// console.log(img);
const width = 0;
function wresize() {
  let hero = document.querySelectorAll(".section-wrapper");
  for (let i = 0; i < hero.length; i++) {
    const element = hero[i];
    element.style.height = `${window.outerHeight}px`;
    console.log(element);
  }
}

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
  if (document.body.scrollTop > 15 || document.documentElement.scrollTop > 15) {
    document.getElementById("nav").style.top = "0";
  } else {
    document.getElementById("nav").style.top = "-80px";
  }
}
