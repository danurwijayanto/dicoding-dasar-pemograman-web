
// Comment locale storage
const CACHE_KEY = "comment_history";

function checkForStorage() {
    return typeof(Storage) !== "undefined"
}

function performPost() {
    authorName = document.getElementById("aname").value;
    comment = document.getElementById("cmnt").value;

    if (authorName == "" || comment == "") {
        alert("Anda belum mengisi Author Name atau Comment");
        return;
    }
    // // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const commentHistory = {
        authorName: authorName,
        comment: comment
    }
    putHistory(commentHistory);
    renderHistory();
 }

function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        historyData.unshift(data);

        if (historyData.length > 5) {
            historyData.pop();
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#comment-list");
  
  
    // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";
  
  
    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td style='width: 20%;'>" + history.authorName + "</td>";
        row.innerHTML += "<td style='width: 80%;'>" + history.comment + "</td>";
 
  
        historyList.appendChild(row);
    }
 }