const addButton = document.querySelector('#add');

const updateLSData = () => {
    const textArea = document.querySelectorAll('textarea');
    const notes = [];

    textArea.forEach((note) => {
        return notes.push(note.value);
    })

    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = '') => {


    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class="note">
        <div class="operation">
            <button class="edit"> <i class="fas fa-edit"></i></button>
            <button class="delete"> <i class="fas fa-trash-alt"></i></button>
            
            
            <div class="main ${text ? "" : "hidden"}"></div>
            <textarea class="text-area ${text ? "hidden" : ""}"></textarea>
        </div>
    </div> `;


    note.insertAdjacentHTML('afterbegin', htmlData);



    // getting refrences of edit dlelte etc 
    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('.text-area');

    // deleting the node
    delButton.addEventListener('click', () => {
        const confirmation = confirm("Do You really want to delete.?");
        if (confirmation == true) {

            note.remove();
            updateLSData();
        }

    })

    textArea.value = text;
    mainDiv.innerHTML = text;
    //    toogle using edit button 
    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSData();
    })



    document.body.appendChild(note);
    //  it appends a node a node as tha last child of a node

}

// getting data back from localStorage 
const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) { notes.forEach((note) => addNewNote(note)) }

addButton.addEventListener('click', () => addNewNote());