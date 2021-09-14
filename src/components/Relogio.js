import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { diasDaSemanaArray } from '../utils';

const Relogio = () => {
  const [date, setDate] = useState();
  const [relogioInterval, setRelogioInterval] = useState();
  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date();
      setDate({
        ano: d.getFullYear(),
        mes: d.getMonth(),
        dia: d.getDate(),
        hora: d.getHours(),
        minuto: d.getMinutes(),
        segundo: d.getSeconds(),
        diaDaSemana: d.getDay(),
      });
    }, 1000);
    setRelogioInterval(interval);
  }, []);

  useEffect(() => {
    return () => { clearInterval(relogioInterval) };
  }, [relogioInterval]);

  if (date) {
    const { ano, mes, dia, hora, minuto, segundo, diaDaSemana } = date;
    const horaFormatada = hora < 10 ? `0${hora}` : hora;
    const minutoFormatado = minuto < 10 ? `0${minuto}` : minuto;
    const segundoFormatado = segundo < 10 ? `0${segundo}` : segundo;
    const diaFormatado = dia < 10 ? `0${dia}` : dia;
    const mesFormatado = mes + 1 < 10 ? `0${mes}` : mes;
    return (
      <div className="w-full flex flex-col items-center text-center text-xl mt-16 lg:mt-20 lg:text-2xl">
        <div className="w-full">
          <div className="w-full flex justify-center text-4xl sm:text-6xl">
            <span className="w-28">
              { horaFormatada }
            </span>
            <span>:</span>
            <span className="w-28">
              { minutoFormatado }
            </span>
            <span>:</span>
            <span className="w-28">
              { segundoFormatado }
            </span>
          </div>
          <div className="w-full flex flex-col items-center my-16 sm:text-2xl sm:flex-row sm:justify-center sm:my-24">
            <span className="w-32 py-4 sm:mr-6">{ diasDaSemanaArray[diaDaSemana] }</span>
            <span className="w-40 py-4 sm:ml-6">{ diaFormatado }/{ mesFormatado }/{ ano }</span>
          </div>
        </div>
        <div className="w-full flex flex-col items-center mt-4 mb-8 sm:flex-row sm:justify-center">
          <Link to="/timer" className="my-4 hover:underline hover:text-green-300 sm:mr-12">Timer</Link>
          <Link to="/cronometro" className="my-4 hover:underline hover:text-green-300 sm:ml-12">Cronômetro</Link>
        </div>
      </div>
    );
  }
  return null;
};

export default Relogio;
