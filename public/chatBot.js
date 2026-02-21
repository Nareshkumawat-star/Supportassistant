(function () {
    const api_url = "https://supportassistant.vercel.app/chatBot.js/api/chat";
    const scriptTag = document.currentScript;
    const ownerId = scriptTag.getAttribute("data-owner-id");

    if (!ownerId) {
        console.error("Owner ID is required");
        return;
    }

    // Check for inline container
    const inlineContainer = document.getElementById("chatbot-inline-container");
    const mode = scriptTag.getAttribute("data-mode") || "normal"; // normal or demo

    // Toggle Button
    let toggleBtn = null;
    if (!inlineContainer) {
        toggleBtn = document.createElement("div");
        toggleBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: white;">
                <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
            </svg>
        `;
        Object.assign(toggleBtn.style, {
            position: "fixed",
            bottom: "40px",
            right: "20px",
            zIndex: "1000",
            cursor: "pointer",
            backgroundColor: "#18181b", // zinc-900
            color: "white",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            transition: "transform 0.2s ease, background-color 0.2s ease",
            overflow: "hidden"
        });

        // Add Animations CSS
        if (!document.getElementById("chatbot-animations")) {
            const style = document.createElement("style");
            style.id = "chatbot-animations";
            style.innerHTML = `
                @keyframes chatbotPulse {
                    0% { transform: scale(1); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
                    50% { transform: scale(1.05); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
                    100% { transform: scale(1); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
                }
                @keyframes chatbotFloat {
                    0% { transform: translate(0, 0); }
                    25% { transform: translate(6px, -12px); }
                    50% { transform: translate(-6px, -4px); }
                    75% { transform: translate(4px, -10px); }
                    100% { transform: translate(0, 0); }
                }
                .chatbot-animated {
                    animation: chatbotPulse 3s infinite ease-in-out, chatbotFloat 4s infinite ease-in-out;
                }
            `;
            document.head.appendChild(style);
        }
        toggleBtn.classList.add("chatbot-animated");

        // Hover effect for toggle button
        toggleBtn.addEventListener('mouseenter', () => {
            toggleBtn.style.backgroundColor = "#27272a"; // zinc-800
        });
        toggleBtn.addEventListener('mouseleave', () => {
            toggleBtn.style.backgroundColor = "#18181b"; // zinc-900
        });
    }

    // Main Chat Container
    const chatContainer = document.createElement("div");
    Object.assign(chatContainer.style, {
        position: inlineContainer ? "relative" : "fixed",
        bottom: inlineContainer ? "auto" : "110px",
        right: inlineContainer ? "auto" : "20px",
        width: inlineContainer ? "100%" : "350px",
        height: inlineContainer ? "500px" : "500px",
        backgroundColor: inlineContainer ? "transparent" : "#ffffff",
        borderRadius: "24px",
        boxShadow: inlineContainer ? "none" : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        border: "none",
        zIndex: "1000",
        display: inlineContainer ? "flex" : "none",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, sans-serif"
    });

    // Header
    const header = document.createElement("div");
    Object.assign(header.style, {
        backgroundColor: "#18181b", // zinc-900
        color: "#f4f4f5", // zinc-100
        padding: "20px 24px",
        display: inlineContainer ? "none" : "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: "600",
        fontSize: "16px"
    });
    header.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 8px; height: 8px; background-color: #22c55e; border-radius: 50%;"></div>
            <span>Support Assistant</span>
        </div>
        <button id="chatbot-close-btn" style="background: #27272a; border: none; color: #f4f4f5; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 6px; border-radius: 8px; transition: background 0.2s;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;

    // Close button hover effect
    const closeBtnEl = header.querySelector('#chatbot-close-btn');
    if (closeBtnEl) {
        closeBtnEl.addEventListener('mouseenter', () => closeBtnEl.style.background = "#3f3f46"); // zinc-700
        closeBtnEl.addEventListener('mouseleave', () => closeBtnEl.style.background = "#27272a"); // zinc-800
    }

    // Messages Area
    const messagesArea = document.createElement("div");
    Object.assign(messagesArea.style, {
        flex: "1",
        backgroundColor: inlineContainer ? "transparent" : "#f8f9fa",
        padding: "16px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "12px"
    });

    // Input Area Setup
    const inputContainer = document.createElement("div");
    Object.assign(inputContainer.style, {
        padding: "12px 16px",
        backgroundColor: inlineContainer ? "transparent" : "#ffffff",
        display: (inlineContainer && mode === "demo") ? "none" : "flex",
        gap: "8px",
        alignItems: "center",
        borderTop: inlineContainer ? "none" : "1px solid #e5e5e5"
    });

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.placeholder = "Type a message";
    Object.assign(inputField.style, {
        flex: "1",
        padding: "12px 16px",
        border: "1px solid #e4e4e7", // zinc-200
        borderRadius: "14px",
        outline: "none",
        fontSize: "14px",
        backgroundColor: "#f4f4f5", // zinc-100
        color: "#18181b", // zinc-900
        fontFamily: "inherit"
    });

    const sendBtn = document.createElement("button");
    sendBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
    `;
    Object.assign(sendBtn.style, {
        backgroundColor: "#18181b", // zinc-900
        color: "white",
        border: "none",
        width: "42px",
        height: "42px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "transform 0.2s, background-color 0.2s"
    });

    sendBtn.addEventListener('mouseenter', () => {
        sendBtn.style.backgroundColor = "#27272a"; // zinc-800
        sendBtn.style.transform = "scale(1.05)";
    });
    sendBtn.addEventListener('mouseleave', () => {
        sendBtn.style.backgroundColor = "#18181b"; // zinc-900
        sendBtn.style.transform = "scale(1)";
    });

    // Assemble Interface
    inputContainer.appendChild(inputField);
    inputContainer.appendChild(sendBtn);

    chatContainer.appendChild(header);
    chatContainer.appendChild(messagesArea);
    chatContainer.appendChild(inputContainer);

    if (inlineContainer) {
        inlineContainer.appendChild(chatContainer);
        // Hide close button in inline mode
        const closeBtn = header.querySelector('#chatbot-close-btn');
        if (closeBtn) closeBtn.style.display = "none";
    } else {
        document.body.appendChild(toggleBtn);
        document.body.appendChild(chatContainer);
    }

    // Event Listeners
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            chatContainer.style.display = chatContainer.style.display === "none" ? "flex" : "none";
            if (chatContainer.style.display === "flex") {
                inputField.focus();
                toggleBtn.classList.remove("chatbot-animated");
            } else {
                toggleBtn.classList.add("chatbot-animated");
            }
        });
    }

    const closeBtn = header.querySelector('#chatbot-close-btn');
    if (closeBtn && !inlineContainer) {
        closeBtn.addEventListener("click", () => {
            chatContainer.style.display = "none";
            if (toggleBtn) toggleBtn.classList.add("chatbot-animated");
        });
    }

    // Add initial greeting (optional)
    function appendMessage(text, isUser = false) {
        const msg = document.createElement("div");
        Object.assign(msg.style, {
            maxWidth: "85%",
            padding: "12px 16px",
            borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
            fontSize: "14px",
            lineHeight: "1.5",
            alignSelf: isUser ? "flex-end" : "flex-start",
            backgroundColor: isUser ? "#18181b" : "#f4f4f5", // zinc-900 or zinc-100
            color: isUser ? "#ffffff" : "#18181b", // white or zinc-900
            border: isUser ? "none" : "1px solid #e4e4e7", // zinc-200
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            fontFamily: "inherit"
        });
        msg.innerText = text;
        messagesArea.appendChild(msg);
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    appendMessage("Hi there! How can we help you today?");

    // Send logic
    async function sendMessage() {
        const message = inputField.value.trim();
        if (!message) return;

        // Display user message
        appendMessage(message, true);
        inputField.value = "";

        // Show typing indicator or temporary loading state
        const loadingMsg = document.createElement("div");
        Object.assign(loadingMsg.style, {
            maxWidth: "80%",
            padding: "14px 18px",
            borderRadius: "16px",
            alignSelf: "flex-start",
            backgroundColor: "#ffffff",
            border: "1px solid #e5e5e5",
            display: "flex",
            gap: "4px",
            alignItems: "center"
        });

        // Add Wave CSS if not already added
        if (!document.getElementById("chatbot-wave-style")) {
            const style = document.createElement("style");
            style.id = "chatbot-wave-style";
            style.innerHTML = `
                @keyframes chatbotWave {
                    0%, 60%, 100% { transform: translateY(0); }
                    30% { transform: translateY(-4px); }
                }
                .chatbot-dot {
                    width: 6px;
                    height: 6px;
                    background-color: #6b7280;
                    border-radius: 50%;
                    animation: chatbotWave 1.3s linear infinite;
                }
                .chatbot-dot:nth-child(2) { animation-delay: -1.1s; }
                .chatbot-dot:nth-child(3) { animation-delay: -0.9s; }
            `;
            document.head.appendChild(style);
        }

        loadingMsg.innerHTML = `
            <span class="chatbot-dot"></span>
            <span class="chatbot-dot"></span>
            <span class="chatbot-dot"></span>
        `;

        messagesArea.appendChild(loadingMsg);
        messagesArea.scrollTop = messagesArea.scrollHeight;

        try {
            const res = await fetch(api_url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message, ownerId })
            });
            const data = await res.json();

            // Remove loading indicator
            loadingMsg.remove();

            if (res.ok && data.response) {
                appendMessage(data.response);
            } else {
                appendMessage(data.error || "Sorry, I am having trouble connecting right now.");
            }
        } catch (err) {
            loadingMsg.remove();
            appendMessage("Error: Could not connect to the server.");
        }
    }

    sendBtn.addEventListener("click", sendMessage);
    inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    // Demo Mode Logic
    if (mode === "demo") {
        const demoMessages = [
            { text: "Hello! How can I help you today?", isUser: false, delay: 1000 },
            { text: "Can you tell me about your pricing?", isUser: true, delay: 2000 },
            { text: "Of course! We have three plans tailored for different needs.", isUser: false, delay: 1500 },
            { text: "What about custom integrations?", isUser: true, delay: 2500 }
        ];

        let index = 1; // start after greeting
        async function runDemo() {
            if (index >= demoMessages.length) return;
            const msg = demoMessages[index];
            setTimeout(() => {
                appendMessage(msg.text, msg.isUser);
                index++;
                runDemo();
            }, msg.delay);
        }
        runDemo();
    }

})();