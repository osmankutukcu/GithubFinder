// Github ve UI sınıflarını import etme
import Github from "./github.js";
import UI from "./ui.js";

// Github ve UI sınıflarının örneklerini oluşturma
const github = new Github();
const ui = new UI();

// HTML elementlerini seçme
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const themeBtn = document.getElementById("theme-btn");
const body = document.querySelector("body");

// Ara butonuna tıklama olayı dinleyicisi ekleme
searchButton.addEventListener("click", getInput);

// Arama girişine Enter tuşuna basma olayı dinleyicisi ekleme
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getInput();
});

// Tema butonuna tıklama olayı dinleyicisi ekleme
themeBtn.addEventListener("click", changeTheme);

// Kullanıcının arama girişini alacak fonksiyon
async function getInput() {
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    ui.showAlert("Form alanı boş olamaz", "alert-info");
    return;
  }

  try {
    const data = await github.getUser(searchTerm);

    if (data.profile.message === "Not Found") {
      ui.showAlert("Aradığınız Kullanıcı Bulunamadı", "alert-danger");
    } else {
      ui.showAlert("Kullanıcı Başarıyla Bulundu", "alert-success");
      ui.showProfile(data.profile);
      ui.showRepos(data.repos);
    }
  } catch (error) {
    ui.showAlert("Bir hata oluştu, lütfen tekrar deneyin.", "alert-danger");
  }
}

// Temayı değiştirecek fonksiyon
function changeTheme() {
  // Arkaplanı değiştirme
  body.classList.toggle("bg-dark");
  body.classList.toggle("text-bg-dark");

  // Buton metnini değiştirme
  themeBtn.innerText = body.classList.contains("bg-dark")
    ? "Açık Mod"
    : "Koyu Mod";
}
