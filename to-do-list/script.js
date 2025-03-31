// HTML'deki elemanları seçelim
const taskInput = document.getElementById("taskInput"); // Kullanıcının yazdığı görev
const addTaskBtn = document.getElementById("addTaskBtn"); // "Ekle" butonu
const taskList = document.getElementById("taskList"); // Görevlerin bulunduğu liste

// Sayfa yüklendiğinde localStorage'dan görevleri yükle
//DOM olduğu zaman sayfa yüklendiğinde direkt loadTask fonksiyonunu çağırıyo 
document.addEventListener("DOMContentLoaded", loadTasks);

// "Ekle" butonuna tıklandığında görev ekle
//tıklandığında eklendiğine emin oluyo.
addTaskBtn.addEventListener("click", addTask);

// Enter tuşuna basıldığında görev ekle
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});



// Görev ekleme fonksiyonu
function addTask() {
    const taskText = taskInput.value.trim(); // Kullanıcının yazdığı metni al

    if (taskText === "") {
        alert("Lütfen bir görev girin!");
        return;
    }

    // Yeni <li> öğesi oluştur
    const li = document.createElement("li");
    li.textContent = taskText;

    // Göreve tıklayınca tamamlandı olarak işaretleme
    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        saveTasks();
    });
    //show button
    const showBtn= document.createElement("button");
    showBtn.textContent ="Göster";
    showBtn.classList.add("show-btn");

    showBtn.addEventListener("click", function () {
        if(show===true){
            showBtn.textContent ="Göster";
        }else{
            showBtn.textContent ="Gizle";
        }
        
    });


    // Sil butonu oluştur
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Sil";
    deleteBtn.classList.add("delete-btn");

    // Sil butonuna tıklanınca görevi kaldır
    deleteBtn.addEventListener("click", function () {
        li.remove();
        saveTasks();
    });

    // <li>'nin içine sil butonunu ekleyelim
    li.appendChild(deleteBtn);
    li.appendChild(showBtn);

    // Listeye <li> ekle
    taskList.appendChild(li);

    // LocalStorage'a kaydet
    saveTasks();

    // Input kutusunu temizle
    taskInput.value = "";
}

// Görevleri kaydetme (localStorage kullanımı)
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach((li) => {
        tasks.push({
            text: li.textContent.replace("Sil", "").trim(),
            completed: li.classList.contains("completed"),
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// LocalStorage'dan görevleri yükleme
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", function () {
            li.classList.toggle("completed");
            saveTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Sil";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function () {
            li.remove();
            saveTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
    function show(){
        li.taskText.hidden=false;
    };
    
    function hide(){
        li.taskText.hidden=true;
    };
}
