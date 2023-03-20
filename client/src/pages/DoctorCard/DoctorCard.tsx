import React, {useEffect, useState} from 'react';
import {DayView} from "../../components/DayView/DayView";
import {useLocation, useParams} from "react-router-dom";


export const DoctorCard = () => {
  const [doctor, setDoctor] = useState('')
  const location = useLocation()
  const {id} = location.state
  console.log("-> doctorId", id);

  useEffect(() => {
    fetch(`/main/doctor/${id}`)
      .then(response => response.json())
      .then(response => setDoctor(response.readyDocOne))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="doctor__cad flex flex-col w-full mx-auto border rounded py-4 px-6 mt-4 shadow">
      <div className="doctor__card-row-1 flex flex-row justify-between">
        <div className="row-1__column-left flex flex-col justify-between">
          <div className="doctor__card-title text-xl font-semibold">{doctor.name}</div>
          <div className="params gap-2">
            <div className="doctor__card-special text-sm text-gray-500">{doctor.speciality}</div>
            <div className="doctor__card-experience text-sm text-gray-500">стаж: <span
              className="font-semibold">-</span></div>
            <div className="doctor__card-rate text-sm text-gray-500">рейтинг: <span className="font-semibold">{doctor.averageDocRating}</span></div>
            <div className="doctor__card-row-2-clinic text-sm text-gray-500">Клиника: <span className="font-semibold">{doctor.clinic}</span></div>
            <div className="doctor__card-row-2-clinic-address text-sm text-gray-500">Адрес: <span className="font-semibold">г.СПБ, Выборгское ш., 17 </span></div>
          </div>
        </div>
        <div className="row-1__column-right flex border w-[150px] h-[150px] rounded bg-blue-200 items-center justify-center shadow"><img src={doctor.avatar} /></div>
      </div>
      <div className="doctor__card-row-2 mt-6">

        <div className="doctor__card-row-2-doctor-params text-sm text-gray-500 mt-4">О враче: <span className="font-semibold">{doctor.generalInfo}</span></div>
      </div>
      <DayView />
    </div>
  );
};