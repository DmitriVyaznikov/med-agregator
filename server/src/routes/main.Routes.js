const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const router = express.Router();

const {
    GetAllClinicAndDoctors, GetAllClinicAndDoctorsQuery, GetAllSpecialities, GetAllAddresses, NewEntry, GetInfoAboutSlot,
    GetSlotsToDate, ToCurrentTimeSlots, RandomDocClinic, DoctorsShedule
} = require("../controllers/main.Controller");
const tokenToLocals = require("../middleware/reslocalsToken.middleware");
const {DoctorsFromSearch, ExactDoctor, GetAllDoctors} = require("../controllers/doctor.Controller");
const {ExactClinic} = require("../controllers/clinic.Controller");
const {NewUserMessage} = require("../controllers/userAction.Controller");


router.get("/alldata/:inputText", tokenToLocals, GetAllClinicAndDoctors); //* получаем все клиники и врачей ПОСЛЕ ввода в инпут поисковой строки

router.get("/alldataquery", tokenToLocals, GetAllClinicAndDoctorsQuery); //* получаем все клиники и врачей (если юзер залогинен то к эл-там массива добавится инфа о поставленных юзером оценках)

router.get('/specialities', GetAllSpecialities) //* получаем все специальности

router.get('/doctors', GetAllDoctors) //* получаем всех докторов

router.get('/addresses', GetAllAddresses) //* получаем все адреса

router.get("/somedoctors", tokenToLocals, DoctorsFromSearch); //* получаем список врачей после ввода необходимых данных в поиске

router.get('/doctor', tokenToLocals, ExactDoctor); //* получаем доктора после выбора из поисковой выдачи, его расписание, включая приёмы юзера, если последний залогинен

router.get("/clinic", tokenToLocals, ExactClinic); //* получаем клинику после выбора из поисковой выдачи

router.get('/slot/:sheduleId', authenticate, GetInfoAboutSlot) //* инфа о слоте расписания

router.get('/date', tokenToLocals, GetSlotsToDate) //* инфа о слотах на конкретный день

router.patch('/shedule/slots', ToCurrentTimeSlots); //* для эндпоинта со слотами, обновляем старые записи по дате

router.get('/random', RandomDocClinic) //* рандомайзер поиска врача или клиник

router.get('/shedule', tokenToLocals, DoctorsShedule) //* расписание врачей на текущий день





module.exports = router;
