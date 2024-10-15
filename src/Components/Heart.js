const Lives = ({ count }) => {
    const texts = Array(count).fill('Complete under 15 sec to get 1M💧'); // Fill an array with the text based on the count

    return (
        <div className="lives-container">
            {texts.map((text, index) => (
                <span key={index} className="life-text">{text}</span> // Apply the CSS class
            ))}
        </div>
    );
};

export default Lives;
