import React, { useState } from "react";

const ProposalForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    githubTasks: "",
    preference1: "",
    pdf1: null,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "Name is required." : "";
      case "email":
        return /^\S+@\S+\.\S+$/.test(value)
          ? ""
          : "Please enter a valid email address.";
      case "phone":
        if (!/^\d*$/.test(value)) return "Phone number must contain only digits.";
        if (value.length !== 10) return "Phone number must be exactly 10 digits.";
        return "";
      case "preference1":
        return value === "" ? "Please select a preference." : "";
      case "pdf1":
        return value && value.type !== "application/pdf"
          ? "Only PDF files are allowed."
          : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setFormData({
      ...formData,
      [name]: files[0],
    });

    setErrors({
      ...errors,
      [name]: validateField(name, files[0]),
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched({
      ...touched,
      [name]: true,
    });

    setErrors({
      ...errors,
      [name]: validateField(name, formData[name]),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = Object.keys(formData).reduce((acc, field) => {
      const error = validateField(field, formData[field]);
      if (error) acc[field] = error;
      return acc;
    }, {});

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
      console.log("Form submitted successfully:", formData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        githubTasks: "",
        preference1: "",
        pdf1: null,
      });
      setTouched({});
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex my-10 justify-center bg-gray-100 px-4 bg-opacity-0">
      <div className="shadow-lg rounded-lg p-8 w-full max-w-5xl backdrop-blur-sm shadow-gradient border border-gray-700">
        <h2 className="text-center font-bold text-3xl font-mono tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-blue-400 to-purple-300">
          Submit Your Proposal
        </h2>
        {isSubmitted && (
          <div className="mb-6 text-green-500 bg-green-900 p-3 rounded">
            Thank you! Your proposal has been submitted successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <InputField
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              placeholder="Enter your name"
            />

            {/* Email */}
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              placeholder="Enter your email"
            />

            {/* Phone */}
            <InputField
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
              placeholder="Enter your phone number"
            />

            {/* GitHub Tasks */}
            <InputField
              label="GitHub Link of Tasks"
              type="url"
              name="githubTasks"
              value={formData.githubTasks}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.githubTasks}
              placeholder="Enter GitHub link of Tasks"
            />
          </div>

          {/* Preference with File Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Preference Selection */}
            <div>
              <label
                htmlFor="preference1"
                className="block text-gray-200 font-medium mb-2"
              >
                Select Your Preference
              </label>
              <select
                id="preference1"
                name="preference1"
                value={formData.preference1}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border ${
                  errors.preference1 ? "border-red-500" : "border-gray-500"
                } rounded-md focus:outline-none focus:ring-2 ${
                  errors.preference1 ? "focus:ring-red-500" : "focus:ring-blue-400"
                } bg-gray-700 text-gray-100`}
              >
                <option value="">Select a preference</option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
                <option value="Option 4">Option 4</option>
              </select>
              {errors.preference1 && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.preference1}
                </p>
              )}
            </div>

            {/* PDF Upload */}
            <div>
              <label htmlFor="pdf1" className="block text-gray-200 font-medium mb-2">
                Upload PDF
              </label>
              <div className="flex items-center">
                <label
                  htmlFor="pdf1"
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white cursor-pointer hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 transition"
                >
                  Choose File
                </label>
                {formData.pdf1 ? (
                  <p className="ml-4 text-gray-400">{formData.pdf1?.name}</p>
                ) : (
                  <p className="ml-4 text-gray-400">No file chosen</p>
                )}
              </div>
              <input
                type="file"
                id="pdf1"
                name="pdf1"
                onChange={handleFileChange}
                accept=".pdf"
                className="hidden"
              />
              {errors.pdf1 && (
                <p className="text-red-500 text-sm mt-1">{errors.pdf1}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white py-3 mt-8 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, error, ...props }) => (
  <div>
    <label className="block text-gray-200 font-medium mb-2">{label}</label>
    <input
      {...props}
      className={`w-full px-4 py-2 border ${
        error ? "border-red-500" : "border-gray-500"
      } rounded-md focus:outline-none focus:ring-2 ${
        error ? "focus:ring-red-500" : "focus:ring-blue-400"
      } bg-gray-700 text-gray-100`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default ProposalForm;
