import React from "react";
// import sound from "../assets/metronome.wav";

const Metronome = () => {
  const playSound = () => {
    // new Audio(sound).play();
  };

  return (
    <div>
      <button onClick={playSound}>Метроном</button>
    </div>
  );
};

export default Metronome;
