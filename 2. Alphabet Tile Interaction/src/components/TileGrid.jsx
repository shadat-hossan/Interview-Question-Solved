import React, { useState, useEffect } from 'react';
import './tileGrid.css';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const TileGrid = () => {
  const [outputString, setOutputString] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      const keyPressed = event.key.toUpperCase();
      if (alphabet.includes(keyPressed)) {
        handleTileClick(keyPressed);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [outputString]);

  const handleTileClick = (letter) => {
    let newOutput = outputString + letter;
    newOutput = newOutput.replace(/(.)\1{2,}/g, match => '_'.repeat(match.length));
    setOutputString(newOutput);
  };

  return (
    <div className='tile-container'>
      <h2>Alphabet Tile Interaction</h2>
      <div className="tile-grid">
        {alphabet.map(letter => (
          <div key={letter} className="tile" onClick={() => handleTileClick(letter)}>
            {letter}
          </div>
        ))}
      </div>
      <div id="outputString"> Result: {outputString}</div>
    </div>
  );
};

export default TileGrid;
