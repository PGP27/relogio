import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import playIcon from '../images/play.svg';
import pauseIcon from '../images/pause.svg';

const Cronometro = () => {
  const INITIAL_STATE = {
    hora: 0,
    minuto: 0,
    segundo: 0,
    centesimo: 0,
  }
  const [timer, setTimer] = useState(INITIAL_STATE);
  const [cronometroInterval, setCronometroInterval] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => { clearInterval(cronometroInterval) };
  }, [cronometroInterval]);

  const { hora, minuto, segundo, centesimo } = timer;
  let newHora = hora, newMinuto = minuto, newSegundo = segundo, newCentesimo = centesimo;
  
  const runTime = () => {
    if (newCentesimo === 100) {
      newCentesimo = 0;
      newSegundo += 1;
    }
    if (newSegundo === 60) {
      newSegundo = 0;
      newMinuto += 1;
    }
    if (newMinuto === 60) {
      newMinuto = 0;
      newHora += 1;
    }
    newCentesimo += 1;
    return setTimer({
      hora: newHora,
      minuto: newMinuto,
      segundo: newSegundo,
      centesimo: newCentesimo,
    });
  };

  const startTime = () => {
    runTime();
    const interval = setInterval(runTime, 10);
    setCronometroInterval(interval);
    setIsPlaying(true);
  };

  const stopTime = () => {
    clearInterval(cronometroInterval);
    setIsPlaying(false);
  };

  const resetTime = () => {
    clearInterval(cronometroInterval);
    setTimer(INITIAL_STATE);
    setIsPlaying(false);
  };

  let showHora = hora < 10 ? `0${hora}` : hora;
  let showMinuto = minuto < 10 ? `0${minuto}` : minuto;
  let showSegundo = segundo < 10 ? `0${segundo}` : segundo;
  let showCentesimo = centesimo < 10 ? `0${centesimo}` : centesimo;
  
  if (minuto === 60) showHora = 0;
  if (segundo === 60) showSegundo = 0;
  if (centesimo === 100) showCentesimo = 0;

  let showPlay = isPlaying ? 'hidden' : 'block';
  let showPause = isPlaying ? 'block' : 'hidden';
  return (
    <div className="w-full flex flex-col items-center text-center text-xl mt-4 lg:mt-20 lg:text-2xl">
      <div className="w-full flex flex-col text-4xl sm:flex-row sm:justify-center lg:text-6xl">
        <div className="w-full flex justify-center sm:justify-end">
          <span className="w-28">
            { showHora }
          </span>
          <span>:</span>
          <span className="w-28">
            { showMinuto }
          </span>
          <span className="hidden sm:block">:</span>
        </div>
        <div className="w-full flex justify-center sm:justify-start">
          <span className="w-28">
            { showSegundo }
          </span>
          <span>:</span>
          <span className="w-28">
            { showCentesimo }
          </span>
        </div>
      </div>
      <div className="mt-20">
        <button
          onClick={ startTime }
          className={ `${showPlay}` }
        >
          <div className="bg-white rounded-full">
            <img
              src={ playIcon }
              alt="Play icon"
              className="h-20"
            />
          </div>
        </button>
        <button
          onClick={ stopTime }
          className={ `${showPause}` }
        >
          <div className="bg-white rounded-full">
            <img
              src={ pauseIcon }
              alt="Pause icon"
              className="h-20"
            />
          </div>
        </button>
        <button
          onClick={ resetTime }
          className="my-4 hover:underline hover:text-green-300 sm:text-2xl"
        >
          Reset
        </button>
      </div>
      <div className="w-full flex flex-col items-center mt-12 mb-8 sm:flex-row sm:justify-center">
        <Link to="/timer" className="my-4 hover:underline hover:text-green-300 sm:mr-12">Timer</Link>
        <Link to="/" className="my-4 hover:underline hover:text-green-300 sm:ml-12">Relógio</Link>
      </div>
    </div>
  );
};

export default Cronometro;
