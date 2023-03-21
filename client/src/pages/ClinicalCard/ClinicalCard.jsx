import React, {useEffect, useState, useCallback} from "react";
import {useDispatch, useSelector} from 'react-redux';
import styles from "./clinical.css";
import SelectMenus from "../../components/SelectMenus/SelectMenus";
import {DoctorsTable} from "../../components/DoctorsTable";
import YandexMap from "../../components/Map/Map";
import Rating from "../../components/Rating/Rating";
import {TypesClinic} from "../../redux/types/typesClinic";
import {useParams} from "react-router-dom";

export default function ClinicalCard() {
  const {id} = useParams()
  const [clinic, setClinic] = useState({readyClinic: [], doctors: []});
  
  const data = {id: 1};
  useEffect(() => {
    (async () => {
      const response = await fetch(`/main/clinic/${id}`);
      response.json().then((r) => (setClinic(r)))
    })();
  }, []);
  const [dataRes, setDataRes] = useState(clinic.readyDoctorList);
  const handleClick2 = (e) => {
    const profile = e.target.innerHTML;
    console.log(profile);
    if (profile !== "All doctors") {
      const fill = clinic.readyDoctorList.filter((el) => el.speciality === profile);
      setDataRes(fill);
    } else if (profile === "All doctors") {
      setDataRes(clinic.readyDoctorList);
    }
    console.log(dataRes);
  };
console.log(clinic)
  return (
    <>
      {/* <!-- Head block --> */}
      <div className="flex flex-col justify-center px-6 py-6 mt-4 bg-white border rounded">
        {/* <!-- Title --> */}
        <div className="title">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {clinic.readyClinic[0]?.name}
          </h1>
        </div>

        <div className="flex flex-row mt-4">
          {/* <!-- Image gallery --> */}
          <div
            className="flex flex-col aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
            <img
              src="https://source.unsplash.com/random/?clinic"
              alt="Model wearing plain white basic tee."
              className="h-full w-full object-cover object-center"
            />
          </div>
          {/* <!-- General info --> */}
          <div className="generalInfo flex flex-col mx-4">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xs tracking-tight text-gray-600">
              {clinic.readyClinic[0]?.generalInfo}
            </p>
          </div>
        </div>
        <div className="options flex flex-row justify-between mt-4">
          <div className="flex-col">
            <table>
              <tbody>
              <tr>
                <td>Address:</td>
                <td className="pl-4">{clinic.readyClinic[0]?.address}</td>
              </tr>
              <tr>
                <td>Phone:</td>
                <td className="pl-4">{clinic.readyClinic[0]?.phone}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td className="pl-4">{clinic.readyClinic[0]?.email}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="flex-col">{/* <!-- Reviews --> */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <Rating rat={clinic.readyClinic[0]?.averageClinicRating}/>
                <a
                  href="#"
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Отзывы пациентов
                </a>
              </div>
            </div>
          </div>
        </div>
        <div onClick={handleClick2}>
        {" "}
        <SelectMenus />
      </div>
      
        <DoctorsTable data={dataRes}/>

        <div className="ymaps w-full mt-4">
          <div className="ymap">
            <YandexMap/>
          </div>
        </div>
      </div>
    </>
  )
}
