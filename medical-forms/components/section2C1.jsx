import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { FaTrashAlt, FaArrowRight } from 'react-icons/fa'; // Import FontAwesome icons


const section2C1 = () => {

  const router = useRouter();
  //Use to hold the states of the patient-1 basic data
  const [formDataC1, setFormDataC1] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    dob: '',
    sex: '',
    healthNumber: '',
    person: ''
  });
  //Use to hold the states of the patient-1 Mailing address data
  const [mailDataC1, setMailDataC1] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    landmark: '',
    postalCode: ''
  })
  //Use to hold the states of the patient-1 Residence address data
  const [residenceDataC1, setResidenceDataC1] = useState({
    addressLine1R: '',
    addressLine2R: '',
    cityR: '',
    landmarkR: '',
    postalCodeR: ''
  })

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const storedFormData = localStorage.getItem('formDataC1');
    if (storedFormData) {
      setFormDataC1(JSON.parse(storedFormData));
    }

    const storedMailData = localStorage.getItem('mailDataC1');
    if (storedMailData) {
      setMailDataC1(JSON.parse(storedMailData));
    }

    const storedResidenceData = localStorage.getItem('residenceDataC1');
    if (storedResidenceData) {
      setResidenceDataC1(JSON.parse(storedResidenceData));
    }
  }, []);
  //Handles the changes occuring to the formDataC1 and stores them in the localstorage
  const handleChangeC1 = (e) => {
    const { id, value } = e.target;
    let formattedValue;
    if (id === 'healthNumber') {
      formattedValue = value.replace(/\D/g, '').slice(0, 10);
    } else if (id === 'lastName' || id === 'firstName' || id === 'middleName') {
      //allow only alphabets and spaces
      formattedValue = value.replace(/[^A-Za-z\s]/g, '').slice(0, 25)
    } else if (id === 'dob' || id === 'sex' || id === 'person') {
      formattedValue = value
    }

    setFormDataC1({
      ...formDataC1,
      [id]: formattedValue
    });

    localStorage.setItem('formDataC1', JSON.stringify({
      ...formDataC1,
      [id]: formattedValue
    }));
  };
  //Handles the changes occuring to the mailDataC1 and stores them in the localstorage
  const handleAddressChangeC1 = (e) => {
    const { id, value } = e.target;
    let formattedValue;
    if (id === 'postalCode') {
      formattedValue = value.replace(/\D/g, '');
    } else {
      formattedValue = value.replace(/[^A-Za-z,\s0-9]/g, '').slice(0, 50);
    }

    setMailDataC1({
      ...mailDataC1,
      [id]: formattedValue
    });

    localStorage.setItem('mailDataC1', JSON.stringify({
      ...mailDataC1,
      [id]: formattedValue
    }));
  }
  //Handles the changes occuring to the residenceDataC1 and stores them in the localstorage
  const handleResidenceAddressChangeC1 = (e) => {
    const { id, value } = e.target;
    let formattedValue;
    if (id === 'postalCodeR') {
      formattedValue = value.replace(/\D/g, '');
    } else {
      formattedValue = value.replace(/[^A-Za-z,\s0-9]/g, '').slice(0, 50);
    }

    setResidenceDataC1({
      ...residenceDataC1,
      [id]: formattedValue
    });

    localStorage.setItem('residenceDataC1', JSON.stringify({
      ...residenceDataC1,
      [id]: formattedValue
    }));
  }


  const handleClear = () => {
    // Clear formData from localStorage
    localStorage.removeItem('formDataC1');
    // Clear residenceData from localStorage
    localStorage.removeItem('residenceDataC1');
    // Clear mailData from localStorage
    localStorage.removeItem('mailDataC1');

    // Reset the formData state
    setFormDataC1({
      lastName: '',
      firstName: '',
      middleName: '',
      dob: '',
      sex: '',
      healthNumber: '',
      person: ''
    });

    // Reset the residenceData state
    setResidenceDataC1({
      addressLine1R: '',
      addressLine2R: '',
      cityR: '',
      landmarkR: '',
      postalCodeR: ''
    });

    // Reset the mailData state
    setMailDataC1({
      addressLine1: '',
      addressLine2: '',
      city: '',
      landmark: '',
      postalCode: ''
    });
  };
  //use to copy the section-1 mailing details on checking the checkbox
  const handleCheckboxChangeM = (e) => {
    if (e.target.checked) {
      // Retrieve mailData from localStorage
      const storedMailData = JSON.parse(localStorage.getItem('mailData'));

      // If mailData exists in localStorage, update mailDataC1 with its values
      if (storedMailData) {
        const updatedMailDataC1 = {
          addressLine1: storedMailData.addressLine1 || '',
          addressLine2: storedMailData.addressLine2 || '',
          city: storedMailData.city || '',
          landmark: storedMailData.landmark || '',
          postalCode: storedMailData.postalCode || ''
        };
        setMailDataC1(updatedMailDataC1);

        // Store mailDataC1 in localStorage
        localStorage.setItem('mailDataC1', JSON.stringify(updatedMailDataC1));
      }
    } else {
      // Clear mailDataC1 when checkbox is unchecked
      setMailDataC1({
        addressLine1: '',
        addressLine2: '',
        city: '',
        landmark: '',
        postalCode: ''
      });

      // Remove mailDataC1 from localStorage
      localStorage.removeItem('mailDataC1');
    }
  };
  //use to copy the section-1 mailing details on checking the checkbox
  const handleCheckboxChangeR = (e) => {
    if (e.target.checked) {
      // Get residenceData from localStorage
      const storedResidenceData = JSON.parse(localStorage.getItem('residenceData')) || {};

      // Write the collected data into residenceDataC1
      const updatedResidenceDataC1 = {
        addressLine1R: storedResidenceData.addressLine1R || '',
        addressLine2R: storedResidenceData.addressLine2R || '',
        cityR: storedResidenceData.cityR || '',
        landmarkR: storedResidenceData.landmarkR || '',
        postalCodeR: storedResidenceData.postalCodeR || ''
      };
      setResidenceDataC1(updatedResidenceDataC1);

      // Store the updated residenceDataC1 in localStorage
      localStorage.setItem('residenceDataC1', JSON.stringify(updatedResidenceDataC1));
    } else {
      // Clear residenceDataC1 when checkbox is unchecked
      setResidenceDataC1({
        addressLine1R: '',
        addressLine2R: '',
        cityR: '',
        landmarkR: '',
        postalCodeR: ''
      });

      // Remove residenceDataC1 from localStorage
      localStorage.removeItem('residenceDataC1');
    }
  };


  return (
    <section id="section-1" className="p-4">
      <div className='mx-24 mt-11'>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-20 gap-10">
            <div className="relative h-10 w-full min-w-[200px]">
              <input
                type="text"
                id="lastName"
                value={formDataC1.lastName}
                onChange={handleChangeC1}
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" " required /><label
                  className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Last Name <span className="text-red-500">*</span>
              </label>
            </div>

            <div className="relative h-10 w-full min-w-[200px]">
              <input
                type="text"
                id="firstName"
                value={formDataC1.firstName}
                onChange={handleChangeC1}
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" " required /><label
                  className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">First Name <span className="text-red-500">*</span>
              </label>
            </div>

            <div className="relative h-10 w-full min-w-[200px]">
              <input
                type="text"
                id="middleName"
                value={formDataC1.middleName}
                onChange={handleChangeC1}
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" " /><label
                  className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Middle Name
              </label>
            </div>

            <div className="relative h-10 w-full min-w-[200px]">
              <input
                type="date"
                id="dob"
                onChange={handleChangeC1}
                value={formDataC1.dob}
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
                value={formDataC1.sex}
                onChange={handleChangeC1}
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
                value={formDataC1.healthNumber}
                onChange={handleChangeC1}
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" " required /><label
                  className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Health Number <span className="text-red-500">*</span>
              </label>
            </div>

            <div className="relative">
              <h1 className="text-center">I am this person's <span className='font-bold text-red-400'>*</span></h1>
              <select
                id='person'
                value={formDataC1.person}
                onChange={handleChangeC1}
                required
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
                  value={mailDataC1.addressLine1}
                  onChange={handleAddressChangeC1}
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" " required /><label
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Address Line 1
                </label>
              </div>

              <div className="relative h-10 w-full min-w-[200px]">
                <input
                  type="text"
                  id="addressLine2"
                  value={mailDataC1.addressLine2}
                  onChange={handleAddressChangeC1}
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" " required /><label
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Address Line 2
                </label>
              </div>

              <div className="relative h-10 w-full min-w-[200px]">
                <input
                  type="text"
                  id="city"
                  value={mailDataC1.city}
                  onChange={handleAddressChangeC1}
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" " required /><label
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">City/Town
                </label>
              </div>

              <div className="relative h-10 w-full min-w-[200px]">
                <input
                  type="text"
                  id="landmark"
                  value={mailDataC1.landmark}
                  onChange={handleAddressChangeC1}
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" " required /><label
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Landmark
                </label>
              </div>

              <div className="relative h-10 w-full min-w-[200px]">
                <input
                  type="text"
                  id="postalCode"
                  value={mailDataC1.postalCode}
                  onChange={handleAddressChangeC1}
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
                    value={residenceDataC1.addressLine1R}
                    onChange={handleResidenceAddressChangeC1}
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" " required /><label
                      className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Address Line 1
                  </label>
                </div>

                <div className="relative h-10 w-full min-w-[200px]">
                  <input
                    type="text"
                    id="addressLine2R"
                    value={residenceDataC1.addressLine2R}
                    onChange={handleResidenceAddressChangeC1}
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" " required /><label
                      className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Address Line 2
                  </label>
                </div>

                <div className="relative h-10 w-full min-w-[200px]">
                  <input
                    type="text"
                    id="cityR"
                    value={residenceDataC1.cityR}
                    onChange={handleResidenceAddressChangeC1}
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" " required /><label
                      className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">City/Town
                  </label>
                </div>

                <div className="relative h-10 w-full min-w-[200px]">
                  <input
                    type="text"
                    id="landmarkR"
                    value={residenceDataC1.landmarkR}
                    onChange={handleResidenceAddressChangeC1}
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" " required /><label
                      className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Landmark
                  </label>
                </div>

                <div className="relative h-10 w-full min-w-[200px]">
                  <input
                    type="text"
                    id="postalCodeR"
                    value={residenceDataC1.postalCodeR}
                    onChange={handleResidenceAddressChangeC1}
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
                  {/* <button type='submit' className='border p-2 hover:bg-slate-400 text-black transition-all ease-in cursor-pointer rounded-md'>
                    <span className="hidden sm:inline-block">Next Section <FaArrowRight className="inline-block ml-1" /></span>
                    <span className="sm:hidden"><FaArrowRight className="inline-block ml-1" /></span>
                  </button> */}

                  <Link href="/section3" className='border p-2 hover:bg-slate-400 text-black transition-all ease-in cursor-pointer rounded-md'>
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

export default section2C1;
