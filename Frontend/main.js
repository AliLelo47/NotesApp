var Title = document.getElementById("notestitle");
var Content = document.getElementById("notescontent");
let ClassCount = 0;
let NewCount = ClassCount.toString();



document.getElementById("AddNoteButton").addEventListener("click", SaveData);
async function SaveData () {
        var response = await fetch("/AddNote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: Title.value, content: Content.value})
      });
      var result = await response.json();
      document.getElementById("response").innerText = result.message;
};













document.getElementById("ViewNoteButton").addEventListener("click", ViewData);
async function ViewData () {

      

      let response = await fetch("/ViewNote", {
        method: "GET"
      });

      let notebook = document.getElementById("NoteBook");

      notebook.innerHTML = ""

      notes = await response.json()

      console.log('Type:', typeof notes);
      JSON.stringify(notes)
      
      notes.forEach(note => {

        const NewNote = document.createElement("div")
        NewNote.className = "NewNote";
        NewNote.innerHTML = `
        <h3  id="${NewCount}">Title: ${note.title}</h3>
        <title>Note</title>
        <p>${note.content}</p>
        <button class="${NewCount} DeleteButton">Delete Note</button>
        `
        notebook.append(NewNote)

        ClassCount = ClassCount + 1;

      });
};






document.getElementById("NoteBook").addEventListener("click", function(e){
  if (e.target.classList.contains("DeleteButton")){
    DeleteNote(e);  
  };
});

async function DeleteNote() {
        let DeleteId = document.getElementById(`${NewCount}`);
        let response = await fetch("/DeleteNote", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({title: DeleteId.value})
      });
        var result = await response.json();
      document.getElementById("response").innerText = result.message;
      ViewData()
};
