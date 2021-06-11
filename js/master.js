// toggle open + spin class for opening settings box + rotation
document
  .querySelector(".fa-cog")
  .addEventListener("click", function toggleSettings() {
    this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
  });

//////////////////////////////////////////////////////////////////////////////////  Random Background Start
let landingPage = document.querySelector(".landing-page");
let imgArray = ["00", "01", "02", "03", "04"];

let randomNumber;

let backgroundOption = localStorage.getItem("background_option") || true;
let backgroundInterval;

function randomizeImgs() {
  if (backgroundOption && backgroundOption !== "false") {
    document
      .querySelector(".random-background span.yes")
      .classList.add("active");
    backgroundInterval = setInterval(() => {
      randomNumber = Math.floor(Math.random() * imgArray.length);
      landingPage.style.backgroundImage =
        'url("../imgs/0' + randomNumber + '.jpg")';
    }, 1000);
  } else {
    document
      .querySelector(".random-background span.no")
      .classList.add("active");
    clearInterval(backgroundInterval);
  }
}

document
  .querySelector(".random-background span.active")
  .classList.remove("active");

document.querySelectorAll(".random-background span").forEach((span) => {
  span.addEventListener("click", function x(e) {
    e.target.parentElement
      .querySelector(".random-background span.active")
      .classList.remove("active");
    e.target.classList.add("active");

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

//////////////////////////////////////////////////////////////////////////////////  Random Background End

//////////////////////////////////////////////////////////////////////////////////  change color start

let mainColor = localStorage.getItem("color_option");

function setActiveColor() {
  const savedColor = mainColor || "#ff9800";
  document.querySelectorAll(".color-list li").forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.color === savedColor) {
      li.classList.add("active");
    }
  });
}

if (mainColor) {
  document.documentElement.style.setProperty("--main-color", mainColor);
}

// change color

// document.querySelectorAll(".color-list li").forEach((li) => {
//   li.addEventListener("click", function x(e) {
//     const color = e.target.dataset.color;

//     // alert(color);
//     document.documentElement.style.setProperty("--main-color", color);
//     localStorage.setItem("color_option", color);
//     setActiveColor();
//   });
// });

// alternative better way

document.querySelector(".color-list").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const color = e.target.dataset.color;
    document.documentElement.style.setProperty("--main-color", color);
    localStorage.setItem("color_option", color);
    mainColor = localStorage.getItem("color_option");
    // debugger;
    setActiveColor();
  }
});

//////////////////////////////////////////////////////////////////////////////////  change color End
randomizeImgs();

setActiveColor();

//
document.querySelector("#testOffset").addEventListener("click", (e) => {
  let skillsOffsetTop = skills.offsetTop;

  // Skills outer Height
  let skillsOuterHeight = skills.offsetHeight;

  // Window Height
  const windowHeight = this.innerHeight;

  // Window Scroll TOp
  const windowScrollTop = this.pageYOffset;

  console.log("skills Offset Top: " + skillsOffsetTop);
  console.log("outer Height: " + skillsOuterHeight);
  console.log("Window Height: " + windowHeight);
  console.log("window Scroll Top: " + windowScrollTop);
});

let skills = document.querySelector(".skills");
window.addEventListener("scroll", function () {
  // alert(this);

  // Skills Offset TOp
  let skillsOffsetTop = skills.offsetTop;

  // Skills outer Height
  let skillsOuterHeight = skills.offsetHeight;

  // Window Height
  const windowHeight = this.innerHeight;

  // Window Scroll TOp
  const windowScrollTop = this.pageYOffset;

  // check if skills reached
  if (
    windowScrollTop >
    skillsOffsetTop + skillsOuterHeight - windowHeight - windowHeight / 4
  ) {
    // console.log("skills reached");
    document.querySelectorAll(".skill-progress span").forEach((skill) => {
      skill.style.width = skill.dataset.progress + "%";
    });
  }
});

// Gallery Start
document.querySelectorAll(".img-box img").forEach((img) => {
  img.addEventListener("click", () => {
    /* Create overlay Element Start */
    const overlay = document.createElement("div");
    overlay.className = "gallery-overlay";
    document.body.appendChild(overlay);
    /* Create overlay Element End */

    /* Create popup box Start */
    const popupBox = document.createElement("div");
    popupBox.className = "popup-overlay";

    const imgHeading = document.createElement("h3");

    const imgHeadingText = document.createTextNode(img.alt) || "";
    imgHeading.appendChild(imgHeadingText);

    popupBox.appendChild(imgHeading);

    const popupImg = document.createElement("img");
    popupImg.src = img.src;

    popupBox.appendChild(popupImg);
    document.body.appendChild(popupBox);

    const closeBtn = document.createElement("span");
    closeBtn.textContent = "X";
    closeBtn.className = "close-btn";
    popupBox.appendChild(closeBtn);

    /* Create popup box End */
  });
});
document.addEventListener("click", (e) => {
  // debugger;
  if (e.target.className == "close-btn") {
    e.target.parentNode.remove();
    document.querySelector(".gallery-overlay").remove();
  }
});
// Gallery End
