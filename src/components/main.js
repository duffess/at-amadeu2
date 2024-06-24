// src/components/Main.js
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import '../css-c/main.css'; // Certifique-se de que o caminho para o CSS esteja correto

function Main() {
  const [searchTerm, setSearchTerm] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Estado para indicar carregamento

  const handleSearch = async () => {
    setIsLoading(true); // Inicia o carregamento
    
    try {
      const response = await fetch(`/api/reviews/${searchTerm}`);
      if (!response.ok) {
        throw new Error('Resenhas não encontradas.');
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Erro ao buscar resenhas:', error);
      alert('Resenhas não encontradas. Verifique o nome do livro e tente novamente.');
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <div className="main">
      <div className="subMain">
        <div className="presentMyself">
          <p className="Apre">Digite um livro:</p>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="button" onClick={handleSearch} disabled={isLoading}>
            {isLoading ? 'Pesquisando...' : 'Pesquisar'} 
          </button>
          <Link className='Link' to="/review"> 
              <button className="button">Criar Nova Resenha</button>
            </Link>
        </div>

        {isLoading ? (
          <p>Carregando...</p> // Mensagem de carregamento
        ) : reviews.length > 0 ? (
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-item">
                {review.coverUrl && ( <img src={review.coverUrl} alt={review.bookName} /> )}
                <h3>{review.bookName}</h3>
                <p>Resenha: {review.review}</p>
                <p>Por: {review.userName} ({review.userEmail})</p>
              </div>
            ))}
          </div>
        ) : (
          <div className='reviews-list'>
            <p>Nenhuma resenha encontrada.</p>
            <Link to="/review"> 
              <button className="button">Criar Nova Resenha</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
