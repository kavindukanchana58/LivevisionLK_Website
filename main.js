const projectData = {
  "project-1": {
    category: "EVENT PRODUCTION",
    title: "Live Event Moments",
    description: "Professional event coverage created to capture the energy, emotion and atmosphere of a memorable live event.",
    image: "images/project-1.jpg"
  },
  "project-2": {
    category: "AERIAL PRODUCTION",
    title: "Above The Frame",
    description: "Aerial visuals that bring a completely different perspective to the story and create a cinematic sense of scale.",
    image: "images/project-2.jpg"
  },
  "project-3": {
    category: "MULTI-CAMERA",
    title: "Every Angle Captured",
    description: "Multi-camera production built around smooth coverage, creative angles and important moments.",
    image: "images/project-3.jpg"
  },
  "project-4": {
    category: "CINEMATIC VISUALS",
    title: "Stories In Motion",
    description: "Visual storytelling designed to turn real moments into memorable cinematic experiences.",
    image: "images/project-4.jpg"
  }
};

const pageLoader = document.getElementById("pageLoader");
const siteHeader = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const modal = document.getElementById("projectModal");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

window.addEventListener("load", () => {
  setTimeout(() => pageLoader.classList.add("loaded"), 450);
});

window.addEventListener("scroll", () => {
  siteHeader.classList.toggle("scrolled", window.scrollY > 30);
});

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.innerHTML = isOpen
    ? '<i class="ri-close-line"></i>'
    : '<i class="ri-menu-4-line"></i>';
});

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="ri-menu-4-line"></i>';
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

function openProject(projectId) {
  const project = projectData[projectId];
  if (!project) return;

  modalImage.src = project.image;
  modalImage.alt = project.title;
  modalCategory.textContent = project.category;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProject() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll(".project-view").forEach(button => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    openProject(button.dataset.project);
  });
});

document.querySelectorAll("[data-close-modal]").forEach(element => {
  element.addEventListener("click", closeProject);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeProject();
});

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll("img").forEach(img => {
  img.addEventListener("error", () => {
    img.classList.add("image-missing");
  });
});
