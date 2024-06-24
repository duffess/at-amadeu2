// src/components/BookDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function BookDetail() {
  const { title } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`/api/search?query=${title}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setBook(data[0]);
        } else {
          setBook(null);
        }
      });
  }, [title]);

  if (!book) {
    return (
      <div>
        <p>Nenhuma resenha encontrada para "{title}".</p>
        <button onClick={() => window.location.href = '/add-review'}>Adicionar Resenha</button>
      </div>
    );
  }

  return (
    <div>
      <img src={book.coverUrl} alt={book.bookName} />
      <h2>{book.bookName}</h2>
      <p>{book.review}</p>
      <p>Por: {book.userName} - {book.userEmail}</p>
    </div>
  );
}
