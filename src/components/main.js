import React from 'react';
import '../css-c/main.css';

export default function Main() {
  return (
    <div className="main">
        <div className='subMain'>
            <div className='presentMyself' >
                <p className='Apre' >Digite um livro</p>
                <input type='text'></input>
                <button className='button' > Pesquisar </button>
            </div>            
        </div>
    </div>
  );
}
