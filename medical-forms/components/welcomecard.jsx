import React from 'react';
import { FaTrashAlt, FaArrowRight } from 'react-icons/fa';

const welcomecard = () => {
  const instructions = [
    {
      title: `Welcome, User!`,
      description: "Press the THRIVE filler at the top to return to the home page.",
      buttonLabel: null,
      buttonIcon: null
    },
    {
      title: "Fill in Your Details",
      description: "To fill in your details, click on the sections in the navigation bar above.",
      buttonLabel: null,
      buttonIcon: null
    },
    {
      title: "Automatic Data Storage",
      description: "Once you've filled a section, your details will be automatically stored in your browser's local storage, so you won't lose them even if you reload the page or encounter any issues.",
      buttonLabel: "Clear Fields",
      buttonIcon: <FaTrashAlt />
    },
    {
      title: "Move to Next Section",
      description: "To move to the next section, use the button below.",
      buttonLabel: "Next Section",
      buttonIcon: <FaArrowRight />
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mx-24 mt-8">
      {instructions.map((instruction, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">{instruction.title}</h2>
          <p className="text-gray-600 mb-4">{instruction.description}</p>
          {instruction.buttonLabel && (
            <div className="text-center">
              <button className="border p-2 hover:bg-gray-200 rounded-md">
                {instruction.buttonIcon && <span className="mr-1">{instruction.buttonIcon}</span>}
                {instruction.buttonLabel}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default welcomecard;
