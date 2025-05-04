const NAV_BAR = document.querySelector(".main-item");
const NAV_NAMES = [
  "aisaev-erzhan",
  "_hello",
  "_about-me",
  "_projects",
  "contact-me",
];
const classesNames = [
  "header__logo",
  "header__hello",
  "header__about",
  "header__projects",
  "header__contacts",
];
const LOGO_PAGE = document.querySelector(".logo");
const HELLO_PAGE = document.querySelector(".hello");
const ABOUT_PAGE = document.querySelector(".about-me");
const PROJECTS_PAGE = document.querySelector(".projects");
const CONTACTS_PAGE = document.querySelector(".contacts");

//------------------->[[[Header-nav creater loop]]]
for (let i = 0; i < NAV_NAMES.length; i++) {
  const ELEMENTS = document.createElement("a");
  ELEMENTS.setAttribute("class", `item-box ${classesNames[i]}`);
  NAV_BAR.appendChild(ELEMENTS);
  ELEMENTS.textContent = NAV_NAMES[i];
}
//------------------->[[[variable creater array]]]
const varCreater = {};
const varClass = (variable, clsName) => {
  varCreater[variable] = document.querySelector(clsName);
};
varClass("LOGO_PAGE_BTN", ".header__logo");
varClass("HELLO_PAGE_BTN", ".header__hello");
varClass("ABOUT_PAGE_BTN", ".header__about");
varClass("PROJECTS_PAGE_BTN", ".header__projects");
varClass("CONTACTS_PAGE_BTN", ".header__contacts");

//------------------->[[[Nav choose btn]]]
const list = document.querySelectorAll(`.nav .item-box`);
list.forEach((item) => {
  item.addEventListener("click", (e) => {
    list.forEach((el) => {
      el.classList.remove("active");
    });
    item.classList.add("active");
    varCreater.LOGO_PAGE_BTN.classList.remove("active");
  });
});

//------------------->[[[assign a hidden values to all pages]]]
const HIDDEN = () => {
  [LOGO_PAGE, HELLO_PAGE, ABOUT_PAGE, PROJECTS_PAGE, CONTACTS_PAGE].forEach(
    (page) => (page.style.display = "none")
  );
};

//------------------->[[[assign a visible value to the selected page]]]
function visible(el) {
  HIDDEN();
  el.style.display = "flex";
}
const pageButtons = [
  {button: varCreater.LOGO_PAGE_BTN, action: () => location.reload() },
  {button: varCreater.HELLO_PAGE_BTN, action: () => visible(HELLO_PAGE) },
  {button: varCreater.ABOUT_PAGE_BTN, action: () => visible(ABOUT_PAGE) },
  {button: varCreater.PROJECTS_PAGE_BTN, action: () => visible(PROJECTS_PAGE)},
  {button: varCreater.CONTACTS_PAGE_BTN, action: () => visible(CONTACTS_PAGE)},
];
pageButtons.forEach(({ button, action }) => {
  button.addEventListener("click", action);
});

//------------------->[[[typing animation]]]
const typeWriter = (text, elementId, speed) => {
  let index = 0;
  const element = document.getElementById(elementId);
  const type = () => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  };
  type();
};
//------------------->[[[variables for inset]]]
const insetGroup = (baseKey, classPrefix) => {
  const suffixes = [
    ["", ""],
    ["_INSET_ACTIVE", "-active"],
    ["_INSET_ACTIVE_IN_PAGE", "-active-in-page"],
    ["_INSET_ACTIVE_IN_PAGE_HELPER", "-active-in-page-helper"],
  ];
  suffixes.forEach(([keySuffix, classSuffix]) => {
    varClass(`${baseKey}${keySuffix}`, `${classPrefix}${classSuffix}`);
  });
};
insetGroup(
  "ABOUT_PAGE_NAV_PERSONAL",
  ".about-me__nav__side-bar__personal-info__inset"
);
insetGroup(
  "ABOUT_PAGE_NAV_CONTACTS",
  ".about-me__nav__side-bar__contacts__inset"
);
insetGroup(
  "PROJECTS_PAGE_NAV_INSET",
  ".projects__nav__side-bar__project__inset"
);
insetGroup(
  "PROJECTS_PAGE_NAV_INSET_ACTIVE",
  ".projects__nav__side-bar__project__inset-active"
);
insetGroup(
    "CONTACTS_PAGE_NAV_INSET",
    ".contacts__nav__side-bar__contacts__inset"
);
insetGroup(
    "FIND_ME_PAGE_NAV_INSET",
    ".contacts__nav__side-bar__find-me__inset"
);

