import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import playIcon from '../images/play.svg';
import pauseIcon from '../images/pause.svg';

const Timer = () => {
  const INITIAL_STATE = {
    hora: 0,
    minuto: 0,
    segundo: 0,
  };

  const [timer, setTimer] = useState(INITIAL_STATE);
  const [timerInterval, setTimerInterval] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const { hora, minuto, segundo } = timer;
  let newHora = hora, newMinuto = minuto, newSegundo = segundo;

  useEffect(() => {
    if (hora === 0 && minuto === 0 && segundo === 0) {
      clearInterval(timerInterval);
      setTimer({
        hora: 0,
        minuto: 0,
        segundo: 0,
      });
      setIsPlaying(false);
    }
  }, [hora, minuto, segundo, timerInterval]);

  useEffect(() => {
    return () => { clearInterval(timerInterval) };
  }, [timerInterval]);

  const changeTimer = ({ target }) => {
    const digit = target.innerText;
    newHora = parseInt(`${parseInt(newHora % 10)}${parseInt(newMinuto / 10)}`);
    newMinuto = parseInt(`${parseInt(newMinuto % 10)}${parseInt(newSegundo / 10)}`);
    newSegundo = parseInt(`${parseInt(newSegundo % 10)}${parseInt(digit)}`);
    setTimer({
      hora: newHora,
      minuto: newMinuto,
      segundo: newSegundo,
    });
  };

  const clearTimer = () => {
    setTimer(INITIAL_STATE);
  };

  const runTime = () => {
    if (newHora > 0 || newMinuto > 0 || newSegundo > 0) {
      if (newSegundo >= 60) {
        newMinuto += parseInt(newSegundo / 60);
        newSegundo = parseInt(newSegundo % 60);
      }
      if (newSegundo === 0) {
        if (newMinuto > 0) {
          newSegundo = 60;
          newMinuto -= 1;
        } else if (newHora > 0) {
          newSegundo = 60;
          newMinuto = 59;
          newHora -=1;
        } else {
          resetTime();
        }
      }
      if (newMinuto >= 60) {
        newHora += parseInt(newMinuto / 60);
        newMinuto = parseInt(newMinuto % 60);
      }
      if (newMinuto === -1) {
        if (newHora > 0) {
          newMinuto = 59;
          newHora -=1;
        } else {
          newMinuto = 0;
        }
      }
      newSegundo -= 1;
      return setTimer({
        hora: newHora,
        minuto: newMinuto,
        segundo: newSegundo,
      });
    }
  };

  const startTime = () => {
    if (newHora > 0 || newMinuto > 0 || newSegundo > 0) {
      runTime();
      const interval = setInterval(runTime, 1000);
      setTimerInterval(interval);
      setIsPlaying(true);
    }
  };

  const stopTime = () => {
    clearInterval(timerInterval);
    setIsPlaying(false);
  };

  const resetTime = () => {
    clearInterval(timerInterval);
    setTimer(INITIAL_STATE);
    setIsPlaying(false);
  };

  let showHora = hora < 10 ? `0${hora}` : hora;
  let showMinuto = minuto < 10 ? `0${minuto}` : minuto;
  let showSegundo = segundo < 10 ? `0${segundo}` : segundo;

  let showPlay = isPlaying ? 'hidden' : 'block';
  let showPause = isPlaying ? 'block' : 'hidden';

  return (
    <div className="w-full flex flex-col items-center text-center text-lg mt-4 lg:mt-20">
      <div className="w-full flex justify-center text-4xl lg:text-6xl">
        <span className="w-28">
          { showHora }
        </span>
        <span>:</span>
        <span className="w-28">
          { showMinuto }
        </span>
        <span>:</span>
        <span className="w-28">
          { showSegundo }
        </span>
      </div>
      { !isPlaying && (
        <div className="w-full flex flex-col text-2xl lg:text-4xl lg:mt-6">
          <div className="w-full flex justify-center mt-6 lg:mt-10">
            <button
              className="flex justify-center items-center h-10 w-10 mx-2 rounded-full cursor-pointer hover:shadow-lg hover:bg-gray-500 transition lg:h-12 lg:w-12"
              onClick={ changeTimer }
            >
              1
            </button>
            <button
              className="flex justify-center items-center h-10 w-10 mx-2 rounded-full cursor-pointer hover:shadow-lg hover:bg-gray-500 transition lg:h-12 lg:w-12"
              onClick={ changeTimer }
            >
              2
            </button>
            <button
              className="flex justify-center items-center h-10 w-10 mx-2 rounded-full cursor-pointer hover:shadow-lg hover:bg-gray-500 transition lg:h-12 lg:w-12"
              onClick={ changeTimer }
            >
              3
            </button>
          </div>
          <div className="w-full flex justify-center mt-4 lg:mt-10">
            <button
              className="flex justify-center items-center h-10 w-10 mx-2 rounded-full cursor-pointer hover:shadow-lg hover:bg-gray-500 transition lg:h-12 lg:w-12"
              onClick={ changeTimer }
            >
              4
            </button>
            <button
              className="flex justify-center items-center h-10 w-10 mx-2 rounded-full cursor-pointer hover:shadow-lg hover:bg-gray-500 transition lg:h-12 lg:w-12"
              onClick={ changeTimer }
            >
              5
            </button>
            <button
              className="flex justify-center items-center h-10 w-10 mx-2 rounded-full cursor-pointer hover:shadow-lg hover:bg-gray-500 transition lg:h-12 lg:w-12"
              onClick={ changeTimer }
            >
              6
            </button>
          </div>
          <div className="w-full flex justify-center mt-4 lg:mt-10">
            <button
              className="flex justify-center items-center h-10 w-10 mx-2 rounded-full cursor-pointer hover:shadow-lg hover:bg-gray-500 transition lg:h-12 lg:w-12"
              onClick={ changeTimer }
            >
              7
            </button>
            <button
              className="flex justify-center items-center h-10 w-10 mx-2 rounded-full cursor-pointer hover:shadow-lg hover:bg-gray-500 transition lg:h-12 lg:w-12"
              onClick={ changeTimer }
            >
              8
            </button>
            <button
              className="flex justify-center items-center h-10 w-10 mx-2 rounded-full cursor-pointer hover:shadow-lg hover:bg-gray-500 transition lg:h-12 lg:w-12"
              onClick={ changeTimer }
            >
              9
            </button>
          </div>
          <div className="w-full flex justify-center mt-4 lg:mt-10">
            <button
              className="flex justify-center items-center h-10 w-10 mx-2 rounded-full cursor-pointer hover:bg-gray-500 transition lg:h-12 lg:w-12"
              onClick={ changeTimer }
            >
              0
            </button>
            <button
              className="flex justify-center items-center h-10 w-10 mx-2 rounded-full cursor-pointer hover:bg-gray-500 transition lg:h-12 lg:w-12"
              onClick={ clearTimer }
            >
              X
            </button>
          </div>
        </div>
      ) }
      <div className="flex flex-col items-center mt-6 lg:mt-16">
        <button
          onClick={ startTime }
          className={ `${showPlay}` }
        >
          <div className="bg-white rounded-full">
            <img
              src={ playIcon }
              alt="Play icon"
              className="h-16 lg:h-20"
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
              className="h-16 lg:h-20"
            />
          </div>
        </button>
        <button
          onClick={ resetTime }
          className="my-4 hover:underline hover:text-green-300 lg:text-2xl"
        >
          Reset
        </button>
      </div>
      <div className="w-full flex flex-col items-center lg:flex-row lg:justify-center lg:text-2xl lg:mt-8">
        <Link to="/cronometro" className="my-4 hover:underline hover:text-green-300 lg:mr-12 ">Cronômetro</Link>
        <Link to="/" className="my-4 hover:underline hover:text-green-300 lg:ml-12">Relógio</Link>
      </div>
    </div>
  );
};

export default Timer;
