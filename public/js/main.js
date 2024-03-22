const savePostcard = () => {
    const message = document.getElementById("postcard-message").value;
    const image = document.getElementById("background-image-select").value;
    const textBoxColor = document.getElementById("text-box-color-select").value;
    const textColor = document.getElementById("text-color-select").value;

    const postcardData = {
        message: message,
        image: image,
        textBoxColor: textBoxColor,
        textColor: textColor,
    };

    fetch("/save-postcard", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postcardData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Postcard saved successfully:", data);
        })
        .catch((error) => {
            console.error("Error saving postcard:", error);
        });

    // making the postcard appear physically on site once saved
    const postcardElement = document.createElement("div");
    postcardElement.classList.add("postcard", "saved"); // Add the 'saved' class
    postcardElement.innerHTML = `
        <div class="postcard-image">
            <img src="${image}" alt="Postcard Image">
        </div>
        <div class="postcard-text" style=" color: ${textColor}; background-color: ${textBoxColor};">
            <p style=" color: ${textColor}; background-color: ${textBoxColor}; margin-top: -4px">${message}</p>
        </div>
    `;
    const postcardGallery = document.getElementById("created-postcards");
    postcardGallery.appendChild(postcardElement);
};


document.getElementById("save-postcard").addEventListener("click", savePostcard);


const updateTextBoxColor = () => {
    const selectedColor = document.getElementById('text-box-color-select').value;
    const postcardText = document.getElementById('postcard-message');
    postcardText.style.backgroundColor = selectedColor;
};

document.getElementById('text-box-color-select').addEventListener('change', updateTextBoxColor);

const updateTextColor = () => {
    const selectedColor = document.getElementById('text-color-select').value;
    const postcardText = document.getElementById('postcard-message');
    postcardText.style.color = selectedColor;
};

document.getElementById('text-color-select').addEventListener('change', updateTextColor);

const updatePostcardPreview = () => {
    const selectedImage = document.getElementById('background-image-select').value;
    const postcardPreview = document.getElementById('postcard-preview');
    postcardPreview.src = selectedImage;
};

document.getElementById('background-image-select').addEventListener('change', updatePostcardPreview);

