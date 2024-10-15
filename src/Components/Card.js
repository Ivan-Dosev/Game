import React from 'react';

export default function Card({ card, onClick }) {
    return (
        <div className="card" onClick={onClick}>
            {/* Show emoji if the card is flipped or matched, otherwise show a placeholder */}
            {card.status === 'flipped' || card.status === 'matched' ? (
                <span className="emoji">{card.img}</span>
            ) : (
                <span className="placeholder"></span> // Back of the card
            )}
        </div>
    );
}