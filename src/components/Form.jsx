import { useState, useEffect } from "react";
import usePatients from "../hooks/usePatients";

import Button from "../components/Button";
import Alert from "../components/Alert";

const Form = () => {
    const [name, setName] = useState('')
    const [caretaker, setCaretaker] = useState('')
    const [email, setEmail] = useState('')
    const [symptoms, setSymptoms] = useState('')
    const [date, setDate] = useState('')
    const [animal, setAnimal] = useState('dog')
    const [age, setAge] = useState('')

    const [id, setId] = useState('')

    const [showOtherInput, setShowOtherInput] = useState(false);
    const [alert, setAlert] = useState('')

    const { savePatient, patient } = usePatients()

    useEffect(() => {
        if (patient?.name) {
            const formattedDate = new Date(patient.date).toISOString().split("T")[0];

            setName(patient.name)
            setCaretaker(patient.caretaker)
            setEmail(patient.email)
            setAnimal(patient.animal)
            setAge(patient.age)
            setSymptoms(patient.symptoms)
            setDate(formattedDate)

            setId(patient._id)
        }
    }, [patient])

    const handleAnimalChange = (e) => {
        const selectedAnimal = e.target.value;
        // Show additional input if "other" option is selected
        if (selectedAnimal === 'other') {
            setShowOtherInput(true);
            setAnimal('other'); // Set animal to 'other' when 'other' option is selected
        } else {
            setShowOtherInput(false);
            setAnimal(selectedAnimal);
        }
    };


    const handleSubmit = e => {
        e.preventDefault();

        if ([name, caretaker, email, date, symptoms, age, animal].includes('')) {
            setAlert({
                msg: 'All fields are required',
                type: 'error'
            })
            return
        }

        const selectedAnimal = animal.trim() === '' ? 'dog' : animal;

        const formattedDate = new Date(date + "T00:00:00").toISOString().split("T")[0];
        setDate(formattedDate);


        setAlert({
            msg: id ? 'Patient edited' : 'Patient saved',
            type: 'success'
        })
        setTimeout(() => {
            setAlert(null);
        }, 4000);

        savePatient({ name, caretaker, email, date: formattedDate, symptoms, age, animal: selectedAnimal, id });
        setName('')
        setCaretaker('')
        setEmail('')
        setAnimal('dog')
        setAge('')
        setSymptoms('')
        setDate('')
    }

    return (
        <>
            <h2 className="font-black text-3xl text-center capitalize">Patient chart</h2>

            <p className="text-xl mt-5 mb-10 text-center capitalize">Add your <b className="text-indigo-600">Patients</b> and manage them</p>

            <form className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md">

                {alert && alert.msg && <Alert alert={alert} />}
                
                <div className="mb-5 mt-5">
                    <label htmlFor="name" className="text-gray-700 uppercase font-bold">Pet Name</label>
                    <input type="text" name="name" id="name" placeholder="Pet Name" className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
                        value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label htmlFor="caretaker" className="text-gray-700 uppercase font-bold">Caretaker</label>
                    <input type="text" name="caretaker" id="caretaker" placeholder="Caretaker" className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
                        value={caretaker} onChange={e => setCaretaker(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email</label>
                    <input type="text" name="email" id="email" placeholder="Email" className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
                        value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label htmlFor="animal" className="text-gray-700 uppercase font-bold">Animal</label>
                    <select className="block border-2 w-full p-2 placeholder-gray-400 rounded-md"
                        value={animal}
                        onChange={handleAnimalChange}
                    >
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="bird">Bird</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                {showOtherInput && (
                    <div className="mb-5">
                        <label htmlFor="animal" className="text-gray-700 uppercase font-bold">Animal</label>
                        <input type="text" name="animal" id="animal" placeholder="Animal" className="border-2 w-full p-2 placeholder-gray-400 rounded-md capitalize"
                            value={animal} onChange={e => setAnimal(e.target.value)} />
                    </div>
                )}
                <div className="mb-5">
                    <label htmlFor="age" className="text-gray-700 uppercase font-bold">Age</label>
                    <input type="text" name="age" id="age" placeholder="Age" className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
                        value={age} onChange={e => setAge(e.target.value)} />
                </div>

                <div className="mb-5">
                    <label htmlFor="symptoms" className="text-gray-700 uppercase font-bold">Symptoms</label>
                    <textarea id="symptoms" placeholder="Symptoms" className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
                        value={symptoms} onChange={e => setSymptoms(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label htmlFor="date" className="text-gray-700 uppercase font-bold">Discharge date</label>
                    <input type="date" name="date" id="date" className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
                        value={date} onChange={e => setDate(e.target.value)} />

                </div>
                <Button onClick={handleSubmit} label={id ? "Save changes" : "Add patient"} />

            </form>
        </>
    )
}

export default Form