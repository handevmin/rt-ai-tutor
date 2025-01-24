import React, { useState, useEffect } from 'react';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import { sendDialog, getTrySaying, getTranscriptReview, translate } from '../../services/api';

const CHAT_TYPES = {
  DIALOG: 'dialog',
  TRY_SAYING: 'try-saying',
  TRANSCRIPT: 'transcript',
  TRANSLATE: 'translate'
};

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatType, setChatType] = useState(CHAT_TYPES.DIALOG);
  const [targetLanguage, setTargetLanguage] = useState('English');

  const handleSendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const newMessage = {
      type: 'user',
      content: { text }
    };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      let response;
      switch (chatType) {
        case CHAT_TYPES.DIALOG:
          response = await sendDialog(text);
          setMessages(prev => [...prev, {
            type: 'bot',
            content: { text: response.response }
          }]);
          break;

        case CHAT_TYPES.TRY_SAYING:
          response = await getTrySaying(text);
          setMessages(prev => [...prev, {
            type: 'bot',
            content: { text: `💡 ${response.example_response}` }
          }]);
          break;

        case CHAT_TYPES.TRANSCRIPT:
          response = await getTranscriptReview(text);
          setMessages(prev => [...prev, {
            type: 'bot',
            content: { text: `📝 ${response.review}` }
          }]);
          break;

        case CHAT_TYPES.TRANSLATE:
          response = await translate(text, targetLanguage);
          setMessages(prev => [...prev, {
            type: 'bot',
            content: { text: `🌐 ${response.translation}` }
          }]);
          break;
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.detail ||
        'Server connection error. Please try again.';
      setMessages(prev => [...prev, {
        type: 'bot',
        content: { text: `❌ Error: ${errorMessage}` }
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-interface">
        <ChatHistory messages={messages} />
        <div className="input-area">
          <div className="chat-type-options">
            {Object.entries(CHAT_TYPES).map(([key, value]) => (
              <button
                key={value}
                className={`chat-type-button ${chatType === value ? 'active' : ''}`}
                onClick={() => setChatType(value)}
              >
                {key}
              </button>
            ))}
          </div>

          {chatType === CHAT_TYPES.TRANSLATE && (
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="language-select"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Italian">Italian</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Japanese">Japanese</option>
              <option value="Chinese">Chinese</option>
              <option value="Korean">Korean</option>
            </select>
          )}

          <div className="input-container">
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              placeholder={getChatPlaceholder(chatType)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function getChatPlaceholder(chatType) {
  switch (chatType) {
    case CHAT_TYPES.DIALOG:
      return "Start a conversation...";
    case CHAT_TYPES.TRY_SAYING:
      return "Enter a situation for example responses...";
    case CHAT_TYPES.TRANSCRIPT:
      return "Enter text for review...";
    case CHAT_TYPES.TRANSLATE:
      return "Enter text to translate...";
    default:
      return "Type a message...";
  }
}

export default ChatInterface;