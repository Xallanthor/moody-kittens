/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault();
  let form = event.target;

  let newKittenName = form.name.value;
  let regName = /^[A-Za-z]+$/;

  let validName = false;

  if (newKittenName !== "") {
    if (!regName.test(newKittenName)) {
        alert("Kittens like normal names.");
        form.focus();
    }
    else{
      validName = true;
    }
}
else{
  alert("Please give the kitten a name.");
  form.focus();
}

if (kittens.find(kitten => kitten.name == newKittenName))
{
  alert(newKittenName + " values their uniqueness and would be upset if you made another of it.");
}

if (validName && !kittens.find(kitten => kitten.name == newKittenName))
{
  let newKittenID = generateId();
  let newKitten = { id: newKittenID, name: newKittenName, mood: "Tolerant", affection: 5};
  kittens.push(newKitten);
  saveKittens();
  drawKittens();
}
form.reset();
}

function removeAllKittens()
{
  let infoLineElement = document.getElementById("infoLine");
  loadKittens();
  let kittenCount = kittens.length;

  if (kittenCount === 1)
  {
    infoLineElement.innerText = "The kitten has been successfully purged.";
  }
  else if (kittenCount > 1)
  {
    infoLineElement.innerText = "All " + kittenCount + " kittens have been successfully purged.";
  }
  else
  {
    infoLineElement.innerText = "No kittens were found to be purged.";
  }

  kittens = [];
  saveKittens();
  
}
/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  for (let i = 0; i < kittens.length; i++)
  {
    setKittenMood(kittens[i]);
  }
  
  window.localStorage.setItem("kittens", JSON.stringify(kittens));
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"));

  if(!kittensData)
  {
    kittens = [];
  }
  else
  {
    kittens = kittensData;
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  loadKittens();
  let kittenListElement = document.getElementById("kittens");
  let kittenTemplate = "";
  kittens.forEach(kitten => { 
    let newKittenImage = 'https://robohash.org/'+ kitten.name + '?set=set4';
    kittenTemplate += `
    <div class="card kitten ${kitten.mood}"">
    <img src="https://robohash.org/'+ ${kitten.name} + '?set=set4" alt="kittenImg">
    <p>Name: ${kitten.name}</h3> \
    <p>Mood: ${kitten.mood}</p> \
    <p>Affection: ${kitten.affection}</p> \
    <button type="button" onclick="pet('${kitten.id}')">PET</button> 
    <button type="button" onclick="catnip('${kitten.id}')" class="btn-secondary">CATNIP</button> 
    </div> \
    `;
  })

  kittenListElement.innerHTML = kittenTemplate;
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let currentKitten = findKittenById(id);
  if (currentKitten)
  {
    let rng = Math.random();
    if (rng > 0.7)
    {
      currentKitten.affection += 1;
    }
    else
    {
      currentKitten.affection -= 1;
    }
    saveKittens();
    drawKittens();
  }
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let currentKitten = findKittenById(id);

  if (currentKitten){
    currentKitten.mood = "Tolerant";
    currentKitten.affection = 5;
    saveKittens();
    drawKittens();
  }

}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  if (kitten.affection > 6)
  {
    kitten.mood = "happy";
  }
  else if (kitten.affection <= 0)
  {
    kitten.mood = "gone";
  }
  else if (kitten.affection <= 3)
  {
    kitten.mood = "angry";
  }
  else if (kitten.affection <= 5)
  {
    kitten.mood = "tolerant";
  }
}

function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("mainHeader").style.visibility = "visible";
  drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
