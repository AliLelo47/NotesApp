var Title = document.getElementById("notestitle");
var Content = document.getElementById("notescontent");



document.getElementById("AddNoteButton").addEventListener("click", SaveData);
async function SaveData () {
        var response = await fetch("http://127.0.0.1:9000/AddNote", {
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
        var response = await fetch("http://127.0.0.1:9000/DeleteNote", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: Title.value, content: Content.value})
      });
        var result = await response.json();
      document.getElementById("response").innerText = result.message;
};
