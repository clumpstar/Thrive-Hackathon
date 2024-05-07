import Link from 'next/link';
import React from 'react';
import { useState, useEffect } from 'react';
import { FaTrashAlt, FaArrowRight } from 'react-icons/fa'; // Import FontAwesome icons


const section2C2 = () => {

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


    // Load data from localStorage when the component mounts
    useEffect(() => {
        const storedFormData = localStorage.getItem('formDataC2');
        if (storedFormData) {
            setFormDataC2(JSON.parse(storedFormData));
        }

        const storedMailData = localStorage.getItem('mailDataC2');
        if (storedMailData) {
            setMailDataC2(JSON.parse(storedMailData));
        }

        const storedResidenceData = localStorage.getItem('residenceDataC2');
        if (storedResidenceData) {
            setResidenceDataC2(JSON.parse(storedResidenceData));
        }
    }, []);

    const handleChangeC2 = (e) => {
        const { id, value } = e.target;
        let formattedValue;
        if (id === 'healthNumber') {
            formattedValue = value.replace(/\D/g, '').slice(0, 10);
        } else if (id === 'lastName' || id === 'firstName' || id === 'middleName') {
            // For other fields, allow only alphabets and spaces
            formattedValue = value.replace(/[^A-Za-z\s]/g, '').slice(0, 25)
        } else if (id === 'dob' || id === 'sex' || id === 'person') {
            // console.log({id, value})
            formattedValue = value
        }

        setFormDataC2({
            ...formDataC2,
            [id]: formattedValue
        });
        // console.log(formData)

        localStorage.setItem('formDataC2', JSON.stringify({
            ...formDataC2,
            [id]: formattedValue
        }));
    };

    const handleAddressChangeC2 = (e) => {
        const { id, value } = e.target;
        let formattedValue;
        if (id === 'postalCode') {
            formattedValue = value.replace(/\D/g, '');
        } else {
            formattedValue = value.replace(/[^A-Za-z,\s0-9]/g, '').slice(0, 50);
        }

        setMailDataC2({
            ...mailDataC2,
            [id]: formattedValue
        });

        localStorage.setItem('mailDataC2', JSON.stringify({
            ...mailDataC2,
            [id]: formattedValue
        }));
    }

    const handleResidenceAddressChangeC2 = (e) => {
        const { id, value } = e.target;
        let formattedValue;
        if (id === 'postalCodeR') {
            formattedValue = value.replace(/\D/g, '');
        } else {
            formattedValue = value.replace(/[^A-Za-z,\s0-9]/g, '').slice(0, 50);
        }

        setResidenceDataC2({
            ...residenceDataC2,
            [id]: formattedValue
        });

        localStorage.setItem('residenceDataC2', JSON.stringify({
            ...residenceDataC2,
            [id]: formattedValue
        }));
    }


    const handleClear = () => {
        // Clear formData from localStorage
        localStorage.removeItem('formDataC2');
        // Clear residenceData from localStorage
        localStorage.removeItem('residenceDataC2');
        // Clear mailData from localStorage
        localStorage.removeItem('mailDataC2');

        // Reset the formData state
        setFormDataC2({
            lastName: '',
            firstName: '',
            middleName: '',
            dob: '',
            sex: '',
            healthNumber: '',
            person: ''
        });

        // Reset the residenceData state
        setResidenceDataC2({
            addressLine1R: '',
            addressLine2R: '',
            cityR: '',
            landmarkR: '',
            postalCodeR: ''
        });

        // Reset the mailData state
        setMailDataC2({
            addressLine1: '',
            addressLine2: '',
            city: '',
            landmark: '',
            postalCode: ''
        });
    };

    const handleCheckboxChangeM = (e) => {
        if (e.target.checked) {
            // Retrieve mailData from localStorage
            const storedMailData = JSON.parse(localStorage.getItem('mailData'));

            // If mailData exists in localStorage, update mailDataC1 with its values
            if (storedMailData) {
                const updatedMailDataC2 = {
                    addressLine1: storedMailData.addressLine1 || '',
                    addressLine2: storedMailData.addressLine2 || '',
                    city: storedMailData.city || '',
                    landmark: storedMailData.landmark || '',
                    postalCode: storedMailData.postalCode || ''
                };
                setMailDataC2(updatedMailDataC2);

                // Store mailDataC1 in localStorage
                localStorage.setItem('mailDataC2', JSON.stringify(updatedMailDataC2));
            }
        } else {
            // Clear mailDataC1 when checkbox is unchecked
            setMailDataC2({
                addressLine1: '',
                addressLine2: '',
                city: '',
                landmark: '',
                postalCode: ''
            });

            // Remove mailDataC1 from localStorage
            localStorage.removeItem('mailDataC2');
        }
    };

    const handleCheckboxChangeR = (e) => {
        if (e.target.checked) {
            // Get residenceData from localStorage
            const storedResidenceData = JSON.parse(localStorage.getItem('residenceData')) || {};

            // Write the collected data into residenceDataC1
            const updatedResidenceDataC2 = {
                addressLine1R: storedResidenceData.addressLine1R || '',
                addressLine2R: storedResidenceData.addressLine2R || '',
                cityR: storedResidenceData.cityR || '',
                landmarkR: storedResidenceData.landmarkR || '',
                postalCodeR: storedResidenceData.postalCodeR || ''
            };
            setResidenceDataC2(updatedResidenceDataC2);

            // Store the updated residenceDataC1 in localStorage
            localStorage.setItem('residenceDataC2', JSON.stringify(updatedResidenceDataC2));
        } else {
            // Clear residenceDataC1 when checkbox is unchecked
            setResidenceDataC2({
                addressLine1R: '',
                addressLine2R: '',
                cityR: '',
                landmarkR: '',
                postalCodeR: ''
            });

            // Remove residenceDataC1 from localStorage
            localStorage.removeItem('residenceDataC2');
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(residenceDataC2)
    }

    return (
        <section id="section-1" className="p-4">
            <div className='mx-24 mt-11'>
                <form>
                    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-20 gap-10">
                        <div className="relative h-10 w-full min-w-[200px]">
                            <input
                                type="text"
                                id="lastName"
                                value={formDataC2.lastName}
                                onChange={handleChangeC2}
                                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                placeholder=" " required /><label
                                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Last Name <span className="text-red-500">*</span>
                            </label>
                        </div>

                        <div className="relative h-10 w-full min-w-[200px]">
                            <input
                                type="text"
                                id="firstName"
                                value={formDataC2.firstName}
                                onChange={handleChangeC2}
                                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                placeholder=" " required /><label
                                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">First Name <span className="text-red-500">*</span>
                            </label>
                        </div>

                        <div className="relative h-10 w-full min-w-[200px]">
                            <input
                                type="text"
                                id="middleName"
                                value={formDataC2.middleName}
                                onChange={handleChangeC2}
                                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                placeholder=" " required /><label
                                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Middle Name <span className="text-red-500">*</span>
                            </label>
                        </div>

                        <div className="relative h-10 w-full min-w-[200px]">
                            <input
                                type="date"
                                id="dob"
                                onChange={handleChangeC2}
                                value={formDataC2.dob}
                                className="peer h-full w-full rounded-[7px] border border-gray-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-none disabled:border-0 disabled:bg-blue-gray-50 placeholder-opacity-0 focus:placeholder-opacity-100"
                                required
                            />
                            <label
                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-400 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                htmlFor="dob"
                            >
                                Date of Birth <span className="text-red-500">*</span>
                            </label>
                        </div>

                        <div className="relative h-10 w-full min-w-[200px]">
                            <select
                                id="sex"
                                value={formDataC2.sex}
                                onChange={handleChangeC2}
                                className="peer h-full w-full rounded-[7px] border border-gray-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-none disabled:border-0 disabled:bg-blue-gray-50 placeholder-opacity-0 focus:placeholder-opacity-100"
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <label
                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-400 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                htmlFor="sex"
                            >
                                Sex <span className="text-red-500">*</span>
                            </label>
                        </div>

                        <div className="relative h-10 w-full min-w-[200px]">
                            <input
                                type="text"
                                id="healthNumber"
                                value={formDataC2.healthNumber}
                                onChange={handleChangeC2}
                                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                placeholder=" " required /><label
                                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Health Number <span className="text-red-500">*</span>
                            </label>
                        </div>

                        <div className="relative">
                            <h1 className="text-center">I am this person's</h1>
                            <select
                                id='person'
                                value={formDataC2.person}
                                onChange={handleChangeC2}
                                className="block w-full border border-gray-300 rounded-md py-2 px-4 mt-2 focus:outline-none focus:border-indigo-500"
                            >
                                <option value="">Select</option>
                                <option value="parent">Parent</option>
                                <option value="guardian">Guardian</option>
                                <option value="attorney">Attorney for Personal Care</option>
                            </select>
                        </div>
                    </div>
                    <div className='my-11'>
                        <div className='border-b-2'>
                            <h1 className='font-bold mb-2'>Mailing Address <span className="text-red-500">*</span></h1>
                        </div>

                        <div className='my-7 flex flex-row ml-3 items-center'>
                            <input type="checkbox" id="sameAsSection1Mail" className="h-4 w-4 mr-2 cursor-pointer" onChange={handleCheckboxChangeM} />
                            <label htmlFor="sameAsMailingAddress" className="text-sm items-center justify-center cursor-pointer">Same as Section 1</label>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 md:gap-20 gap-10 mt-10'>
                            <div className="relative h-10 w-full min-w-[200px]">
                                <input
                                    type="text"
                                    id="addressLine1"
                                    value={mailDataC2.addressLine1}
                                    onChange={handleAddressChangeC2}
                                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                    placeholder=" " required /><label
                                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Address Line 1
                                </label>
                            </div>

                            <div className="relative h-10 w-full min-w-[200px]">
                                <input
                                    type="text"
                                    id="addressLine2"
                                    value={mailDataC2.addressLine2}
                                    onChange={handleAddressChangeC2}
                                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                    placeholder=" " required /><label
                                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Address Line 2
                                </label>
                            </div>

                            <div className="relative h-10 w-full min-w-[200px]">
                                <input
                                    type="text"
                                    id="city"
                                    value={mailDataC2.city}
                                    onChange={handleAddressChangeC2}
                                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                    placeholder=" " required /><label
                                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">City/Town
                                </label>
                            </div>

                            <div className="relative h-10 w-full min-w-[200px]">
                                <input
                                    type="text"
                                    id="landmark"
                                    value={mailDataC2.landmark}
                                    onChange={handleAddressChangeC2}
                                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                    placeholder=" " required /><label
                                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Landmark
                                </label>
                            </div>

                            <div className="relative h-10 w-full min-w-[200px]">
                                <input
                                    type="text"
                                    id="postalCode"
                                    value={mailDataC2.postalCode}
                                    onChange={handleAddressChangeC2}
                                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                    placeholder=" " required /><label
                                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Postal Code
                                </label>
                            </div>

                        </div>
                    </div>
                    <div className='my-11'>
                        <div className='border-b-2'>
                            <h1 className='font-bold mb-2'>Residence Address <span className="text-red-500">*</span></h1>
                        </div>

                        <div className='my-7 flex flex-row ml-3 items-center'>
                            <input type="checkbox" id="sameAsSection1Res" className="h-4 w-4 mr-2 cursor-pointer" onChange={handleCheckboxChangeR} />
                            <label htmlFor="sameAsMailingAddress" className="text-sm items-center justify-center cursor-pointer">Same as Section 1</label>
                        </div>
                        <div className='flex flex-col gap-16 text-center justify-center sm:gap-10'>
                            <div className='grid grid-cols-1 md:grid-cols-3 md:gap-20 gap-10 mt-10'>
                                <div className="relative h-10 w-full min-w-[200px]">
                                    <input
                                        type="text"
                                        id="addressLine1R"
                                        value={residenceDataC2.addressLine1R}
                                        onChange={handleResidenceAddressChangeC2}
                                        className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                        placeholder=" " required /><label
                                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Address Line 1
                                    </label>
                                </div>

                                <div className="relative h-10 w-full min-w-[200px]">
                                    <input
                                        type="text"
                                        id="addressLine2R"
                                        value={residenceDataC2.addressLine2R}
                                        onChange={handleResidenceAddressChangeC2}
                                        className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                        placeholder=" " required /><label
                                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Address Line 2
                                    </label>
                                </div>

                                <div className="relative h-10 w-full min-w-[200px]">
                                    <input
                                        type="text"
                                        id="cityR"
                                        value={residenceDataC2.cityR}
                                        onChange={handleResidenceAddressChangeC2}
                                        className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                        placeholder=" " required /><label
                                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">City/Town
                                    </label>
                                </div>

                                <div className="relative h-10 w-full min-w-[200px]">
                                    <input
                                        type="text"
                                        id="landmarkR"
                                        value={residenceDataC2.landmarkR}
                                        onChange={handleResidenceAddressChangeC2}
                                        className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                        placeholder=" " required /><label
                                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Landmark
                                    </label>
                                </div>

                                <div className="relative h-10 w-full min-w-[200px]">
                                    <input
                                        type="text"
                                        id="postalCodeR"
                                        value={residenceDataC2.postalCodeR}
                                        onChange={handleResidenceAddressChangeC2}
                                        className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                        placeholder=" " required /><label
                                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Postal Code
                                    </label>
                                </div>
                            </div>
                            <div className='flex flex-row gap-9 justify-center text-center mt-6'>
                                <div className='text-center'>
                                    <a onClick={handleClear} className='border p-2 hover:bg-slate-400 text-black transition-all ease-in cursor-pointer rounded-md'>
                                        <span className="hidden sm:inline-block"><FaTrashAlt className="inline-block mr-1" /> Clear Fields</span>
                                        <span className="sm:hidden"><FaTrashAlt className="inline-block" /></span>
                                    </a>
                                </div>
                                <div className='text-center'>
                                    <Link href="\section3" onSubmit={handleSubmit} className='border p-2 hover:bg-slate-400 text-black transition-all ease-in cursor-pointer rounded-md'>
                                        <span className="hidden sm:inline-block">Next Section <FaArrowRight className="inline-block ml-1" /></span>
                                        <span className="sm:hidden"><FaArrowRight className="inline-block ml-1" /></span>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </section>

    );
};

export default section2C2;
