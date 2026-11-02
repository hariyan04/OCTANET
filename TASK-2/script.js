const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value == ''){
        alert("You must write something!");
    }
else{
    let li = document.createElement("li");
    li.textContent = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.textContent = "\u00d7";
    li.appendChild(span);
}
inputBox.value ="";
saveData();
}

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
},false);

function saveData(){
    // Serialize tasks as JSON to avoid injecting HTML
    const tasks = [];
    for (const li of listContainer.children){
        // li.firstChild may be a text node; remove the trailing × if present
        let text = li.firstChild && li.firstChild.nodeType === Node.TEXT_NODE ? li.firstChild.textContent : li.textContent;
        text = text.replace('\u00d7','').trim();
        tasks.push({ text: text, checked: li.classList.contains('checked') });
    }
    localStorage.setItem('data', JSON.stringify(tasks));
}
function showTask(){
    const raw = localStorage.getItem('data');
    if (!raw) return;
    let tasks;
    try { tasks = JSON.parse(raw); } catch (e) { return; }
    listContainer.innerHTML = '';
    for (const t of tasks){
        const li = document.createElement('li');
        li.textContent = t.text || '';
        if (t.checked) li.classList.add('checked');
        const span = document.createElement('span');
        span.textContent = '\u00d7';
        li.appendChild(span);
        listContainer.appendChild(li);
    }
}
showTask();