


// Sidebar panel logic (classic: New Chat, History, Settings only)
function closeAllPanels() {
  settingsPanel.classList.remove('active');
  historyList.style.display = 'none';
}


// Theme and accent color changer
const themeSelect = document.getElementById('theme-select');
const accentSelect = document.getElementById('accent-select');

themeSelect.onchange = function() {
  document.body.className = '';
  const theme = themeSelect.value;
  if (theme === 'scary') {
    document.body.classList.add('scary-theme');
  } else if (theme === 'allblack') {
    document.body.classList.add('allblack-theme');
  } else if (theme === 'neon') {
    document.body.classList.add('neon-theme');
  } else if (theme === 'neon-green') {
    document.body.classList.add('neon-green-theme');
  } else if (theme === 'neon-pink') {
    document.body.classList.add('neon-pink-theme');
  } else if (theme === 'neon-orange') {
    document.body.classList.add('neon-orange-theme');
  } else if (theme === 'neon-purple') {
    document.body.classList.add('neon-purple-theme');
  } else if (theme === 'neon-yellow') {
    document.body.classList.add('neon-yellow-theme');
  } else if (theme === 'neon-red') {
    document.body.classList.add('neon-red-theme');
  } else if (theme === 'neon-blue') {
    document.body.classList.add('neon-blue-theme');
  } else if (theme === 'light') {
    document.body.classList.add('light-theme');
  } else if (theme === 'purple') {
    document.body.classList.add('purple-theme');
  } else if (theme === 'red') {
    document.body.classList.add('red-theme');
  } else if (theme === 'blue') {
    document.body.classList.add('blue-theme');
  }
  localStorage.setItem('gpt_theme', theme);
};

accentSelect.onchange = function() {
  document.documentElement.style.setProperty('--accent', accentSelect.value);
  localStorage.setItem('gpt_accent', accentSelect.value);
};

// On load, restore theme/accent
window.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('gpt_theme') || 'scary';
  const accent = localStorage.getItem('gpt_accent') || '#00fff7';
  themeSelect.value = theme;
  accentSelect.value = accent;
  // Apply theme on load
  if (theme === 'scary') {
    document.body.classList.add('scary-theme');
  } else if (theme === 'allblack') {
    document.body.classList.add('allblack-theme');
  } else if (theme === 'neon') {
    document.body.classList.add('neon-theme');
  } else if (theme === 'neon-green') {
    document.body.classList.add('neon-green-theme');
  } else if (theme === 'neon-pink') {
    document.body.classList.add('neon-pink-theme');
  } else if (theme === 'neon-orange') {
    document.body.classList.add('neon-orange-theme');
  } else if (theme === 'neon-purple') {
    document.body.classList.add('neon-purple-theme');
  } else if (theme === 'neon-yellow') {
    document.body.classList.add('neon-yellow-theme');
  } else if (theme === 'neon-red') {
    document.body.classList.add('neon-red-theme');
  } else if (theme === 'neon-blue') {
    document.body.classList.add('neon-blue-theme');
  } else if (theme === 'light') {
    document.body.classList.add('light-theme');
  } else if (theme === 'purple') {
    document.body.classList.add('purple-theme');
  } else if (theme === 'red') {
    document.body.classList.add('red-theme');
  } else if (theme === 'blue') {
    document.body.classList.add('blue-theme');
  } else {
    document.body.classList.add('scary-theme');
  }
  document.documentElement.style.setProperty('--accent', accent);
});
// Sidebar elements
const newChatBtn = document.getElementById('new-chat-btn');
const historyBtn = document.getElementById('history-btn');
const settingsBtn = document.getElementById('settings-btn');
const historyList = document.getElementById('history-list');
const settingsPanel = document.getElementById('settings-panel');

// Save/load chat history in localStorage
function saveHistory() {
  let allHistory = JSON.parse(localStorage.getItem('gpt_chat_history') || '[]');
  allHistory.unshift({
    timestamp: Date.now(),
    conversation: [...conversationHistory]
  });
  // Keep only last 20 chats
  allHistory = allHistory.slice(0, 20);
  localStorage.setItem('gpt_chat_history', JSON.stringify(allHistory));
}

function loadHistory() {
  return JSON.parse(localStorage.getItem('gpt_chat_history') || '[]');
}

function renderHistoryList() {
  let allHistory = loadHistory();
  historyList.innerHTML = '';
  if (allHistory.length === 0) {
    historyList.innerHTML = '<div style="padding:10px;color:#666;">No history yet.</div>';
    return;
  }
  allHistory.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'history-item';
    div.textContent = `Chat ${allHistory.length - idx}`;
    div.onclick = (e) => {
      if (e.target.classList.contains('delete-btn')) return;
      conversationHistory = [...item.conversation];
      renderConversation();
    };
    // Add delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑️';
    delBtn.className = 'delete-btn';
    delBtn.style.float = 'right';
    delBtn.style.marginLeft = '10px';
    delBtn.style.background = 'none';
    delBtn.style.border = 'none';
    delBtn.style.color = '#888';
    delBtn.style.cursor = 'pointer';
    delBtn.onclick = (e) => {
      e.stopPropagation();
      allHistory.splice(idx, 1);
      localStorage.setItem('gpt_chat_history', JSON.stringify(allHistory));
      renderHistoryList();
    };
    div.appendChild(delBtn);
    historyList.appendChild(div);
  });
}

function renderConversation() {
  chatMessages.innerHTML = '';
  conversationHistory.forEach(msg => {
    if (msg.role === 'user') addMessage(msg.content, 'user');
    else if (msg.role === 'assistant') addMessage(msg.content, 'ai');
  });
}

// New Chat button
newChatBtn.onclick = () => {
  if (conversationHistory.length > 0) saveHistory();
  conversationHistory = [];
  chatMessages.innerHTML = '';
};

// History button
historyBtn.onclick = () => {
  settingsPanel.classList.remove('active');
  historyList.style.display = historyList.style.display === 'block' ? 'none' : 'block';
  if (historyList.style.display === 'block') renderHistoryList();
};

// Settings button
settingsBtn.onclick = () => {
  historyList.style.display = 'none';
  settingsPanel.classList.toggle('active');
};
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

// Store conversation history as an array of {role, content}
let conversationHistory = [];

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function fetchAIResponse(userMsg) {
  // Send chat to backend proxy (Flask)
  try {
    const response = await fetch('/api/chat', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: conversationHistory
      })
    });
    const data = await response.json();
    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
      return data.choices[0].message.content.trim();
    } else if (data.error) {
      return "[Groq API Error] " + (data.error.message || JSON.stringify(data.error));
    } else {
      return "[No response from Groq API]";
    }
  } catch (err) {
    return "[Backend network error: " + err.message + "]";
  }
}

chatForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const userMsg = chatInput.value.trim();
  if (!userMsg) return;
  addMessage(userMsg, 'user');
  conversationHistory.push({ role: 'user', content: userMsg });
  chatInput.value = '';
  addMessage('...', 'ai'); // loading indicator
  const aiMsg = await fetchAIResponse();
  // Remove the loading indicator
  const loadingMsg = chatMessages.querySelector('.message.ai:last-child');
  if (loadingMsg && loadingMsg.textContent === '...') {
    loadingMsg.remove();
  }
  addMessage(aiMsg, 'ai');
  conversationHistory.push({ role: 'assistant', content: aiMsg });
});
