export const submitForm = async (formData) => {
  // Mock API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (formData) {
        resolve({ status: 200, message: 'Form submitted successfully!' });
      } else {
        reject({ status: 400, message: 'Form submission failed.' });
      }
    }, 1000);
  });
};
