import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/axios";
import useAuth from "../hooks/useAuth";

const PatientsContext = createContext()

export const PatientsProvider = ({ children }) => {

    const [patients, setPatients] = useState([])
    const [patient, setPatient] = useState({})

    const {auth} = useAuth();

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const getPatients = async () => {
            if (!auth?._id) {
                setLoading(false);
                return;
            }
    
            try {
                const token = localStorage.getItem('apv_token');
                if (!token) {
                    setLoading(false);
                    return;
                }
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                };
    
                const { data } = await axiosClient('/patients/mypatients', config);
                setPatients(data);
            } catch (error) {
                console.log('Error fetching patients:', error);
            } finally {
                setLoading(false); // ⬅ Se detiene el loading después de obtener los datos
            }
        };
    
        getPatients();
    }, [auth]);
    

    //ALL PATIENTS
//     const getPatients = async () => {
//         try {
//             const token = localStorage.getItem('apv_token')
//             if (!token) return
//             const config = {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 }
//             }
//             const { data } = await axiosClient('/patients', config)
//             // console.log('DATA: ', data);
//             setPatients(data);
//         } catch (error) {

//         }
//     }
//     getPatients()
// }, [auth])

    const savePatient = async (patient) => {

        const token = localStorage.getItem('apv_token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }

        if (patient.id) {
            try {
                const { data } = await axiosClient.put(`/patients/${patient.id}`, patient, config)

                const updatedPatients = patients.map(patientState => patientState._id === data.patient._id ? data.patient : patientState)

                setPatients(updatedPatients);

            } catch (error) {
                console.log('error: ', error);

            }

        } else {
            try {
                const { data } = await axiosClient.post('/patients', patient, config)
                // console.log('DATA POST: ', data);
                const { createdAt, updatedAt, __v, ...savedPatient } = data

                setPatients([savedPatient, ...patients])
            } catch (error) {
                console.log(error); // Agregar esta línea para imprimir el error en la consola
                console.log('error: ', error.response.data.msg);
            }
        }
    }

    const setEdit = (patient) => {
        setPatient(patient)

    }

    const deletePatient = async id => {
        const confirmation = confirm(`Are you sure you want to delete?`)
        // console.log('confirmation: ', confirmation);
        // console.log('id: ', id);

        if (confirmation) {
            try {
                const token = localStorage.getItem('apv_token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await axiosClient.delete(`/patients/${id}`, config)
                // console.log('data: ', data);

                const updatedPatients = patients.filter( patientsState => patientsState._id !== id)
                setPatients(updatedPatients)

            } catch (error) {
                console.log(error)
            }
        }

    }

    return (
        <PatientsContext.Provider
            value={{
                patients,
                savePatient,
                setEdit,
                patient,
                deletePatient,

            }}
        >
            {children}
        </PatientsContext.Provider>
    )
}

export default PatientsContext;