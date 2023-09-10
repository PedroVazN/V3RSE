const scroolBySearch = document.querySelector("#scroolBySearch")
let classScrool = "container-search"

function scroll_to_element_by_class(className) {
    const element = document.querySelector(`.${className}`);
    if (element) {
        window.scroll({
            top: element.offsetTop,
            behavior: "smooth",
        });
    }
}

scroolBySearch.addEventListener('click', function() {
    scroll_to_element_by_class(classScrool)
})