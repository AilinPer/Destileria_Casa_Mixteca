
const PageFlip = window.PageFlip;

document.addEventListener('DOMContentLoaded', async function () {
  const container = document.getElementById('demoBookExample');

  const fichas = [
    "cacheton-boyero.html",
    "cempasuchil-gato-madre.html",
    "ensamble-espadilla-pichomel.html",
    "ensamble-papalometl-pichomel.html",
    "espadilla-boyero.html",
    "espadin-gato-madre-50.html",
    "espadin-gato-madre.html",
    "mole-poblano.html",
    "papalometl-boyero.html",
    "papalometl-gato-madre.html",
    "pichomel-boyero.html",
    "tuna-amarilla.html",
    "tuna-roja.html",
    "tuna-sangre.html",
    "tuna-verde.html"
  ];

  for (let ficha of fichas) {
    const response = await fetch("fichas/" + ficha);
    const html = await response.text();

    const page = document.createElement("div");
    page.classList.add("page");
    page.innerHTML = `<div class="page-content">${html}</div>`;
    const contraportada = container.lastElementChild;
    container.insertBefore(page, contraportada)
/*     container.insertBefore(page, container.querySelector(".page-cover-bottom"));
 */  }

  const pageFlip = new St.PageFlip(container, {
    width: 320,
    height: 480,
    size: "stretch",
    autoSize: true,
    showCover: true,
    maxShadowOpacity: 0.3,
    mobileScrollSupport: true
  });

  pageFlip.loadFromHTML(container.querySelectorAll(".page"));

  const total = document.querySelector(".page-total");
  const current = document.querySelector(".page-current");
  const orientation = document.querySelector(".page-orientation");
  const state = document.querySelector(".page-state");

  if (total) total.innerText = pageFlip.getPageCount();
  if (orientation) orientation.innerText = pageFlip.getOrientation();

  const btnPrev = document.querySelector(".btn-prev");
  const btnNext = document.querySelector(".btn-next");

  if (btnPrev) btnPrev.addEventListener("click", () => pageFlip.flipPrev());
  if (btnNext) btnNext.addEventListener("click", () => pageFlip.flipNext());

  pageFlip.on("flip", (e) => {
    if (current) current.innerText = e.data + 1;
  });

  pageFlip.on("changeState", (e) => {
    if (state) state.innerText = e.data;
  });

  pageFlip.on("changeOrientation", (e) => {
    if (orientation) orientation.innerText = e.data;
  });
});
