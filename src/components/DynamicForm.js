import React, { useState } from 'react';

// Validation function to check if field is not empty
const validateField = (value) => value.trim() !== '';

const DynamicForm = () => {
  const [formFields, setFormFields] = useState([{ name: '', email: '' }]);
  const [errors, setErrors] = useState([]);

  // Handle input change
  const handleChange = (index, event) => {
    const updatedFields = [...formFields];
    updatedFields[index][event.target.name] = event.target.value;
    setFormFields(updatedFields);
  };

  // Add new field
  const addField = () => {
    setFormFields([...formFields, { name: '', email: '' }]);
  };

  // Remove field
  const removeField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  // Validate fields and submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = [];

    formFields.forEach((field, index) => {
      const fieldErrors = {};
      if (!validateField(field.name)) {
        fieldErrors.name = 'Name is required';
      }
      if (!validateField(field.email)) {
        fieldErrors.email = 'Email is required';
      }
      newErrors[index] = fieldErrors;
    });

    setErrors(newErrors);

    // If no errors, you can submit the data
    const isValid = newErrors.every((err) => Object.keys(err).length === 0);
    if (isValid) {
      console.log('Form Submitted:', formFields);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      {formFields.map((field, index) => (
        <div key={index} className="field-group">
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={field.name}
              onChange={(event) => handleChange(index, event)}
              className={`form-input ${errors[index]?.name ? 'error' : ''}`}
            />
            {errors[index]?.name && <span className="error-text">{errors[index].name}</span>}
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={field.email}
              onChange={(event) => handleChange(index, event)}
              className={`form-input ${errors[index]?.email ? 'error' : ''}`}
            />
            {errors[index]?.email && <span className="error-text">{errors[index].email}</span>}
          </div>

          <button type="button" onClick={() => removeField(index)} className="remove-btn">
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={addField} className="add-btn">
        Add Field
      </button>

      <button type="submit" className="submit-btn">
        Submit
      </button>

      <style>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        .field-group {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }
        label {
          display: block;
          font-weight: bold;
        }
        .form-input {
          width: 100%;
          margin-bottom: 5px;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .form-input.error {
          border-color: red;
        }
        .error-text {
          color: red;
          font-size: 12px;
        }
        .add-btn, .remove-btn, .submit-btn {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
          margin-right: 5px;
          margin-bottom: 10px;
        }
        .remove-btn {
          background-color: #dc3545;
        }
        .submit-btn {
          align-self: flex-end;
        }
        @media (max-width: 600px) {
          .field-group {
            flex-direction: column;
          }
          .form-input {
            margin-bottom: 15px;
          }
        }
      `}</style>
    </form>
  );
};

export default DynamicForm;
