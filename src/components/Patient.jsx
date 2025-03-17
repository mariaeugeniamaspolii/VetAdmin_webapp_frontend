import usePatients from "../hooks/usePatients";

import Button from "./Button";
const Patient = ({ patient }) => {

    const { setEdit, deletePatient } = usePatients()
    const { _id, name, caretaker, email, animal, age, date, symptoms } = patient;
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC' // Fuerza que se interprete en UTC
        }).format(date);
    };
    

    return (
        <div className="my-5 bg-white shadow-md px-5 py-5 rounded-xl gap-3 justify-between">
            <p className="font-bold text-indigo-600 uppercase my-2">Patient:
                <span className="font-normal text-black capitalize"> {name} </span>
            </p>
            <p className="font-bold text-indigo-600 uppercase my-2">caretaker:
                <span className="font-normal text-black capitalize"> {caretaker} </span>
            </p>
            <p className="font-bold text-indigo-600 uppercase my-2">email:
                <span className="font-normal text-black normal-case"> {email} </span>
            </p>
            <p className="font-bold text-indigo-600 uppercase my-2">animal:
                <span className="font-normal text-black normal-case"> {animal} </span>
            </p>
            <p className="font-bold text-indigo-600 uppercase my-2">age:
                <span className="font-normal text-black normal-case"> {age} </span>
            </p>
            <p className="font-bold text-indigo-600 uppercase my-2">date:
                <span className="font-normal text-black normal-case"> {formatDate(date)} </span>
            </p>
            <p className="font-bold text-indigo-600 uppercase my-2">symptoms:
                <span className="font-normal text-black capitalize"> {symptoms} </span>
            </p>

            <div className="flex justify-between my-5">
                <Button label="edit" onClick={() => setEdit(patient)}/>
                <Button label="delete" onClick={() => deletePatient(_id)} className="bg-red-600 hover:bg-red-700"/>
            </div>
        </div>
    )
}

export default Patient