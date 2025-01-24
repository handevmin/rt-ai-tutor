import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
 const navigate = useNavigate();

 const features = [
   {
     icon: "🎵",
     title: "K-pop 전문가",
     description: "최신 K-pop 트렌드부터 숨은 명곡까지 모두 알고 있어요"
   },
   {
     icon: "📺",
     title: "드라마 마니아",
     description: "핫한 드라마부터 추억의 명작까지 함께 이야기해요"
   },
   {
     icon: "💝",
     title: "친근한 대화",
     description: "K-culture에 대한 모든 대화를 편안하게 나눠요"
   }
 ];

 return (
   <div className="landing-page">
     <div className="landing-content">
       <div className="welcome-message">
         <div className="hero-section">
           <h1>RT AI K-Pop Friend</h1>
           <p className="subtitle">
             당신만의 K-pop & 드라마 이야기 메이트 ✨
           </p>
         </div>

         <div className="features-grid">
           {features.map((feature, index) => (
             <div key={index} className="feature-card">
               <div className="feature-icon">{feature.icon}</div>
               <h3>{feature.title}</h3>
               <p>{feature.description}</p>
             </div>
           ))}
         </div>

         <div className="chat-preview">
           <div className="chat-bubble bot">
             안녕하세요! K-pop과 드라마에 대해 이야기 나눠볼까요? 💕
           </div>
           <div className="chat-bubble user">
             요즘 인기있는 K-pop 곡 추천해주세요!
           </div>
           <div className="chat-bubble bot">
             요즘 핫한 아이브의 'I AM'을 추천드려요! ⭐️
           </div>
         </div>

         <button className="start-chat-btn" onClick={() => navigate('/chat')}>
           대화 시작하기
         </button>
       </div>
     </div>
   </div>
 );
}

export default LandingPage;