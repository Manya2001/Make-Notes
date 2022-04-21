const addBtn=document.getElementById('add')
const clearBtn=document.getElementById('clear')

//Showing the stored notes by fetching from local storage
const storedNotes=JSON.parse(localStorage.getItem('notes'))
if(storedNotes)
{
    storedNotes.forEach(i => newNote(i))
}

//Clear all notes functionality
clearBtn.addEventListener('click', () => clearNotes())

function clearNotes()
{
    if (confirm("Are You Sure you want to DELETE ALL NOTES")) 
    {
        const allNotes=document.querySelectorAll(".note");
        allNotes.forEach(el => el.remove());
        localStorage.removeItem('notes')
    }
}

//Add notes functionality
addBtn.addEventListener('click', () => newNote())

function newNote(text = '')
{
    const note=document.createElement('div');
    note.className="note";

    note.innerHTML=`
    <div class="tools">
        <button class="edit"><i class="fas fa-edit" style='font-size:24px'></i></button>
        <button class="delete"><i class="fas fa-trash-alt" style='font-size:24px'></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>`

    const editBtn=note.querySelector('.edit')
    const delBtn=note.querySelector('.delete')
    const main=note.querySelector('.main')
    const textArea=note.querySelector('textarea')

    textArea.value=text
    main.innerHTML=text  

    editBtn.addEventListener('click', () => {
         main.classList.toggle('hidden')
         textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('input', () => {
        main.innerHTML=textArea.value;

        updateLocalStorege()
    })

    delBtn.addEventListener('click', () => {
        note.remove();

        updateLocalStorege()
    })

    document.body.appendChild(note);
}

//storing notes in the local storage
function updateLocalStorege()
{
    const totalNotes=document.querySelectorAll('textarea')

    const store_notes=[]

    totalNotes.forEach(i => store_notes.push(i.value))

    localStorage.setItem('notes',JSON.stringify(store_notes))
}