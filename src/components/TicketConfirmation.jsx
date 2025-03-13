import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const TicketConfirmation = ({ formData }) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-[#112d27] text-white p-6 overflow-hidde font-bold font-serif">
      {/* Main Card */}
      <div className="bg-[#061814] p-6 rounded-xl shadow-lg w-full max-w-[450px] h-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center pb-3 border-b-4 border-gray-600">
          <h2 className="text-lg font-semibold">Ticket Successfully Booked!</h2>
          <span className="text-sm text-gray-400">Step 3/3</span>
        </div>

        {/* Ticket Info Section */}
        <div className="mt-4 text-center bg-gray-800 p-3 rounded-lg border border-gray-700">
          <h3 className="text-lg font-bold text-white">Techember Fest 25</h3>
          <p className="text-gray-400 text-xs mt-1">📍 Jos, Nigeria</p>
          <p className="text-gray-400 text-xs">📅 March 15, 2025 | 7:00 PM</p>
        </div>
        
        {/* Profile Image (If Uploaded) */}
        {formData?.profileImage && (
          <div className="mt-3 text-center">
            <h3 className="text-xs text-gray-400">Profile Photo</h3>
            <img
              src={formData.profileImage}
              alt="Profile"
              className="w-20 h-20 mx-auto mt-2 rounded-full border border-gray-600"
            />
          </div>
        )}

        {/* Ticket Details */}
        <div className="mt-3 bg-gray-800 p-3 rounded-lg border border-gray-700">
          <h3 className="text-xs text-gray-400">Ticket Type</h3>
          <p className="text-white text-sm font-semibold">{formData?.ticketType || "N/A"}</p>
          <p className="text-gray-400 text-xs">
            {formData?.ticketType === "VIP" ? "$150" : "Free"}
          </p>
        </div>

        {/* Attendee Info */}
        <div className="mt-3 bg-gray-800 p-3 rounded-lg border border-gray-700">
          <h3 className="text-xs text-gray-400">Attendee Information</h3>
          <p className="text-white text-sm"><strong>Name:</strong> {formData?.fullName || "N/A"}</p>
          <p className="text-white text-sm"><strong>Email:</strong> {formData?.email || "N/A"}</p>
          {formData?.specialRequest && (
            <p className="text-white text-sm"><strong>Special Request:</strong> {formData.specialRequest}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-2 mt-5">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-1/2 bg-gray-600 text-gray-200 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
          >
            Book Another Ticket
          </button>
          <button
            type="button"
            className="w-1/2 bg-blue-500 hover:bg-blue-600 py-2 rounded-lg transition cursor-pointer"
          >
            Download Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

// **PropTypes Validation**
TicketConfirmation.propTypes = {
  formData: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    ticketType: PropTypes.string,
    specialRequest: PropTypes.string,
    profileImage: PropTypes.string,
  }),
};

export default TicketConfirmation;
