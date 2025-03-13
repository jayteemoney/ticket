import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const TicketSelection = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  
  // State for selected ticket type and ticket count
  const [selectedTicket, setSelectedTicket] = useState(formData.ticketType || "");
  const [ticketCount, setTicketCount] = useState(formData.ticketCount || 1);

  // Handle ticket selection
  const handleTicketSelection = (ticketType) => {
    setSelectedTicket(ticketType);
  };

  // Handle cancel action (reset form)
  const handleCancel = () => {
    setFormData({ fullName: "", email: "", ticketType: "", ticketCount: 1 });
    setSelectedTicket("");
    setTicketCount(1);
  };

  // Proceed to next step (save ticket details and navigate)
  const handleNext = () => {
    setFormData({ ...formData, ticketType: selectedTicket, ticketCount });
    navigate("/details");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#112d27] text-white p-6 font-bold">
      {/* Ticket Selection Container */}
      <div className="bg-[#061814] p-6 rounded-xl shadow-lg w-full max-w-[450px]">
        
        {/* Header Section */}
        <div className="flex justify-between items-center pb-3 border-b-4 border-gray-600">
          <h2 className="text-lg font-semibold">Ticket Selection</h2>
          <span className="text-sm text-gray-400">Step 1/3</span>
        </div>

        {/* Event Details */}
        <div className="bg-[#112d27] p-4 mt-4 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-center text-gray-200">Techember Fest 25</h2>
          <p className="text-sm text-gray-400 text-center mt-2">
            Join us for an unforgettable experience at Techember Fest 25! Secure your spot now.
          </p>
          <p className="text-center mt-3 text-gray-300">📍 Jos, Nigeria</p>
          <p className="text-center text-gray-300">📅 March 15, 2025 | 7:00 PM</p>
        </div>

        {/* Ticket Type Selection */}
        <h3 className="mt-6 text-sm text-gray-400">Select Ticket Type</h3>
        <div className="grid grid-cols-3 gap-3 mt-3">
          {["Free", "VIP", "VIP Plus"].map((ticket) => (
            <button
              key={ticket}
              className={`p-3 rounded-lg border cursor-pointer ${
                selectedTicket === ticket ? "border-blue-500 bg-blue-900" : "border-gray-600 bg-gray-800"
              }`}
              onClick={() => handleTicketSelection(ticket)}
            >
              <p className="text-sm text-gray-300">{ticket}</p>
              <p className="text-lg font-semibold">
                {ticket === "Free" ? "$0" : ticket === "VIP" ? "$150" : "$250"}
              </p>
            </button>
          ))}
        </div>

        {/* Ticket Quantity Selection */}
        <h3 className="mt-6 text-sm text-gray-400">Number of Tickets</h3>
        <select
          className="w-full p-3 mt-2 rounded-lg bg-gray-800 border border-gray-600 text-gray-300"
          value={ticketCount}
          onChange={(e) => setTicketCount(Number(e.target.value))}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i} value={i + 1}>{i + 1}</option>
          ))}
        </select>

        {/* Action Buttons */}
        <div className="flex justify-between gap-3 mt-6">
          <button
            onClick={handleCancel}
            className="w-1/3 bg-gray-600 text-gray-200 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleNext}
            className={`w-2/3 py-2 rounded-lg transition ${
              selectedTicket ? "bg-blue-500 hover:bg-blue-600 cursor-pointer" : "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={!selectedTicket}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

TicketSelection.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default TicketSelection;
