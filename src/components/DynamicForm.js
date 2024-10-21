import React, { useState } from 'react';

function DynamicForm() {
  const [fields, setFields] = useState([]);

  const addField = () => {
    setFields([...fields, { value: '' }]);
  };

  const handleChange = (index, event) => {
    const newFields = fields.slice();
    newFields[index].value = event.target.value;
    setFields(newFields);
  };

  return (
    <div>
      <h2>Dynamic Form</h2>
      {fields.map((field, index) => (
        <input
          key={index}
          type="text"
          value={field.value}
          onChange={(e) => handleChange(index, e)}
        />
      ))}
      <button onClick={addField}>Add Field</button>
    </div>
  );
}

export default DynamicForm;
