console.log('%c HI', 'color: firebrick')

let breeds = [];
// challenge 1: On page load, fetch images, parse response ans JSON, add image elements to the DOM for each image in the array
// challenge 2: On page load, fetch all the dog breeds, add the breeds to the page in a <ul>
// challenge 3: Once all the breeds are rendered in the <ul>, add JS so that the font color of a particular <li> changes on click. This can be any color.
// challenge 4: Once we are able to load all of the dog breeds onto the page, add JS so that the user can filter breeds that start with a particular letter using the drop down

// on page load, load the images and breed options:
document.addEventListener('DOMContentLoaded', function() {
  loadImages();
  loadBreedOptions();
})

// fetch the images 
function loadImages() {
  fetch("https://dog.ceo/api/breeds/image/random/4") 
    .then(resp => resp.json())
    .then(results => {
      results.message.forEach(image => addImage(image))
    });  
}

// adds a new image element inside the dog-image-container
function addImage(dogPicURL) {
  let cotainer = document.querySelector('#dog-image-container');
  let newImageEl = document.createElement('img');
  newImageEl.src = docPicUrl;
  container.appendChild(newImageEl);
}

// fetch the breed options
function loadBreedOptions() {
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp => resp.json())
    .then(results => {
      breeds = Object.keys(results.message);
      updateBreedList(breeds);
      addBreedSelectListener();
    })
}

// adds the loaded breeds to the ul
function updateBreedList(breeds) {
  let ul = document.querySelector('#dog-breeds');
  removeChildren(ul);
  breeds.forEach(breed => addBreed(breed));
}

function removeChildren(element) {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function selectBreedStartingWith(letter) {
  updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
  let breedDropdown = document.querySelector('#breed-dropdown');
  breedDropdown.addEventListener('change', function (event) {
    selectBreedStartingWith(event.target.value);
  });
}

function addBreed(breed) {
  let ul = document.querySelector('#dog-breeds');
  let li = document.createElement('li');
  li.innerText = breed;
  li.style.cursor = 'pointer';
  ul.appendChild(li);
  li.addEventListener('click', updateColor);
}

function updateColor(event) {
  event.target.style.color = 'darkgreen';
}