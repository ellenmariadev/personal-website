//-------SKILLS BUTTON-------//
const btnDev = document.querySelector(".btn-skills.dev");
const btnDesign = document.querySelector(".btn-skills.design");
const designContent = document.querySelector(".designContent");
const devContent = document.querySelector(".devContent");

btnDev.addEventListener("click", () => {
  btnDev.classList.add("active");
  btnDesign.classList.remove("active");
  designContent.classList.add("d-none");
  devContent.classList.remove("d-none");
});

btnDesign.addEventListener("click", () => {
  btnDesign.classList.add("active");
  btnDev.classList.remove("active");
  designContent.classList.remove("d-none");
  devContent.classList.add("d-none");
});

//-------NAVBAR-------//
const options = {
  threshold: 0.45,
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.getAttribute("id");

    if (entry.isIntersecting) {
      document
        .querySelector(`nav li a[href="#${id}"]`)
        .classList.add("nav-scrolled");
    } else {
      document
        .querySelector(`nav li a[href="#${id}"]`)
        .classList.remove("nav-scrolled");
    }
  });
}, options);

const sections = document.querySelectorAll("main, section");
sections.forEach((section) => {
  observer.observe(section);
});

const navigationHeight = document.querySelector("header").offsetHeight;
document.documentElement.style.setProperty(
  "--scroll-padding",
  navigationHeight - 1 + "px"
);

//-------API GITHUB-------//
const div = document.querySelector(".repositories");
function getApiGitHub(page = 1) {
  fetch(
    `https://api.github.com/users/ellenmariadev/repos?per_page=100&page=${page}`
  )
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }

      let data = await res.json();

      const ids = new Set([628838841, 590686251, 585282403, 666896337]);

      data = data.filter((item) => ids.has(item.id));

      data.map((item) => {
        let content = document.createElement("div");

        content.innerHTML = ` <div class="repo">
                <ul class="repo-ul">
                    <li class="repo-li">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    </li>
                </ul>
                <ul class="tags">
                <li><a href="${item.homepage}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-link"></i> DEMO</a></li>
                <li><a href="${item.html_url}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> CODE</a></li>
                </ul>
            </div>`;

        div.append(content);
      });
      if (data.length === 100) {
        getApiGitHub(page + 1);
      }
    })
    .catch((e) => console.log(e));
}

getApiGitHub();

//-------REMOVE HASH-------//
window.onload = function () {
  const navMenu = document.querySelectorAll("nav a");

  navMenu.forEach((link) => {
    link.addEventListener(
      "click",
      () => {
        setTimeout(() => {
          removeHash();
        });
      },
      5
    );
  });
};

function removeHash() {
  history.replaceState("", document.title, window.location.pathname);
}
