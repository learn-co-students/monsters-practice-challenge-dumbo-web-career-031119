document.addEventListener("DOMContentLoaded", () => {
  let pageNumber = 1;

  createMonsterForm();
  fetchMonsters(pageNumber);

  backButton.addEventListener("click", (event) => {
    if (pageNumber === 1) {
      alert("Ain't no monsters here")
    }
    else {
      pageNumber--;
      fetchMonsters(pageNumber);
    }
  })

  forwardButton.addEventListener("click", (event) => {
    pageNumber++;
    fetchMonsters(pageNumber);
  })

  monsterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/monsters`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        Accept:'application/json'
      },
      body:
        JSON.stringify({name:nameField.value,
        age:ageField.value,
        description:bioField.value})

    })
    .then(monsterForm.reset())
  })
})

const monsterFormDiv = document.getElementById("create-monster");
const monstersContainer = document.getElementById("monster-container");
const backButton = document.getElementById('back');
const forwardButton = document.getElementById('forward');
const newMonsterButton = document.createElement('button');
const monsterForm = document.createElement('form');
const nameField = document.createElement('input'),
  ageField = document.createElement('input'),
  bioField = document.createElement('input');

const fetchMonsters = (pageNumber) => {
  monstersContainer.innerHTML = ""
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
  .then(resp => resp.json())
  .then(monsters => monsters.forEach(createMonsterCard));
}

// const get50Monsters = () => {
//
// }

const createMonsterCard = (monster) => {
  let monsterCard = document.createElement('div'),
  monsterName = document.createElement('h2'),
  monsterAge = document.createElement('h4'),
  monsterBio = document.createElement('p');

  monsterName.innerText = monster.name
  monsterAge.innerText = `Age: ${monster.age}`
  monsterBio.innerText = `Bio: ${monster.description}`

  monsterCard.appendChild(monsterName)
  monsterCard.appendChild(monsterAge)
  monsterCard.appendChild(monsterBio)

  monstersContainer.appendChild(monsterCard)
}

const createMonsterForm = () => {
  nameField.id = "name"
  ageField.id = 'age'
  bioField.id = 'description'

  nameField.placeholder = 'name...'
  ageField.placeholder = 'age...'
  bioField.placeholder = 'description...'

  newMonsterButton.innerText = 'Submit'

  monsterForm.appendChild(nameField)
  monsterForm.appendChild(ageField)
  monsterForm.appendChild(bioField)
  monsterForm.appendChild(newMonsterButton)

  monsterFormDiv.appendChild(monsterForm)
}
