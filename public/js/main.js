const savePostcard = () => {
    const title = document.getElementById("postcard-title").value;
    const titleColor = document.getElementById("title-color-select").value;
    const message = document.getElementById("postcard-message").value;
    const image = document.getElementById("background-image-select").value;
    const textBoxColor = document.getElementById("text-box-color-select").value;
    const textColor = document.getElementById("text-color-select").value;

    const postcardData = {
        title: title,
        titleColor: titleColor,
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
    postcardElement.classList.add("postcard", "saved");
    postcardElement.innerHTML = `
        <div class="postcard-image" style="position: relative;">
            <img src="${image}" alt="Postcard Image">
            <h2 class="postcard-title saved-title" style="color: ${titleColor};">${title}</h2>
        </div>
        <div class="postcard-text" style="background-color: ${textBoxColor}; color: ${textColor};">
            <p style=" color: ${textColor}; background-color: ${textBoxColor};">${message}</p>
        </div>
    `;
    const postcardGallery = document.getElementById("created-postcards");
    postcardGallery.appendChild(postcardElement);

    const deleteButton = createDeleteButton(postcardData.id);
    postcardElement.appendChild(deleteButton);
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


const deletePostcard = async (postId) => {
    try {
        const response = await fetch(`/delete-postcard/${postId}`, {
            method: "DELETE",
        });
        if (response.ok) {
            const postcardElement = document.getElementById(`postcard-${postId}`);
            postcardElement.remove();
            console.log("Postcard deleted successfully");
        } else {
            console.error("Error deleting postcard:", response.statusText);
        }
    } catch (error) {
        console.error("Error deleting postcard:", error);
    }
};


const createDeleteButton = (postId) => {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.dataset.postId = postId;
    deleteButton.addEventListener("click", () => {
        deletePostcard(postId);
    });
    return deleteButton;
};
