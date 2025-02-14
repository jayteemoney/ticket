import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TicketSelection from "./components/TicketSelection";
import AttendeeDetails from "./components/AttendeeDetails";
import TicketConfirmation from "./components/TicketConfirmation";

const App = () => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("ticketForm");
    return savedData
      ? JSON.parse(savedData)
      : {
          fullName: "",
          email: "",
          ticketType: "",
          ticketCount: 1,
          specialRequest: "",
          profileImage: "",
        };
  });

  useEffect(() => {
    localStorage.setItem("ticketForm", JSON.stringify(formData));
  }, [formData]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TicketSelection formData={formData} setFormData={setFormData} />} />
        <Route path="/details" element={<AttendeeDetails formData={formData} setFormData={setFormData} />} />
        <Route path="/confirmation" element={<TicketConfirmation formData={formData} />} />
      </Routes>
    </Router>
  );
};

export default App;
