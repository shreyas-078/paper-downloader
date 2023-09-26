const downloadButton = document.querySelector(".download-paper");
const helperText = document.querySelector(".helper-text");

const generateURL = (name, number) => {
    let urlToCheck = `https://vtu.ac.in/pdf/QP/${name}.pdf`;
    fetch(urlToCheck, { method: "HEAD" })
        .then((response) => {
            if (response.status === 200) {
                return urlToCheck;
            } else {
                urlToCheck = `https://vtu.ac.in/pdf/QP/${name}set${number}.pdf`;
                fetch(urlToCheck, { method: "HEAD" })
                    .then((response) => {
                        if (response.status === 200) {
                            return urlToCheck;
                        } else {
                            return new Error("Not existing");
                        }
                    })
            }
        })
        .catch((error) => {
            return new Error("An Error Occoured", error);
        });
};

const downloadPaper = () => {
    const subjectName = document
        .querySelector("#subject-code")
        .value.toUpperCase();
    const setNumber = document.querySelector("#set").value;

    if (!subjectName && !setNumber) {
        helperText.textContent = "Enter Values";
        helperText.classList.remove("invisible");
        return;
    }

    const url = generateURL(subjectName, setNumber);

    if (url instanceof Error) {
        helperText.textContent = "Paper Not found, perhaps you mistyped the set/subject code?";
        helperText.classList.remove("invisible");
        return;
    }

    return new Promise(function (resolve, reject) {
        // Get file name from url.
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function () {
            resolve(xhr);
        };
        xhr.onerror = reject;
        xhr.open("GET", url);
        xhr.send();
    }).then(function (xhr) {
        const a = document.createElement("a");
        a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
        a.download = url.includes("set") ? `subjectName-set-${setNumber}` : "subjectName"; // Set the file name.
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        return xhr;
    });
};

downloadButton.addEventListener("click", downloadPaper);
