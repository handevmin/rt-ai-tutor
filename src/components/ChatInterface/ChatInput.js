import React, { useState } from 'react';

function ChatInput({ onSendMessage, isLoading, placeholder }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder || "메시지를 입력하세요..."}
        className="chat-input-field"
        disabled={isLoading}
      />
      <button 
        type="submit" 
        disabled={isLoading || !input.trim()}
        className="chat-submit-button"
      >
        {isLoading ? "전송 중..." : "전송"}
      </button>
    </form>
  );
}

export default ChatInput;