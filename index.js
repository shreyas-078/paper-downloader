const downloadButton = document.querySelector(".download-paper");
const helperText = document.querySelector(".helper-text");
const subjectInput = document.querySelector("#subject-code");

// Add input animation
subjectInput.addEventListener("focus", () => {
  subjectInput.parentElement.classList.add("focused");
});

subjectInput.addEventListener("blur", () => {
  subjectInput.parentElement.classList.remove("focused");
});

const generateURL = (name, set1, set2) => {
  let papersites = [];
  papersites.push(`https://vtu.ac.in/pdf/QP/${name}.pdf`);
  if (set1) {
    papersites.push(`https://vtu.ac.in/pdf/QP/${name}set1.pdf`);
  }
  if (set2) {
    papersites.push(`https://vtu.ac.in/pdf/QP/${name}set2.pdf`);
  }
  return papersites;
};

const showLoading = () => {
  downloadButton.innerHTML = '<span class="button-text">Downloading...</span><i class="fas fa-spinner fa-spin"></i>';
  downloadButton.disabled = true;
};

const resetButton = () => {
  setTimeout(() => {
    downloadButton.innerHTML = '<span class="button-text">Download Papers</span><i class="fas fa-download"></i>';
    downloadButton.disabled = false;
  }, 1500);
};

const showError = (message) => {
  helperText.querySelector("span").textContent = message;
  helperText.classList.remove("invisible");

  // Add animated entrance
  helperText.style.animation = "none";
  setTimeout(() => {
    helperText.style.animation = "shake 0.5s ease-in-out";
  }, 10);

  setTimeout(() => {
    helperText.classList.add("invisible");
  }, 4000);
};

const downloadPaper = () => {
  const subjectName = subjectInput.value.toUpperCase().trim();

  if (!subjectName) {
    showError("Please enter a subject code");
    return;
  }

  showLoading();

  const set1check = document.getElementById("set-1").checked;
  const set2check = document.getElementById("set-2").checked;

  if (!set1check && !set2check) {
    showError("Please select at least one set");
    resetButton();
    return;
  }

  let urls = generateURL(subjectName, set1check, set2check);
  let downloadCount = 0;

  for (const url of urls) {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    a.remove();
    downloadCount++;
  }

  setTimeout(() => {
    downloadButton.innerHTML = `<span class="button-text">Downloaded ${downloadCount} file${downloadCount !== 1 ? 's' : ''}</span><i class="fas fa-check"></i>`;

    resetButton();
  }, 1000);
};

// Add keyboard support for better accessibility
subjectInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    downloadPaper();
  }
});

downloadButton.addEventListener("click", downloadPaper);

// Initial animation when page loads
document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".card");
  const header = document.querySelector("header");

  // Ensure animations trigger
  setTimeout(() => {
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
    header.style.opacity = "1";
  }, 100);
});
