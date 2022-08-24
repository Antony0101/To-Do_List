var count;
pendingcount = document.getElementById("pendingcount");
completedcount = document.getElementById("completedcount");
canceledcount = document.getElementById("canceledcount");
deletedcount = document.getElementById("deletedcount");
fetch("https://rich-lapel-toad.cyclic.app/task/report", {
  headers: { Authorization: "Bearer " + localStorage.user },
})
  .then((data) => {
    data.json().then((d) => {
      console.log(d);
      count = d.count;
      pendingcount.innerText = count.pending;
      completedcount.innerText = count.completed;
      canceledcount.innerText = count.canceled;
      deletedcount.innerText = count.deleted;
    });
  })
  .catch((error) => {
    console.log(error);
  });

index = 1;
task = "first task";
priority = 2;
stat = "✅";

var lielement = `<li class="list-group-item"><span class="index">${index}.</span>${task}
<span class="priority">(${priority})</span>[<span class="status">${stat}</span>]
<div class="controlbuttons" style="text-align: right;">
<i class="fa-solid fa-check completedbtn"></i>
<i class="fa-solid fa-xmark cancelbtn"></i>
<i class="fa-solid fa-trash-can deletebtn"></i>
</div>
</li>`;

console.log(lielement);

var alltasks = document.getElementById("alltask");
function showTaskList() {
  for (i = 0; i < 5; i++) {
    var div = document.createElement("div");
    div.innerHTML = lielement.trim();
    alltasks.appendChild(div);
  }
}
showTaskList();
