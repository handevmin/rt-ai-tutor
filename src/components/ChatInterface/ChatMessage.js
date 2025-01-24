import React from 'react';
import { markdownToHtml } from '../../utils/helpers';

function ChatMessage({ message }) {
 return (
   <div className={`chat-message ${message.type}`}>
     {message.content.image && (
       <img 
         src={message.content.image} 
         alt="Uploaded" 
         className="chat-image" 
       />
     )}
     {message.content.text && (
       <div dangerouslySetInnerHTML={{ __html: markdownToHtml(message.content.text) }} />
     )}
   </div>
 );
}

export default ChatMessage;