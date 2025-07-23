var Title = document.getElementById("notestitle");
var Content = document.getElementById("notescontent");





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








document.getElementById("DeleteNoteButton").addEventListener("click", DeleteNote);
async function DeleteNote() {
        var response = await fetch("/DeleteNote", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: Title.value, content: Content.value})
      });
        var result = await response.json();
      document.getElementById("response").innerText = result.message;
      ViewData()
};







document.getElementById("ViewNoteButton").addEventListener("click", ViewData);
async function ViewData () {


      var response = await fetch("/ViewNote", {
        method: "GET"
      });

      var notebook = document.getElementById("NoteBook");

      notebook.innerHTML = ""

      notes = await response.json()

      console.log('Type:', typeof notes);
      JSON.stringify(notes)
      notes.forEach(note => {

        const NewNote = document.createElement("div")
        NewNote.className = "NewNote";
        NewNote.innerHTML = `
        <h3>Title: ${note.title}</h3>
        <h3>Note: </h3>
        <p>${note.content}</p>
        `
        notebook.append(NewNote)

      });
};