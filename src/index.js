// Access the list of toys from an API (mocked using JSON Server) and render each of them in a "card" on the page
// Hook up a form that enables users to add new toys. Create an event listener so that, when the form is submitted, the new toy is persisted to the database and a new card showing the toy is added to the DOM
// Create an event listener that gives users the ability to click a button to "like" a toy. When the button is clicked, the number of likes should be updated in the database and the updated information should be rendered to the DOM
let addToy = false;

function updateLikes(id, newNumberOfLikes) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": newNumberOfLikes
    })
  })
}

function cardBuilder(toy) {
  const newCard = document.createElement("div")
  newCard.classList.add("card")
  let h2 = document.createElement("h2");
  h2.textContent = toy.name;

  let img = document.createElement("img");
  img.src= toy.image;
  img.classList.add("toy-avatar");

  let p = document.createElement("p");
  p.textContent = `${toy.likes} Likes`

  let btn = document.createElement("button");
  btn.addEventListener("click", () => {
    p.textContent = `${toy.likes += 1} Likes`
    updateLikes(toy.id, toy.likes)
  })
  
  
  btn.classList.add("like-btn");
  btn.id = toy.id
  btn.textContent = "Like <3"

  newCard.append(h2, img, p, btn)

  document.getElementById("toy-collection").appendChild(newCard);
}



document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then(toys => toys.forEach(toy => cardBuilder(toy)))
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const form = document.querySelector("form.add-toy-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target));
  sendItOut(formData)
})

function sendItOut(newToy) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json"
},
  body: JSON.stringify({
    ...newToy,
    "image": newToy.image,
    "name": newToy.name,
    "likes": 0
})
  })
  .then(r => r.json())
  .then(responseToy => cardBuilder(responseToy))
}
//headers:
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }

// body: JSON.stringify({
//   "name": "Jessie",
//   "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
//   "likes": 0
// })