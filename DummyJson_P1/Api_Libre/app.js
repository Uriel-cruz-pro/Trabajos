const loadBreedsBtn = document.getElementById("loadBreeds");
const breedList = document.getElementById("breedList");
const dogImage = document.getElementById("dogImage");
const breedTitle = document.getElementById("breedTitle");

loadBreedsBtn.addEventListener("click", () => {
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(data => {
            breedList.innerHTML = "";
            const breeds = Object.keys(data.message);

            breeds.forEach(breed => {
                const li = document.createElement("li");
                li.textContent = breed;
                li.addEventListener("click", () => loadImage(breed));
                breedList.appendChild(li);
            });
        });
});

function loadImage(breed) {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(response => response.json())
        .then(data => {
            breedTitle.textContent = breed;
            dogImage.src = data.message;
            dogImage.style.display = "block";
        });
}
