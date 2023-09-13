const imagensDoBanner = [
    "../src/banner2.png",
    "../src/banner1.png",
];

const containerBanner = document.querySelector("section", ".poster");

let currentImageIndex = 0;

function trocarImagem() {

    setTimeout(function () {

        containerBanner.classList.add("active");

        containerBanner.style.backgroundImage = `url(${imagensDoBanner[currentImageIndex]})`;

        currentImageIndex = (currentImageIndex + 1) % imagensDoBanner.length;


    }, 8000);

    containerBanner.classList.remove("active");
}

setInterval(trocarImagem, 5000);

trocarImagem();
