// src/components/ReviewForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css-c/reviewform.css';

export default function ReviewForm() {
  const [bookName, setBookName] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [review, setReview] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookName || !coverUrl || !review || !userName || !userEmail) {
      alert('Todos os campos são obrigatórios.');
      return;
    }
  
    const data = { bookName, coverUrl, review, userName, userEmail };
    console.log('Enviando dados:', data);
  
    const response = await fetch('/api/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      alert('Resenha adicionada com sucesso!');
      navigate('/');
    } else {
      alert('Erro ao adicionar a resenha.');
    }
  };
  

  return (
    <div className="review-form-container">
      <h2>Adicionar Resenha</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <input
          type="text"
          placeholder="Nome do livro"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL da capa do livro"
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
        />
        <textarea
          placeholder="Resenha"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <input
          type="text"
          placeholder="Seu nome"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Seu e-mail"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <button type="submit">Inserir Resenha</button>
      </form>
    </div>
  );
}
