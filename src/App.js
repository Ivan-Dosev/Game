import './App.css';
import Cards from './Components/Cards';
import Timer from './Components/Timer';
import { useState, useEffect, useRef } from 'react';
import ConnectWallet from './Components/ConnectWallet';
import Rankingbutton from './Components/RankingButton';
import RestartButton from './Components/Restart-Button';
import Lives from './Components/Heart';
import ModalWithConfetti from './Components/ModalWithConfetti'; 
import FooterButtons from './Components/FooterButton'; 

function App() {
    const [timer, setTimer] = useState(0);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [wallet, setWallet] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [restartCount, setRestartCount] = useState(() => {
        // Retrieve the restart count from localStorage or initialize to 0
        const savedCount = localStorage.getItem('restartCount');
        return savedCount ? parseInt(savedCount, 10) : 0;
    });

    const adContainerRef = useRef(null);

    useEffect(() => {
        console.log('State Update:');
        console.log('Timer:', timer);
        console.log('Is Game Finished:', isGameFinished);
        console.log('Wallet:', wallet);
        console.log('Restart Count:', restartCount);
        if (isGameFinished && timer < 35000) {
            setShowModal(true);
        }
    }, [timer, isGameFinished, wallet]);

    useEffect(() => {
        // Store the restart count in localStorage whenever it changes
        localStorage.setItem('restartCount', restartCount);
    }, [restartCount]);

    useEffect(() => {
        // Load Google AdSense script after every second game
        if (restartCount % 2 === 0 && restartCount !== 0) {
            console.log('Google AdSense ad should be shown');
        }
    }, [restartCount]);

    const handleRestart = () => {
        setRestartCount(prevCount => {
            return prevCount + 1; // Increment the restart count
        });

        window.location.reload(); // Reload the page
    };

    const closeModal = () => {
        setShowModal(false); // Close the modal when called
    };

    return (
        <div className="App">
            <div className="header-container"> {/* Flex container for header */}
                <div className="wallet-button-container">
                    <ConnectWallet setWallet={setWallet} className="ton-connect-button" />
                </div>
                <div className="lives-container"> {/* Wrap lives in a container */}
                    <Lives /> {/* Display lives */}
                </div>
                <div className="ranking-button-container">
                    <Rankingbutton className="ranking-button" />
                </div>
            </div>
            <Timer 
                timer={timer} 
                setTimer={setTimer} 
                isTimerRunning={isTimerRunning} 
                setIsGameFinished={setIsGameFinished} 
            />
            <Cards 
                setTimer={setTimer} 
                setIsGameFinished={setIsGameFinished} 
                setIsTimerRunning={setIsTimerRunning} 
                onRestart={handleRestart}
            />
            {isGameFinished && (
                <div className="button-container">
                    {/* Show Restart button regardless of the time */}
                    <RestartButton onRestart={handleRestart} />
                </div>
            )}

            {/* Modal with confetti and save points button */}
            {showModal && (
                <ModalWithConfetti 
                    wallet={wallet} 
                    points={1000000} 
                    isGameFinished={isGameFinished} 
                    onClose={closeModal} 
                />
            )}
            <FooterButtons /> {/* Add FooterButtons component */}
        </div>
    );
}
export default App;