//------------------->[[[main insets]]]
const config = {
  personal: {key: "ABOUT_PAGE_NAV_PERSONAL", className: "about-me__nav__side-bar__personal-info"},
  contacts: {key: "ABOUT_PAGE_NAV_CONTACTS",className: "about-me__nav__side-bar__contacts"},
  projects: {key: "PROJECTS_PAGE_NAV_INSET",className: "projects__nav__side-bar__project"},
  contactsPage: {key: "CONTACTS_PAGE_NAV_INSET",className: "contacts__nav__side-bar__contacts"},
  findMe: {key: "FIND_ME_PAGE_NAV_INSET",className: "contacts__nav__side-bar__find-me"},
};
const toggleInset = (type, action = "toggle") => {
  const { key, className } = config[type];
  const method =action === "add" ? "add" : action === "remove" ? "remove" : "toggle";
  varCreater[key].classList[method]("active");
  varCreater[`${key}_INSET_ACTIVE`].classList[method](`${className}__inset-active--on`);
  varCreater[`${key}_INSET_ACTIVE_IN_PAGE`].classList[method](`${className}__inset-active-in-page--on`); 
  method === "toggle" ? (varCreater[`${key}_INSET_ACTIVE_IN_PAGE_HELPER`].textContent = varCreater[key].textContent): "";
};
Object.keys(config).forEach((type) => {
  varCreater[config[type].key].addEventListener("click", () => toggleInset(type));
});
document.querySelectorAll(".close-icon-btn").forEach((btn) => {
  const type = btn.dataset.type;
  config[type] ? btn.addEventListener("click", () => toggleInset(type, "remove")): "";
});

//------------------->[[[inset for personal-info insets]]]
varClass("ABOUT_PAGE_NAV_PERSONAL_INSET_ACTIVE_ELEMENT_BIO", ".bio");
varClass("ABOUT_PAGE_NAV_PERSONAL_INSET_ACTIVE_ELEMENT_INTERESTS",".interests");
varClass("ABOUT_PAGE_NAV_PERSONAL_INSET_ACTIVE_ELEMENT_EDU", ".edu");

varCreater.ABOUT_PAGE_NAV_PERSONAL_INSET_ACTIVE_ELEMENT_BIO.addEventListener("click",() => {
    varCreater.ABOUT_PAGE_NAV_PERSONAL_INSET_ACTIVE_ELEMENT_BIO.classList.toggle("active");
  }
);
varCreater.ABOUT_PAGE_NAV_PERSONAL_INSET_ACTIVE_ELEMENT_INTERESTS.addEventListener("click",() => {
    varCreater.ABOUT_PAGE_NAV_PERSONAL_INSET_ACTIVE_ELEMENT_INTERESTS.classList.toggle("active");
  }
);

varCreater.ABOUT_PAGE_NAV_PERSONAL_INSET_ACTIVE_ELEMENT_EDU.addEventListener(
  "click",
  () => {
    varCreater.ABOUT_PAGE_NAV_PERSONAL_INSET_ACTIVE_ELEMENT_EDU.classList.toggle(
      "active"
    );
    const eduInset = document.querySelector(
      ".about-me__nav__side-bar__personal-info__inset-active--pages--edu"
    );
    eduInset.classList.toggle(
      "about-me__nav__side-bar__personal-info__inset-active--pages--edu-active"
    );
  }
);
//should revision ^^^^

//------------------->[[[projects]]]
const projects = ["HTML", "CSS", "JavaScript", "React"];
projects.forEach((lang, index) => {
  const projectsItem = document.createElement("span");
  const projectsInput = document.createElement("label");
  const projectsCheckbox = document.createElement("input");
  const projectsIcon = document.createElement("span");
  //--\/
  projectsItem.textContent = lang;
  projectsInput.classList.add("projects__nav__side-bar__project__inset-active--check");
  //--\/
  projectsCheckbox.type = "checkbox";
  projectsCheckbox.value = lang;
  //--\/
  projectsIcon.style = `background: no-repeat url(./src/img/${lang}.png); opacity: .4; width: 25px; height: 25px; background-size: contain;`;
  varCreater.PROJECTS_PAGE_NAV_INSET_ACTIVE.appendChild(projectsInput);
  projectsInput.append(projectsCheckbox, projectsIcon, projectsItem);
});

const selectedTechs = new Set();
const checkboxes = document.querySelectorAll(
  ".projects__nav__side-bar__project__inset-active--check input"
);
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      selectedTechs.add(checkbox.value);
    } else {
      selectedTechs.delete(checkbox.value);
    }
    renderFilteredProjects();
  });
});

