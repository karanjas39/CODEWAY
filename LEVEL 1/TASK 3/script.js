let remainingSeconds = 30 * 60 * 60;
const interval = setInterval(updateTimer, 1000);
let selectedContainer = "";

function updateTimer() {
  if (remainingSeconds <= 0) {
    clearInterval(interval);
    document.getElementById("timer").textContent = "00:00:00";
    return;
  }

  remainingSeconds--;

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  document.getElementById("timer").textContent = formattedTime;
}

document.querySelector(".faq-container").addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("fa-solid")) {
    const container = target.closest(".faq-template");
    selectedContainer = container;
    container.querySelector("p").classList.toggle("hide");
    if (target.classList.contains("fa-chevron-up")) {
      if (selectedContainer) {
        selectedContainer.querySelector("h2").style.color = "black";
      }
      container.querySelector("i").classList.remove("fa-chevron-up");
      container.querySelector("i").classList.add("fa-chevron-down");
    } else {
      if (selectedContainer) {
        selectedContainer.querySelector("h2").style.color = "#6366f1";
      }
      container.querySelector("i").classList.add("fa-chevron-up");
      container.querySelector("i").classList.remove("fa-chevron-down");
    }
  }
});
