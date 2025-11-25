# script.js
function loadImages(folder, targetId) {
fetch(`${folder}/list.json`)
.then(res => res.json())
.then(files => {
const container = document.getElementById(targetId);
files.forEach(file => {
const div = document.createElement("div");
div.className = "item";
div.style.backgroundImage = `url(${folder}/${file})`;
div.draggable = true;


div.addEventListener("dragstart", e => {
e.dataTransfer.setData("text/plain", `${folder}/${file}`);
});


container.appendChild(div);
});
});
}


// Load images for each tier
loadImages("images/unranked", "unranked");
loadImages("images/s-tier", "s-tier");
loadImages("images/a-tier", "a-tier");
loadImages("images/b-tier", "b-tier");
loadImages("images/c-tier", "c-tier");


// Drag & Drop
const tiers = document.querySelectorAll('.items');
tiers.forEach(tier => {
tier.addEventListener("dragover", e => e.preventDefault());
tier.addEventListener("drop", e => {
const src = e.dataTransfer.getData("text/plain");
const div = document.createElement("div");
div.className = "item";
div.style.backgroundImage = `url(${src})`;
tier.appendChild(div);
});
});


# images folder structure (create these manually):
# images/
# unranked/
# list.json
# s-tier/
# list.json
# a-tier/
# list.json
# b-tier/
# list.json
# c-tier/
