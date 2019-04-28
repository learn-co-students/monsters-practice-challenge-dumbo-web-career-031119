//PageStartUp
//-loadMonsters
const monDiv = document.getElementById('monster-container')
const getMonsters = mPage => {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${mPage}`)
        .then(mResponse => mResponse.json())
        .then(mArray => {
            monDiv.innerHTML = ''
            mArray.forEach(element => {
                postMonster(element)
            });
        })
}

const postMonster = monster => {
    // console.log(monster)
    monDiv.innerHTML = `
    <div data-id=${monster.id}>
        <h2>${monster.name}</h2>
        <h4>${monster.age}</h4>
        <p>${monster.description}</p>
    </div>
    ` + monDiv.innerHTML
}
getMonsters(1)

//-makeMonsterForm
const monSubmit = (event) => {
    event.preventDefault()
    // console.log(event.target.name.value)
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: event.target.name.value,
            age: event.target.age.value,
            description: event.target.desc.value
        })
    }).then(resp => resp.json()).then(postMonster)
}

const formDiv = document.getElementById('create-monster')

const newMonsterForm = () => {
    const newForm = document.createElement('form')
    newForm.innerHTML = `
    <input id='monName' name='name' type="text" placeholder="Name">
    <input id='monAge' name='age' type="text" placeholder="Age">
    <input id='monDesc' name='desc' type="text" placeholder="Description">
    <button type="submit">Submit</button>
    `
    formDiv.append(newForm)
    newForm.addEventListener('submit', monSubmit)
}
newMonsterForm()

formDiv.addEventListener('submit', monSubmit)









// // - When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.
// // // // - Above your list of monsters, you should have a form to create a new monster. You should have fields for name, age, and description, and a 'Create Monster Button'. When you click the button, the monster should be added to the list and saved in the API.
// // - At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.