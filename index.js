const downloadButton = document.querySelector(".download-paper");
const helperText = document.querySelector(".helper-text");

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

const downloadPaper = () => {
  const subjectName = document
    .querySelector("#subject-code")
    .value.toUpperCase();

  if (!subjectName) {
    helperText.textContent = "Enter Subject Code.";
    helperText.classList.remove("invisible");
    return;
  }

  const set1check = document.getElementById("set-1").checked;
  const set2check = document.getElementById("set-2").checked;

  let urls = generateURL(subjectName, set1check, set2check);

  for (const url of urls) {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank"; // Set the file name.
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
};

downloadButton.addEventListener("click", downloadPaper);
