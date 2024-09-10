import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css"; // Optional: For styling

const PDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState("day"); // Default to 'day' tab
  const datePickerRef = useRef(null); // Ref for the DatePicker to programmatically open it

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Function to handle tab switch and open the date picker
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    datePickerRef.current.setOpen(true); // Programmatically open the date picker
  };

  // Calculate last 20 years for the year picker
  const minYear = new Date().getFullYear() - 20;

  return (
    <div className="date-picker-container">
      {/* <h3>Select Day, Month, or Year:</h3> */}

      {/* Tabs for day, month, and year */}
      <div className="tabs">
        <div
          className={`tab ${activeTab === "day" ? "active" : ""}`}
          onClick={() => handleTabClick("day")}
        >
          Day
        </div>
        <div
          className={`tab ${activeTab === "month" ? "active" : ""}`}
          onClick={() => handleTabClick("month")}
        >
          Month
        </div>
        <div
          className={`tab ${activeTab === "year" ? "active" : ""}`}
          onClick={() => handleTabClick("year")}
        >
          Year
        </div>
      </div>

      {/* Date picker that changes based on active tab */}
      <div className="date-picker-wrapper">
        <DatePicker
          ref={datePickerRef} // Attach ref to the date picker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat={
            activeTab === "day"
              ? "dd/MM/yyyy"
              : activeTab === "month"
              ? "MM/yyyy"
              : "yyyy"
          }
          showMonthYearPicker={activeTab === "month"} // Show only month/year picker if month tab is active
          showYearPicker={activeTab === "year"} // Show only year picker if year tab is active
          placeholderText={`Select ${
            activeTab === "day"
              ? "Day"
              : activeTab === "month"
              ? "Month"
              : "Year"
          }`}
          minDate={activeTab === "year" ? new Date(minYear, 0, 1) : null} // Limit years to last 20 years
          maxDate={activeTab === "year" ? new Date() : null} // Limit year picker to current year
          showPopperArrow={false}
          open={true} // Open the date picker by default
          className="datepicker-input" // Hide default input text box
        />
      </div>
    </div>
  );
};

export default PDatePicker;
