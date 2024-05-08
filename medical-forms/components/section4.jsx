import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import jsPDF from 'jspdf';
import { useRouter } from 'next/router';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


const section4 = () => {
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [doctors, setDoctors] = useState([]);

    const [imageSrc, setImageSrc] = useState("");

    const router = useRouter();


    //ALL THE DETAILS OF PREVIOUS SECTIONS WILL BE VALIDATED AND THEN ONLY PROCEED TO STORE IT IN THE SUPABASE POSTGRES DB
    const insertDatabase = async () => {

        //Data from section1
        const storedFormDataSection1 = JSON.parse(localStorage.getItem('formData'));

        if (!(storedFormDataSection1.lastName && storedFormDataSection1.firstName && storedFormDataSection1.dob && storedFormDataSection1.sex
            && storedFormDataSection1.healthNumber && storedFormDataSection1.email)
        ) {
            alert("Fill the Section-1 Basic Details properly")
            router.push("/section1")
            return;
        }

        const storedMailDataSection1 = JSON.parse(localStorage.getItem('mailData'));

        if (!(storedMailDataSection1.addressLine1 && storedMailDataSection1.addressLine2 && storedMailDataSection1.city
            && storedMailDataSection1.landmark && storedMailDataSection1.postalCode
        )) {
            alert("Fill the Mailing address in Section-1 properly")
            router.push("/section1")
            return;
        }

        const storedResidenceDataSection1 = JSON.parse(localStorage.getItem('residenceData'));

        if (!(storedResidenceDataSection1.addressLine1R && storedResidenceDataSection1.addressLine2R && storedResidenceDataSection1.cityR
            && storedResidenceDataSection1.landmarkR && storedResidenceDataSection1.postalCodeR)
        ) {
            alert("Fill the Residence address in Section-1 properly")
            router.push("/section1")
            return;
        }

        //Data from section2C1
        const storedFormDataC1 = JSON.parse(localStorage.getItem('formDataC1')) || {};
        const storedMailDataC1 = JSON.parse(localStorage.getItem('mailDataC1')) || {};
        const storedResidenceDataC1 = JSON.parse(localStorage.getItem('residenceDataC1')) || {};

        //Data from section2C2
        const storedFormDataC2 = JSON.parse(localStorage.getItem('formDataC2')) || {};
        const storedMailDataC2 = JSON.parse(localStorage.getItem('mailDataC2')) || {};
        const storedResidenceDataC2 = JSON.parse(localStorage.getItem('residenceDataC2')) || {};

        // Count the number of filled fields for each patient
        const countFilledFields = (data) => {
            return Object.values(data).filter(value => value).length;
        };

        // Check if both patients have partially filled data
        const partiallyFilledC1 = storedFormDataC1.lastName != "" && storedFormDataC1.firstName != "" && storedFormDataC1.dob != "" && storedFormDataC1.sex != "" && storedFormDataC1.healthNumber != ""
            && storedFormDataC1.person != "" && storedMailDataC1.addressLine1 != "" && storedMailDataC1.addressLine2 != "" && storedMailDataC1.city != ""
            && storedMailDataC1.landmark != "" && storedMailDataC1.postalCode != "" && storedResidenceDataC1.addressLine1R != ""
            && storedResidenceDataC1.addressLine2R != "" && storedResidenceDataC1.cityR != "" && storedResidenceDataC1.landmarkR != ""
            && storedResidenceDataC1.postalCodeR != "";

        const noFilledC2 = ((countFilledFields(storedFormDataC2) + countFilledFields(storedMailDataC2) + countFilledFields(storedResidenceDataC2)) < 17 && (countFilledFields(storedFormDataC2) + countFilledFields(storedMailDataC2) + countFilledFields(storedResidenceDataC2)) > 0)
        const noFilledC1 = ((countFilledFields(storedFormDataC1) + countFilledFields(storedMailDataC1) + countFilledFields(storedResidenceDataC1)) < 17 && (countFilledFields(storedFormDataC1) + countFilledFields(storedMailDataC1) + countFilledFields(storedResidenceDataC1)) > 0)

        const partiallyFilledC2 = storedFormDataC2.lastName != "" && storedFormDataC2.firstName != "" && storedFormDataC2.dob != "" && storedFormDataC2.sex != "" && storedFormDataC2.healthNumber != ""
            && storedFormDataC2.person != "" && storedMailDataC2.addressLine1 != "" && storedMailDataC2.addressLine2 != "" && storedMailDataC2.city != ""
            && storedMailDataC2.landmark != "" && storedMailDataC2.postalCode != "" && storedResidenceDataC2.addressLine1R != ""
            && storedResidenceDataC2.addressLine2R != "" && storedResidenceDataC2.cityR != "" && storedResidenceDataC2.landmarkR != ""
            && storedResidenceDataC2.postalCodeR != "";


        if (noFilledC1 && !(partiallyFilledC1)) {
            alert("Fill the details for Patient-1 properly in Section 2");
            router.push("/section2/section2C1")
            return;
            
        }

        if (noFilledC2 && !(partiallyFilledC2)) {
            alert("Fill the details for Patient-2 properly in Section 2");
            router.push("/section2/section2C2")
            return;
        }

        //Data from section3
        const storedFormDatasection3 = JSON.parse(localStorage.getItem('formDatasection3')) || {};

        if (!(storedFormDatasection3.agreeToCommitment && storedFormDatasection3.agreeToReleaseInfo && storedFormDatasection3.agreeToCancellationConditions
        )) {
            alert("Accept all the terms and Conditions in Section-3")
            router.push("/section3")
            return;
        }

        if (!(storedFormDatasection3.myself || storedFormDatasection3.children || storedFormDatasection3.dependentAdults)) {
            alert("Check the ones you are signing on behalf of in Section-3")
            router.push("/section3")
            return;
        }

        const storedImageSrcsection3 = localStorage.getItem('imageSrc');

        if (!storedImageSrcsection3) {
            alert("Upload your signature in Section-3")
            router.push("/section3")
            return;
        }

        //Data from section4
        const storedDoctor = localStorage.getItem('selectedDoctor');

        if (!storedDoctor) {
            alert("choose a Doctor in Section-4")
            router.push("/section4")
            return;
        }

        // console.log(storedFormDatasection3, storedFormDataSection1.email)


        // Check if the email already exists
        const { data: existingData, error: existingError } = await supabase
            .from('section1_data')
            .select()
            .eq('email', storedFormDataSection1.email);

        // If no existing record with the same email is found, insert the data
        if (!existingData || existingData.length === 0) {
            await supabase
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
            await supabase
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
            await supabase
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
            await supabase
                .from('section3_data')
                .insert([
                    {
                        agree_to_commitment: storedFormDatasection3.agreeToCommitment,
                        agree_to_release_info: storedFormDatasection3.agreeToReleaseInfo,
                        agree_to_cancellation_conditions: storedFormDatasection3.agreeToCancellationConditions,
                        myself: storedFormDatasection3.myself || false,
                        children: storedFormDatasection3.children || false,
                        dependent_adults: storedFormDatasection3.dependentAdults || false,
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
            await supabase
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


    };

    useEffect(() => {
        // Retrieve locally stored doctor's name

        const storedDoctor = localStorage.getItem('selectedDoctor');
        if (storedDoctor) {
            setSelectedDoctor(storedDoctor);
        }

        // For demonstration purposes, an array of sample doctors is used here
        const sampleDoctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams'];
        setDoctors(sampleDoctors);
    }, []);

    const handleDoctorChange = (e) => {
        setSelectedDoctor(e.target.value);
        localStorage.setItem('selectedDoctor', e.target.value);
    };


    //PDF IS GENERATED HERE WITH ALL THE OBTAINED DETAILS
    const handleGeneratePDF = async (e) => {
        try {
            await insertDatabase();
        } catch (error) {
            // Handle the error if an alert was thrown
            console.error(error); // Log the error for debugging
        }

        const storedFormDataSection1 = JSON.parse(localStorage.getItem('formData'));
        const storedMailDataSection1 = JSON.parse(localStorage.getItem('mailData'));
        const storedResidenceDataSection1 = JSON.parse(localStorage.getItem('residenceData'));

        const storedFormDataC1 = JSON.parse(localStorage.getItem('formDataC1')) || {};
        const storedMailDataC1 = JSON.parse(localStorage.getItem('mailDataC1')) || {};
        const storedResidenceDataC1 = JSON.parse(localStorage.getItem('residenceDataC1')) || {};

        const storedFormDataC2 = JSON.parse(localStorage.getItem('formDataC2')) || {};
        const storedMailDataC2 = JSON.parse(localStorage.getItem('mailDataC2')) || {};
        const storedResidenceDataC2 = JSON.parse(localStorage.getItem('residenceDataC2')) || {};

        const storedFormDatasection3 = JSON.parse(localStorage.getItem('formDatasection3')) || {};

        const storedDoctor = localStorage.getItem('selectedDoctor');
        
        const doc = new jsPDF();

        doc.setFontSize(18)
        doc.text("Section-1", 10, 10)

        doc.setFontSize(12)
        doc.text("Last Name: " + storedFormDataSection1.lastName, 10, 30);
        doc.text("First Name: " + storedFormDataSection1.firstName, 110, 30);
        doc.text("Middle Name: " + (storedFormDataSection1.middleName || "-"), 10, 40);
        doc.text("DOB: " + storedFormDataSection1.dob, 110, 40);
        doc.text("Sex: " + storedFormDataSection1.sex, 10, 50);
        doc.text("Health ID: " + storedFormDataSection1.healthNumber, 110, 50);
        doc.text("Email: " + storedFormDataSection1.email, 10, 60);

        doc.setFontSize(14)
        doc.text("Mailing Address: ", 10, 80);
        doc.setFontSize(12)
        doc.text("Address Line 1: " + storedMailDataSection1.addressLine1, 10, 90);
        doc.text("Address Line 2: " + storedMailDataSection1.addressLine2, 10, 100);
        doc.text("City: " + storedMailDataSection1.city, 10, 110);
        doc.text("Landmark: " + storedMailDataSection1.landmark, 10, 120);
        doc.text("Postal Code: " + storedMailDataSection1.postalCode, 10, 130);

        doc.setFontSize(14)
        doc.text("Residence Address: ", 10, 150);
        doc.setFontSize(12)
        doc.text("Address Line 1: " + storedResidenceDataSection1.addressLine1R, 10, 160);
        doc.text("Address Line 2: " + storedResidenceDataSection1.addressLine2R, 10, 170);
        doc.text("City: " + storedResidenceDataSection1.cityR, 10, 180);
        doc.text("Landmark: " + storedResidenceDataSection1.landmarkR, 10, 190);
        doc.text("Postal Code: " + storedResidenceDataSection1.postalCodeR, 10, 200);

        doc.addPage();

        doc.setFontSize(18)
        doc.text("Section-2", 10, 10)

        doc.setFontSize(15)
        doc.text("Patient-1: ", 10, 40)

        doc.setFontSize(12)
        doc.text("Last Name: " + storedFormDataC1.lastName, 10, 60);
        doc.text("First Name: " + storedFormDataC1.firstName, 110, 60);
        doc.text("Middle Name: " + (storedFormDataC1.middleName || "-"), 10, 70);
        doc.text("DOB: " + storedFormDataC1.dob, 110, 70);
        doc.text("Sex: " + storedFormDataC1.sex, 10, 80);
        doc.text("Health ID: " + storedFormDataC1.healthNumber, 110, 80);
        doc.text("Email: " + storedFormDataSection1.email, 10, 90);

        doc.setFontSize(14)
        doc.text("Mailing Address: ", 10, 110);
        doc.setFontSize(12)
        doc.text("Address Line 1: " + storedMailDataC1.addressLine1 || "-", 10, 120);
        doc.text("Address Line 2: " + storedMailDataC1.addressLine2 || "-", 10, 130);
        doc.text("City: " + storedMailDataC1.city || "-", 10, 140);
        doc.text("Landmark: " + storedMailDataC1.landmark || "-", 10, 150);
        doc.text("Postal Code: " + storedMailDataC1.postalCode || "-", 10, 160);

        doc.setFontSize(14)
        doc.text("Residence Address: ", 10, 180);
        doc.setFontSize(12)
        doc.text("Address Line 1: " + storedResidenceDataC1.addressLine1R || "-", 10, 190);
        doc.text("Address Line 2: " + storedResidenceDataC1.addressLine2R || "-", 10, 200);
        doc.text("City: " + storedResidenceDataC1.cityR || "-", 10, 210);
        doc.text("Landmark: " + storedResidenceDataC1.landmarkR || "-", 10, 220);
        doc.text("Postal Code: " + storedResidenceDataC1.postalCodeR || "-", 10, 230);


        doc.addPage();

        doc.setFontSize(15)
        doc.text("Patient-2: ", 10, 20)

        doc.setFontSize(12)
        doc.text("Last Name: " + (storedFormDataC2.lastName || "-"), 10, 40);
        doc.text("First Name: " + (storedFormDataC2.firstName || "-"), 110, 40);
        doc.text("Middle Name: " + (storedFormDataC2.middleName || "-"), 10, 50);
        doc.text("DOB: " + (storedFormDataC2.dob || "-"), 110, 50);
        doc.text("Sex: " + (storedFormDataC2.sex || "-"), 10, 60);
        doc.text("Health ID: " + (storedFormDataC2.healthNumber || "-"), 110, 60);
        doc.text("Email: " + (storedFormDataSection1.email || "-"), 10, 70);

        doc.setFontSize(14)
        doc.text("Mailing Address: ", 10, 90);
        doc.setFontSize(12)
        doc.text("Address Line 1: " + (storedMailDataC2.addressLine1 || "-"), 10, 100);
        doc.text("Address Line 2: " + (storedMailDataC2.addressLine2 || "-"), 10, 110);
        doc.text("City: " + (storedMailDataC2.city || "-"), 10, 120);
        doc.text("Landmark: " + (storedMailDataC2.landmark || "-"), 10, 130);
        doc.text("Postal Code: " + (storedMailDataC2.postalCode || "-"), 10, 140);

        doc.setFontSize(14)
        doc.text("Residence Address: ", 10, 160);
        doc.setFontSize(12)
        doc.text("Address Line 1: " + (storedResidenceDataC2.addressLine1R || "-"), 10, 170);
        doc.text("Address Line 2: " + (storedResidenceDataC2.addressLine2R || "-"), 10, 180);
        doc.text("City: " + (storedResidenceDataC2.cityR || "-"), 10, 190);
        doc.text("Landmark: " + (storedResidenceDataC2.landmarkR || "-"), 10, 200);
        doc.text("Postal Code: " + (storedResidenceDataC2.postalCodeR || "-"), 10, 210);

        doc.addPage()

        doc.setFontSize(18)
        doc.text("Section-3", 10, 10)

        // Initialize yPos
        let yPos = 30;

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold'); // Set font to bold
        doc.text("Agreements: ", 10, yPos); // Align "Agreements:" with the rest
        doc.setFont('helvetica', 'normal'); // Set font back to normal
        doc.setFontSize(12);


        // Checkbox function to draw and check/uncheck checkboxes
        const drawCheckbox = (x, y, checked) => {
            doc.rect(x, y, 10, 10); // Draw checkbox
            if (checked) {
                doc.setFontSize(20);
                doc.text("X", x + 2, y + 8); // Draw checkmark if checked
                doc.setFontSize(12);
            }
        };

        // Function to draw a line of text with checkbox
        const drawCheckboxText = (x, y, text, checked) => {
            drawCheckbox(x, y, checked);
            doc.text(text, x + 15, y + 8);
        };

        // Draw the content
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold'); // Set font to bold
        doc.text("Agreements: ", 10, yPos); // Align "Agreements:" with the rest
        doc.setFont('helvetica', 'normal'); // Set font back to normal
        doc.setFontSize(12);

        drawCheckboxText(10, yPos + 20, "Agree To Commitment", storedFormDatasection3.agreeToCommitment);
        yPos += 40;
        drawCheckboxText(10, yPos, "Agree To Release Information", storedFormDatasection3.agreeToReleaseInfo);
        yPos += 20;
        drawCheckboxText(10, yPos, "Agree To Cancellation Conditions", storedFormDatasection3.agreeToCancellationConditions);
        yPos += 20;

        // Draw the checkboxes for signing on behalf of
        doc.setFont('helvetica', 'bold'); // Set font to bold
        doc.setFontSize(12);
        doc.text("Signing on behalf of:", 10, yPos);
        doc.setFont('helvetica', 'normal'); // Set font back to normal
        yPos += 10;
        drawCheckboxText(20, yPos, "Myself", storedFormDatasection3.myself);
        yPos += 20;
        drawCheckboxText(20, yPos, "Children", storedFormDatasection3.children);
        yPos += 20;
        drawCheckboxText(20, yPos, "Dependent Adults", storedFormDatasection3.dependentAdults);
        yPos += 20;

        // Adjust Y position for "Signature:"
        yPos += 10;
        doc.setFont('helvetica', 'bold'); // Set font to bold
        doc.setFontSize(14);
        doc.text("Signature:", 10, yPos);
        doc.setFont('helvetica', 'normal'); // Set font back to normal
        doc.setFontSize(12);

        // Draw Signature Image
        yPos += 10;
        doc.addImage(storedFormDatasection3.signatureImage, 'JPEG', 10, yPos, 50, 50); // Assuming storedFormDatasection3.signatureImage is a base64 image

        yPos += 60;
        doc.setFont('helvetica', 'bold'); // Set font to bold
        doc.setFontSize(14);
        doc.text("Communication:", 10, yPos);
        doc.setFont('helvetica', 'normal'); // Set font back to normal
        doc.setFontSize(12);

        // Draw homeTelephone and workTelephone
        yPos += 10;
        doc.text(`Home Telephone: ${storedFormDatasection3.homeTelephone}`, 10, yPos);
        yPos += 10;
        doc.text(`Work Telephone: ${storedFormDatasection3.workTelephone}`, 10, yPos);


        doc.addPage()

        doc.setFontSize(18)
        doc.text("Section-4", 10, 10)
        doc.setFontSize(18)

        const currentDate = new Date().toLocaleDateString('en-GB'); // Get current date in dd-mm-yyyy format

        // Get the doctor's name without the "Dr." prefix
        const doctorNameWithoutPrefix = storedDoctor.replace("Dr. ", "");

        // Fetch doctor's signature image URL from Supabase
        const { data: doctorSignatures, error: signatureError } = await supabase
            .from('doctor_signatures')
            .select('url')
            .eq('name', doctorNameWithoutPrefix);

        if (signatureError) {
            console.error('Error fetching doctor signature:', signatureError.message);
            return null;
        }

        if (doctorSignatures.length === 0) {
            console.error('Doctor signature not found.');
            return null;
        }

        const doctorSignatureURL = doctorSignatures[0].url;

        // Fetch doctor's signature image from the retrieved URL
        const response = await fetch(doctorSignatureURL);
        if (!response.ok) {
            console.error('Failed to download doctor signature image:', response.statusText);
            return null;
        }

        //Fetched doctor's signature is used here
        const signatureData = await response.blob();
        const doctorSignatureImageURL = URL.createObjectURL(signatureData);

        // Page 3: Section-3
        doc.setFontSize(12);
        doc.text("Date: " + currentDate, 10, 20);
        doc.text("Doctor: " + storedDoctor, 10, 40);

        // Add the doctor's signature image
        doc.addImage(doctorSignatureImageURL, 'JPEG', 10, 60, 50, 50);



        doc.save("Patient_Enrolment_Form.pdf");
    }


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
            <button onClick={handleGeneratePDF} className='border p-2 mx-auto rounded-md mt-5 hover:bg-gray-400 transition-all ease-out hover:scale-110'>Generate PDF</button>
        </div>
    );
};

export default section4;
