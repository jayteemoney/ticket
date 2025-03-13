import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AttendeeDetails = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  // State for form inputs with default values from formData (if available)
  const [fullName, setFullName] = useState(formData.fullName || "");
  const [email, setEmail] = useState(formData.email || "");
  const [specialRequest, setSpecialRequest] = useState(formData.specialRequest || "");
  const [profileImage, setProfileImage] = useState(formData.profileImage || null);
  const [errors, setErrors] = useState({});

  /**
   * Handles image upload to Cloudinary.
   * @param {Event} event - File input change event
   */
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "dev_jaytee");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dalaunt4j/image/upload", {
        method: "POST",
        body: uploadData,
      });
      const data = await res.json();
      setProfileImage(data.secure_url);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  /**
   * Validates form inputs before submission.
   * @returns {Object} - Validation errors
   */
  const validateForm = () => {
    let validationErrors = {};
    if (!fullName.trim()) validationErrors.fullName = "Full Name is required";
    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Invalid email format";
    }
    return validationErrors;
  };

  /**
   * Handles form submission.
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    // If validation fails, set errors and stop submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Save form data and navigate to confirmation page
    setFormData({ ...formData, fullName, email, specialRequest, profileImage });
    navigate("/confirmation");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#112d27] text-white p-6 overflow-hidden font-bold font-serif">
      {/* Main Form Card */}
      <div className="bg-[#061814]  p-6 rounded-xl shadow-lg w-full max-w-[450px] max-h-screen">
        {/* Header Section */}
        <div className="flex justify-between items-center pb-3 border-b-4 border-green-900">
          <h2 className="text-lg font-semibold">Attendee Details</h2>
          <span className="text-sm text-gray-100">Step 2/3</span>
        </div>

        {/* Profile Image Upload Section */}
        <div className="mt-4 text-center">
          <h3 className="text-sm text-gray-100 mb-2">Upload Profile Photo</h3>
          <label className="flex flex-col items-center justify-center w-full h-28  rounded-lg bg-[#112d27] cursor-pointer">
            {profileImage ? (
              <img src={profileImage} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="text-gray-100 text-sm">
                <p>📷 Drag & drop or click to upload</p>
              </div>
            )}
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="mt-6">
          {/* Full Name Input */}
          <label className="block text-sm text-gray-100">Enter Your Name</label>
          <input
            type="text"
            className="w-full p-3 mt-1 rounded-lg bg-[#112d27] text-gray-300"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}

          {/* Email Input */}
          <label className="block text-sm text-gray-100 mt-4">Enter Your Email *</label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-100">📧</span>
            <input
              type="email"
              className="w-full pl-8 p-3 rounded-lg bg-[#112d27] text-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}

          {/* Special Requests Textarea */}
          <label className="block text-sm text-gray-100 mt-4">Special Request?</label>
          <textarea
            className="w-full p-3 mt-1 rounded-lg bg-[#112d27] text-gray-300"
            rows="3"
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
          ></textarea>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-3 mt-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-1/3 bg-[#112d27] text-gray-200 py-2 rounded-lg hover:bg-green-900 transition cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-2/3 bg-[#112d27] hover:bg-green-900 py-2 rounded-lg transition cursor-pointer"
            >
              Get My Free Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// PropTypes validation
AttendeeDetails.propTypes = {
  formData: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    specialRequest: PropTypes.string,
    profileImage: PropTypes.string,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default AttendeeDetails;
