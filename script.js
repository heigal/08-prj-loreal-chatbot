/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

// Keep a running chat history for the OpenAI `messages` array.
const messages = [
  {
    role: "system",
    content:
      "You are a L'Oreal product advisor chatbot. Remember details from earlier messages in this chat and use them in later answers. Only answer questions about L'Oreal products, ingredients, routines, product categories, or beauty-use guidance related to L'Oreal brands. If a question is unrelated, refuse politely in one sentence and ask the user to ask a L'Oreal product or routine question.",
  },
];

// A simple topic check to help keep the chatbot focused on L'Oreal-related requests.
const lorealKeywords = [
  "loreal",
  "l'oreal",
  "l'oréal",
  "product",
  "routine",
  "skincare",
  "haircare",
  "makeup",
  "fragrance",
  "serum",
  "shampoo",
  "conditioner",
  "cleanser",
  "moisturizer",
  "mascara",
  "foundation",
  "lipstick",
  "sunscreen",
  "ingredient",
  "beauty",
];

function isLorealQuestion(text) {
  const normalizedText = text.toLowerCase();
  return lorealKeywords.some((keyword) => normalizedText.includes(keyword));
}

// Allow follow-up questions if the chat already has L'Oreal context.
function hasPriorLorealContext() {
  return messages.some(
    (message) =>
      message.role === "user" && isLorealQuestion(message.content || ""),
  );
}

function isLikelyFollowUp(text) {
  const normalizedText = text.toLowerCase();
  const followUpHints = [
    "and",
    "also",
    "what about",
    "that one",
    "this one",
    "it",
    "they",
    "those",
    "another",
    "instead",
  ];

  return followUpHints.some((hint) => normalizedText.includes(hint));
}

function canAnswerPrompt(prompt) {
  if (isLorealQuestion(prompt)) {
    return true;
  }

  return hasPriorLorealContext() && isLikelyFollowUp(prompt);
}

// Add one message line to the chat window.
function addMessage(role, content) {
  const messageEl = document.createElement("p");
  messageEl.classList.add("msg", role === "user" ? "user" : "ai");
  messageEl.textContent = `${role === "user" ? "You" : "Assistant"}: ${content}`;
  chatWindow.appendChild(messageEl);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Set initial message
addMessage("assistant", "Hello! Ask me about L'Oreal products and routines.");

/* Handle form submit */
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!CLOUDFLARE_WORKER_URL) {
    addMessage(
      "assistant",
      "Please add your deployed Cloudflare Worker URL in secrets.js before chatting.",
    );
    return;
  }

  const prompt = userInput.value.trim();
  if (!prompt) return;

  // Show only the current turn in the UI. Context is still preserved in `messages`.
  chatWindow.innerHTML = "";

  if (!canAnswerPrompt(prompt)) {
    addMessage("user", prompt);
    userInput.value = "";
    addMessage(
      "assistant",
      "I can only help with L'Oreal products and beauty routines. Please ask a L'Oreal-related question.",
    );
    return;
  }

  addMessage("user", prompt);
  userInput.value = "";

  messages.push({ role: "user", content: prompt });

  try {
    const response = await fetch(CLOUDFLARE_WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const assistantReply = data.choices[0].message.content;

    addMessage("assistant", assistantReply);
    messages.push({ role: "assistant", content: assistantReply });
  } catch (error) {
    addMessage(
      "assistant",
      "Sorry, there was a problem communicating through the Cloudflare Worker.",
    );
    console.error(error);
  }
});