//------------------->[[[projects creater loop]]]
const projectsDisplay = [
  {
    name: "lean-group",
    titleTemplate: "Project",
    title: "// _lean-group",
    link: "https://aiserzhan.github.io/Lean-Group/",
    text: "Lean group",
    lang: ["HTML", "CSS"],
  },
  {
    name: "guest-house",
    titleTemplate: "Project",
    title: "// _guest-house",
    link: "https://aiserzhan.github.io/guest-house/",
    text: "Guest House",
    lang: ["HTML", "CSS"],
  },
  {
    name: "portfolio",
    titleTemplate: "Project",
    title: "// _portfolio",
    link: "https://aiserzhan.github.io/frontend-project/",
    text: "test1",
    lang: ["HTML", "CSS"],
  },
  {
    name: "todolist",
    titleTemplate: "Project",
    title: "// _todo-list",
    link: "https://aiserzhan.github.io/todo-list/",
    text: "todoList",
    lang: ["JavaScript"],
  },
  {
    name: "css-icons",
    titleTemplate: "Project",
    title: "// _css-icons",
    link: "https://aiserzhan.github.io/icons-css/",
    text: "Styled icons",
    lang: ["HTML", "CSS"],
  },

  {
    name: "template",
    titleTemplate: "Project",
    title: "// _login-js",
    link: "https://aiserzhan.github.io/loginjs-localstorage/#",
    text: "Login JS",
    lang: ["JavaScript"],
  },
  {
    name: "template",
    titleTemplate: "Project",
    title: "// _random-user",
    link: "https://aiserzhan.github.io/randomUser/",
    text: "Random user API",
    lang: ["JavaScript"],
  },
];
const pdCont = document.createElement("div");
pdCont.classList.add("projects__items");
const renderFilteredProjects = () => {
  pdCont.innerHTML = "";
  projectsDisplay.forEach((project, index) => {
    if (
      selectedTechs.size === 0 ||
      project.lang.some((lang) => selectedTechs.has(lang))
    ) {
      const pdBox = document.createElement("div");
      const pdLink = document.createElement("a");
      const pdDescript = document.createElement("span");
      const pdBoxTitle = document.createElement("span");
      const pdBoxTitleSec = document.createElement("span");
      //----\/
      pdBox.classList.add("projects__items--box");
      pdLink.href = project.link;
      pdLink.target = "_blank";
      pdBox.style = `background: top / contain no-repeat url(./src/img/${project.name}.png)`;
      //----\/
      pdBoxTitle.id = "boxTitle";
      pdBoxTitleSec.id = "boxTitleSec";
      //----\/
      pdBoxTitle.textContent = `${project.titleTemplate} ${index + 1}`;
      pdBoxTitleSec.textContent = project.title;
      pdDescript.textContent = project.text;
      pdLink.textContent = "view-project";
      //----\/
      pdCont.appendChild(pdBox);
      pdBox.append(pdLink, pdBoxTitle, pdBoxTitleSec, pdDescript);
    }
  });
  PROJECTS_PAGE.appendChild(pdCont);
};

const inputEffect = {
    name: { id: 'formName', inpId: 'formNameInp' },
    email: { id: 'formEmail', inpId: 'formEmailInp' },
    massage: { id: 'formMassage', inpId: 'formMassageInp' },
    date: { id: 'formDate' }
  }
  
  Object.values(inputEffect).forEach(({ id, inpId }) => {
    const display = document.getElementById(id)
  
    if (inpId) {
      const input = document.getElementById(inpId)
      if (display && input) {
        input.addEventListener('input', () => {
          display.textContent = input.value
        })
      }
    } else if (id === 'formDate' && display) {
      const today = new Date()
      const formattedDate = today.toLocaleDateString('ru-RU')
      display.textContent = formattedDate
    }
  })
  

//------------------->[[[window onload]]]
window.onload = () => {
  const typewriterData = [
    {text: "Hi all. I am", element: "typewriter__hi", delay: 0},
    {text: "Aisaev Erzhan", element: "typewriter__name", delay: 2000},
    {text: "> Front-end developer", element: "typewriter__info", delay: 4000},
    {text: "// complete the game to continue", element: "info__text--first", delay: 7500},
    {text: "// you can also see it on my Github page", element: "info__text--second", delay: 7500},
    {text: "const", element: "info__text--git--const", delay: 13500},
    {text: "githubLink", element: "info__text--git--git", delay: 14500},
    {text: "=", element: "info__text--git--symbol", delay: 16000},
    {text: "“https://github.com/AisErzhan”", element: "info__text--git--link", delay: 16500},
  ];

  HIDDEN();
  renderFilteredProjects();
  HELLO_PAGE.style.display = "flex";
  varCreater.HELLO_PAGE_BTN.classList.add("active");
  typewriterData.forEach(({ text, element, delay }) => {
    setTimeout(() => typeWriter(text, element, 150), delay);
  });
};

