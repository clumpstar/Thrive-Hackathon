import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { FaTrashAlt, FaArrowRight } from 'react-icons/fa'; // Import FontAwesome icons

const Section3 = () => {
    const [formData, setFormData] = useState({
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

    useEffect(() => {
        // Fill data from localStorage if present
        const storedFormData = JSON.parse(localStorage.getItem('formData')) || {};
        setFormData(storedFormData);
        const storedImageSrc = localStorage.getItem('imageSrc');
        setImageSrc(storedImageSrc);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = value;

        // Validate phone number while typing
        if (name === "homeTelephone" || name === "workTelephone") {
            newValue = newValue.replace(/[^\d]/g, ""); // Remove non-digit characters
            if (newValue.length > 10) {
                newValue = newValue.slice(0, 10); // Limit to 10 digits
            }
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : newValue
        }));
    };

    const handleSignatureUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const imageSrc = reader.result;
            setImageSrc(imageSrc);
            setFormData(prevState => ({
                ...prevState,
                signatureImage: imageSrc
            }));
            localStorage.setItem('imageSrc', imageSrc);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleClear = (e) => {
        // Clear form data and remove locally stored data
        setFormData({
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
        setImageSrc('');
        localStorage.removeItem('formData');
        localStorage.removeItem('imageSrc');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all agreements are accepted
        if (!formData.agreeToCommitment || !formData.agreeToReleaseInfo || !formData.agreeToCancellationConditions) {
            alert("Please accept all agreements.");
            return;
        }

        // Check if the user has uploaded an image
        if (!formData.signatureImage) {
            alert("Please upload a signature image.");
            return;
        }

        // Store form data in localStorage
        localStorage.setItem('formData', JSON.stringify(formData));

        // Check area code and number format for home telephone
        if (!isValidPhoneNumber(formData.homeTelephone)) {
            alert("Please enter a valid home telephone number.");
            return;
        }

        // Check area code and number format for work telephone
        if (!isValidPhoneNumber(formData.workTelephone)) {
            alert("Please enter a valid work telephone number.");
            return;
        }

        Router.push("/section4");
    };

    const isValidPhoneNumber = (phoneNumber) => {
        // Regular expression to match phone number format
        const phoneRegex = /^\+?[1-9]\d{0,2}[- ]?\d{3}[- ]?\d{4}$/;
        return phoneRegex.test(phoneNumber);
    };


    return (
        <div className='flex flex-col items-center justify-center mt-3'>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col items-center justify-center'>
                    <div className="max-w-md mx-24 p-4 justify-center">
                        <div className="mb-4">
                            <p className="mb-2 font-bold">I have read and agree to the following:</p>
                            <label className="inline-flex items-center mb-2">
                                <input type="checkbox" name="agreeToCommitment" checked={formData.agreeToCommitment} onChange={handleChange} className="mr-2" required />
                                Patient Commitment <span className='text-red-500 font-medium'>*</span>
                            </label>
                            <label className="inline-flex items-center mb-2">
                                <input type="checkbox" name="agreeToReleaseInfo" checked={formData.agreeToReleaseInfo} onChange={handleChange} className="mr-2" required />
                                Consent to Release Personal Health Information <span className='text-red-500 font-medium'>*</span>
                            </label>
                            <label className="inline-flex items-center mb-2">
                                <input type="checkbox" name="agreeToCancellationConditions" checked={formData.agreeToCancellationConditions} onChange={handleChange} className="mr-2" required />
                                Cancellation Conditions <span className='text-red-500 font-medium'>*</span>
                            </label>
                        </div>
                        <div className="mb-4">
                            <p className="mb-2 font-bold">I am signing on behalf of (check all that apply):</p>
                            <label className="inline-flex items-center mb-2">
                                <input type="checkbox" name="myself" checked={formData.myself} onChange={handleChange} className="mr-2" />
                                Myself
                            </label>
                            <label className="inline-flex items-center mb-2 ml-2">
                                <input type="checkbox" name="children" checked={formData.children} onChange={handleChange} className="mr-2" />
                                Child(ren)
                            </label>
                            <label className="inline-flex items-center mb-2 ml-2">
                                <input type="checkbox" name="dependentAdults" checked={formData.dependentAdults} onChange={handleChange} className="mr-2" />
                                Dependent Adult(s)
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 font-bold">Signature Upload:</label>
                            <input type="file" accept="image/*" onChange={handleSignatureUpload} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 font-bold">Home Telephone No.:</label>
                            <input type="tel" name="homeTelephone" value={formData.homeTelephone} onChange={handleChange} placeholder="xxxxxxxxxx" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 font-bold">Work Telephone No.:</label>
                            <input type="tel" name="workTelephone" value={formData.workTelephone} onChange={handleChange} placeholder="xxxxxxxxxx" className="w-full border border-gray-300 rounded-md px-3 py-2" />
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
                            <button type="submit" className='border p-2 hover:bg-slate-400 text-black transition-all ease-in cursor-pointer rounded-md'>
                                <span className="hidden sm:inline-block">Next Section <FaArrowRight className="inline-block ml-1" /></span>
                                <span className="sm:hidden"><FaArrowRight className="inline-block ml-1" /></span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Section3;
