let progress = 0;
 
function completeVideo() {   progress = Math.min(progress + 50, 100);   updateProgress();
}
 
function submitQuiz() {   const answer = document.querySelector('input[name="q1"]:checked');   const result = document.getElementById("quizResult");
 
  if (!answer) {     result.textContent = "Please select an answer";     result.style.color = "red";     return;
  }
 
  if (answer.value === "1") {     result.textContent = "Correct Answer!";     result.style.color = "green";     progress = Math.min(progress + 50, 100);     updateProgress();
  } else {     result.textContent = "Wrong Answer. Try again.";     result.style.color = "red";
  }
}
 
function updateProgress() {   document.getElementById("progressBar").style.width = progress + "%";   document.getElementById("progressText").textContent =     progress + "% Completed";
}
