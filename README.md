# BeWell-Hackathon
This was a huge learning experience. I learnt a lot about the mechanisms of a form. Every tiny innovations made by Google, and other form providers there has been a lot of hardwork.

**⚠️ DISCLAIMER**: This method/approach is designed in a place where authentication is not done. If authentication is present the design should be altered.

## Project Overview
1. This is a form that has four sections:
   - Section-1:
     
     - Basic Details of the user:
     
     ![image](https://github.com/clumpstar/Thrive-Hackathon/assets/91057057/f7a2673c-fd08-4b39-a37f-f9839ae02bc1)

     - Mailing Address:

     ![image](https://github.com/clumpstar/Thrive-Hackathon/assets/91057057/ab0acab5-9420-4621-a21c-739985600364)


     - Residence Address:

     ![image](https://github.com/clumpstar/Thrive-Hackathon/assets/91057057/3485021e-ab5f-4859-a56b-41959ad1f0c6)

   - Section-2:
      - Holds the same details as the above, except there are two patients available here

        ![image](https://github.com/clumpstar/Thrive-Hackathon/assets/91057057/f4a8e227-5641-4421-9b26-ddf93db6bdc4)
        
   - Section-3:
      - This contains the agreements to be accepted.
      - Also signature of the person who is signing should be uploaded here.
      - Communication (phone numbers will be inputted here)

        ![image](https://github.com/clumpstar/Thrive-Hackathon/assets/91057057/6ec4e8ce-0841-4c70-a600-f1eb5f015c5f)


   - Section-4:
      - The user has to choose the Doctor.
      - Accordingly the signature of that doctor will be taken from the Database.

        ![image](https://github.com/clumpstar/Thrive-Hackathon/assets/91057057/2e03682b-6652-44af-a012-4fb7f3fde2ae)

2. Once a user enters in an input field, it gets stored in the localStorage. This is used for the ease of use of the user. whenever the page reloads or any other problem occurs these details can be restored from localStorage. *If authentication is taken into consideration this has to be stored in that particular user's session storage only*.
3. The Bin (Clear) button can be used to clear the fields and the locally stored data of that particular section. 
4. Once the Generate PDF Button is clicked, all the input input fields present in the form will be validated. Then it is stored in the Database.
5. This PDF is generated from the locally stored data as it is more quicker.
6. The PDF is generated from the scratch using jsPDF.

## Technologies Used

1. **Figma** was used for designing the pages.
2. Used **Supabase**'s **Postgres SQL** and the **Bucket storage** for storage purposes.
3. **NextJS** framework for the frontend. Designed it as a static webpage.
4. **Tailwind CSS** for designing the webpage.
5. **jsPDF** was used for constructing the PDF with obtained data.

## Installation instructions

1. `git clone https://github.com/clumpstar/Thrive-Hackathon.git`
2. `cd medical-forms`
3. `npm install` or any other package installers
4. `npm run dev` or any other package installers
5. Open `http://localhost:3000` in your browser

## Demo

Loom Video - https://www.loom.com/share/6b90e1c9affe4e8da7748e781346ba50?sid=5edbdea2-1c07-4e0d-81d5-74cb06223015





