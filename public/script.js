async function sendMessage() {

  const input =
    document.getElementById("user-input");

  const chatBox =
    document.getElementById("chat-box");

  const message = input.value;

  if (message.trim() === "") return;

  chatBox.innerHTML += `
    <div class="message user">
      ${message}
    </div>
  `;

  input.value = "";

  chatBox.innerHTML += `
    <div class="message bot" id="typing">
      AI is typing...
    </div>
  `;

  try {

    const response = await fetch("/chat", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        message: message
      })

    });

    const data = await response.json();

    document
      .getElementById("typing")
      .remove();

    chatBox.innerHTML += `
      <div class="message bot">
        ${data.reply}
      </div>
    `;

    chatBox.scrollTop =
      chatBox.scrollHeight;

  } catch (error) {

    console.log(error);

  }

}

document
  .getElementById("user-input")
  .addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

      sendMessage();

    }

});