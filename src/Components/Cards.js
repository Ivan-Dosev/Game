import { useState, useEffect } from 'react';
import Card from './Card';

export default function Cards({ setTimer, setIsGameFinished}) {
    const emojis = ['🍕', '🍔', '🍟', '🍣', '🍪', '🍩', '🍰', '🍫', '🍿', '🍇', 
                    '🍉', '🍋', '🥝', '🍑', '🥭', '🍒', '🍎', '🍌', '🍍', '🥗',
                    '🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🦁', '🦄', '💻'];

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const generateCards = () => {
        const selectedEmojis = shuffleArray(emojis).slice(0, 8);
        let cards = selectedEmojis.flatMap((emoji, index) => [
            { id: index, status: 'hidden', img: emoji },
            { id: index, status: 'hidden', img: emoji },
        ]);
        return shuffleArray(cards);
    };

    const [cards, setCards] = useState(generateCards);
    const [selectedCards, setSelectedCards] = useState([]);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 100);
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, setTimer]);

    useEffect(() => {
        if (cards.every(card => card.status === 'matched')) {
            setIsGameFinished(true);
            setIsTimerRunning(false);
        }
    }, [cards, setIsGameFinished, setIsTimerRunning]);

    const handleCardClick = (index) => {
        const clickedCard = cards[index];

        // Start timer on the first card click
        if (!isTimerRunning) {
            setIsTimerRunning(true);
        }
    
        // Ignore clicks if the card is already matched or two cards are already selected
        if (clickedCard.status === 'matched' || selectedCards.length === 2) {
            return;
        }
    
        const newCards = cards.map((card, idx) => 
            idx === index ? { ...card, status: 'flipped' } : card
        );
        setCards(newCards);
        setSelectedCards([...selectedCards, index]);
    
        // Check if this is the second last unmatched card
        const unmatchedCards = newCards.filter(card => card.status !== 'matched');
        
        if (unmatchedCards.length === 2 && selectedCards.length === 1) {
            // Stop the timer immediately after the second unmatched card is clicked
            setIsTimerRunning(false); // Stop the timer
            setIsGameFinished(true);
        }
    
        // Check if two cards are selected to compare them
        if (selectedCards.length === 1) {
            // This is the second card clicked, you can compare here
            setTimeout(() => {
                const updatedCards = newCards.map((card, idx) =>
                    idx === selectedCards[0] || idx === index
                        ? { ...card, status: 'flipped' }
                        : card
                );
    
                setCards(updatedCards);
                setSelectedCards([]);
            }, 1000); // Delay for showing the second card
        }
    };    

    useEffect(() => {
        if (selectedCards.length === 2) {
            const [firstIndex, secondIndex] = selectedCards;
            const firstCard = cards[firstIndex];
            const secondCard = cards[secondIndex];
    
            if (firstCard.id === secondCard.id) {
                setTimeout(() => {
                    const newCards = cards.map((card, index) =>
                        index === firstIndex || index === secondIndex
                            ? { ...card, status: 'matched' }
                            : card
                    );
                    setCards(newCards);
                    setSelectedCards([]);
                    // You may want to update the timer or perform other actions here if needed
                }, 1000);
            } else {
                setTimeout(() => {
                    const newCards = cards.map((card, index) =>
                        index === firstIndex || index === secondIndex
                            ? { ...card, status: 'hidden' }
                            : card
                    );
                    setCards(newCards);
                    setSelectedCards([]);
                }, 1000);
            }
        }
    }, [selectedCards, cards]);

    return (
        <div className="container">
        {cards.map((card, index) => (
            <Card
                key={index}
                card={card}
                index={index}
                onClick={() => handleCardClick(index)}
            />
        ))}
    </div>
    );
}