import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


const section4 = () => {
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [doctors, setDoctors] = useState([]);

    const [formDataSection1, setFormDataSection1] = useState({
        lastName: '',
        firstName: '',
        middleName: '',
        dob: '',
        sex: '',
        healthNumber: '',
        email: ''
    });

    const [mailDataSection1, setMailDataSection1] = useState({
        addressLine1: '',
        addressLine2: '',
        city: '',
        landmark: '',
        postalCode: ''
    })

    const [residenceDataSection1, setResidenceDataSection1] = useState({
        addressLine1R: '',
        addressLine2R: '',
        cityR: '',
        landmarkR: '',
        postalCodeR: ''
    })

    const [formDataC1, setFormDataC1] = useState({
        lastName: '',
        firstName: '',
        middleName: '',
        dob: '',
        sex: '',
        healthNumber: '',
        person: ''
    });

    const [mailDataC1, setMailDataC1] = useState({
        addressLine1: '',
        addressLine2: '',
        city: '',
        landmark: '',
        postalCode: ''
    })

    const [residenceDataC1, setResidenceDataC1] = useState({
        addressLine1R: '',
        addressLine2R: '',
        cityR: '',
        landmarkR: '',
        postalCodeR: ''
    })

    const [formDataC2, setFormDataC2] = useState({
        lastName: '',
        firstName: '',
        middleName: '',
        dob: '',
        sex: '',
        healthNumber: '',
        person: ''
    });

    const [mailDataC2, setMailDataC2] = useState({
        addressLine1: '',
        addressLine2: '',
        city: '',
        landmark: '',
        postalCode: ''
    })

    const [residenceDataC2, setResidenceDataC2] = useState({
        addressLine1R: '',
        addressLine2R: '',
        cityR: '',
        landmarkR: '',
        postalCodeR: ''
    })

    const [formDatasection3, setFormDatasection3] = useState({
        agreeToCommitment: false,
        agreeToReleaseInfo: false,
        agreeToCancellationConditions: false,
        myself: false,
        children: false,
        dependentAdults: false,
        signatureImage: '',
        homeTelephone: '',
        workTelephone: ''
    });

    const [imageSrc, setImageSrc] = useState("");

    const imageURL = localStorage.getItem('imageSrc');

    const insertDataIntoSupabase = async () => {

        //Data from section1
        const storedFormDataSection1 = JSON.parse(localStorage.getItem('formData'));

        const storedMailDataSection1 = JSON.parse(localStorage.getItem('mailData'));

        const storedResidenceDataSection1 = JSON.parse(localStorage.getItem('residenceData'));

        //Data from section2C1
        const storedFormDataC1 = JSON.parse(localStorage.getItem('formDataC1'))|| {};

        const storedMailDataC1 = JSON.parse(localStorage.getItem('mailDataC1'))|| {};

        const storedResidenceDataC1 = JSON.parse(localStorage.getItem('residenceDataC1'))|| {};

        //Data from section2C2
        const storedFormDataC2 = JSON.parse(localStorage.getItem('formDataC2')) || {};

        const storedMailDataC2 = JSON.parse(localStorage.getItem('mailDataC2'))|| {};

        const storedResidenceDataC2 = JSON.parse(localStorage.getItem('residenceDataC2'))|| {};

        //Data from section3
        const storedFormDatasection3 = JSON.parse(localStorage.getItem('formDatasection3')) || {};

        const storedImageSrcsection3 = localStorage.getItem('imageSrc');


        //Data from section4
        const storedDoctor = localStorage.getItem('selectedDoctor');

        console.log(storedImageSrcsection3)

        try {
            // Check if the email already exists
            const { data: existingData, error: existingError } = await supabase
                .from('section1_data')
                .select()
                .eq('email', storedFormDataSection1.email);

            // If no existing record with the same email is found, insert the data
            if (!existingData || existingData.length === 0) {
                const { data: dataSection1, error: errorSection1 } = await supabase
                    .from('section1_data')
                    .insert([
                        {
                            last_name: storedFormDataSection1.lastName,
                            first_name: storedFormDataSection1.firstName,
                            middle_name: storedFormDataSection1.middleName,
                            dob: storedFormDataSection1.dob,
                            sex: storedFormDataSection1.sex,
                            health_number: storedFormDataSection1.healthNumber,
                            email: storedFormDataSection1.email,
                            address_line1: storedMailDataSection1.addressLine1,
                            address_line2: storedMailDataSection1.addressLine2,
                            city: storedMailDataSection1.city,
                            landmark: storedMailDataSection1.landmark,
                            postal_code: storedMailDataSection1.postalCode,
                            address_line1_r: storedResidenceDataSection1.addressLine1R,
                            address_line2_r: storedResidenceDataSection1.addressLine2R,
                            city_r: storedResidenceDataSection1.cityR,
                            landmark_r: storedResidenceDataSection1.landmarkR,
                            postal_code_r: storedResidenceDataSection1.postalCodeR
                        }
                    ]);
            } else {
                // Handle the case where the email already exists
                console.log('section1: Email already exists');
            }


            // Check if the email already exists
            const { data: existingDataC1, error: existingErrorC1 } = await supabase
                .from('section2C1_data')
                .select()
                .eq('email', storedFormDataSection1.email);

            // If no existing record with the same email is found, insert the data
            if (!existingDataC1 || existingDataC1.length === 0) {
                const { data: dataC1, error: errorC1 } = await supabase
                    .from('section2C1_data')
                    .insert([
                        {
                            last_name: storedFormDataC1.lastName || "",
                            first_name: storedFormDataC1.firstName || "",
                            middle_name: storedFormDataC1.middleName || "",
                            dob: storedFormDataC1.dob || "",
                            sex: storedFormDataC1.sex || "",
                            health_number: storedFormDataC1.healthNumber || "",
                            person: storedFormDataC1.person || "",
                            address_line1: storedMailDataC1.addressLine1 || "",
                            address_line2: storedMailDataC1.addressLine2 || "",
                            city: storedMailDataC1.city || "",
                            landmark: storedMailDataC1.landmark || "",
                            postal_code: storedMailDataC1.postalCode || "",
                            address_line1_r: storedResidenceDataC1.addressLine1R || "",
                            address_line2_r: storedResidenceDataC1.addressLine2R || "",
                            city_r: storedResidenceDataC1.cityR || "",
                            landmark_r: storedResidenceDataC1.landmarkR || "",
                            postal_code_r: storedResidenceDataC1.postalCodeR || "",
                            email: storedFormDataSection1.email || ""
                        }
                    ]);
            } else {
                // Handle the case where the email already exists
                console.log('section2C1: Email already exists');
            }


            // Check if the email already exists
            const { data: existingDataC2, error: existingErrorC2 } = await supabase
                .from('section2C2_data')
                .select()
                .eq('email', storedFormDataSection1.email);

            // If no existing record with the same email is found, insert the data
            if (!existingDataC2 || existingDataC2.length === 0) {
                const { data: dataC2, error: errorC2 } = await supabase
                    .from('section2C2_data')
                    .insert([
                        {
                            last_name: storedFormDataC2.lastName || "",
                            first_name: storedFormDataC2.firstName || "",
                            middle_name: storedFormDataC2.middleName || "",
                            dob: storedFormDataC2.dob || "",
                            sex: storedFormDataC2.sex || "",
                            health_number: storedFormDataC2.healthNumber || "",
                            person: storedFormDataC2.person || "",
                            address_line1: storedMailDataC2.addressLine1 || "",
                            address_line2: storedMailDataC2.addressLine2 || "",
                            city: storedMailDataC2.city || "",
                            landmark: storedMailDataC2.landmark || "",
                            postal_code: storedMailDataC2.postalCode || "",
                            address_line1_r: storedResidenceDataC2.addressLine1R || "",
                            address_line2_r: storedResidenceDataC2.addressLine2R || "",
                            city_r: storedResidenceDataC2.cityR || "",
                            landmark_r: storedResidenceDataC2.landmarkR || "",
                            postal_code_r: storedResidenceDataC2.postalCodeR || "",
                            email: storedFormDataSection1.email || ""
                        }
                    ]);
            } else {
                // Handle the case where the email already exists
                console.log('section2C2: Email already exists');
            }


            // Check if the email already exists
            const { data: existingDataSection3, error: existingErrorSection3 } = await supabase
                .from('section3_data')
                .select()
                .eq('email', storedFormDataSection1.email);

            // If no existing record with the same email is found, insert the data
            if (!existingDataSection3 || existingDataSection3.length === 0) {
                const { data: dataSection3, error: errorSection3 } = await supabase
                    .from('section3_data')
                    .insert([
                        {
                            agree_to_commitment: storedFormDatasection3.agreeToCommitment,
                            agree_to_release_info: storedFormDatasection3.agreeToReleaseInfo,
                            agree_to_cancellation_conditions: storedFormDatasection3.agreeToCancellationConditions,
                            myself: storedFormDatasection3.myself,
                            children: storedFormDatasection3.children,
                            dependent_adults: storedFormDatasection3.dependentAdults,
                            signature_image: storedImageSrcsection3,
                            home_telephone: storedFormDatasection3.homeTelephone,
                            work_telephone: storedFormDatasection3.workTelephone,
                            email: storedFormDataSection1.email
                        }
                    ]);
            } else {
                // Handle the case where the email already exists
                console.log('section3: Email already exists');
            }


            // Check if the email already exists
            const { data: existingDataSection4, error: existingErrorSection4 } = await supabase
                .from('section4_data')
                .select()
                .eq('email', storedFormDataSection1.email);

            // If no existing record with the same email is found, insert the data
            if (!existingDataSection4 || existingDataSection4.length === 0) {
                const { data: dataSection4, error: errorSection4 } = await supabase
                    .from('section4_data')
                    .insert([
                        {
                            selected_doctor: storedDoctor,
                            email: storedFormDataSection1.email
                        }
                    ]);
            } else {
                // Handle the case where the email already exists
                console.log('Section4: Email already exists');
            }


            // Handle errors if any
            if (errorSection1 || errorC1 || errorC2 || errorSection3 || errorSection4) {
                throw new Error('Error inserting data into Supabase');
            } else {
                console.log('Data inserted successfully');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }

    };

    useEffect(() => {
        // Retrieve locally stored doctor's name
        const storedDoctor = localStorage.getItem('selectedDoctor');
        if (storedDoctor) {
            setSelectedDoctor(storedDoctor);
        }

        // Fetch list of doctors (replace this with your logic to fetch doctors)
        // For demonstration purposes, an array of sample doctors is used here
        const sampleDoctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams'];
        setDoctors(sampleDoctors);
    }, []);

    const handleDoctorChange = (e) => {
        setSelectedDoctor(e.target.value);
        localStorage.setItem('selectedDoctor', e.target.value);
    };

    const handleGeneratePDF = () => {
        // Validate doctor selection
        if (!selectedDoctor) {
            alert('Please choose a doctor.');
            return;
        }
    };

    return (
        <div className='border flex flex-col gap-4 items-center mt-10 shadow-md mx-24 py-7 rounded-md'>
            <div>
                <h1 className='font-bold '>Choose a Doctor:</h1>
            </div>
            <div>
                <label htmlFor="doctor">Choose Doctor:</label>
                <select id="doctor" value={selectedDoctor} onChange={handleDoctorChange}>
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor, index) => (
                        <option key={index} value={doctor}>{doctor}</option>
                    ))}
                </select>
            </div>
            <button onClick={insertDataIntoSupabase} className='border p-2 mx-auto rounded-md mt-5 hover:bg-gray-400 transition-all ease-out hover:scale-110'>Generate PDF</button>
        </div>
    );
};

export default section4;
