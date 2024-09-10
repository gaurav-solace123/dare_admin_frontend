import * as React from "react";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Tab, Tabs } from "@mui/material";
import dayjs from "dayjs";

const UnifiedDatePicker = ({selectedDate=null,setSelectedDate,setFilter,filter}) => {
  // const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState(filter); // Default to 'day' tab
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setFilter(newValue)
    setIsCalendarOpen(true)
  };
  const handleCloseCalendar = () => {
    setIsCalendarOpen(false); // Close calendar when user interacts elsewhere or you want to manually close it
  };
  const datePickerProps = {
    label: activeTab === "day" ? "Select Day" : activeTab === "month" ? "Select Month" : "Select Year",
    value: selectedDate,
    onChange: handleDateChange,
    views: activeTab === "day" ? ["year", "month", "day"] : activeTab === "month" ? ["month"] : ["year"],
    openTo: activeTab === "month" ? "month" : activeTab === "year" ? "year" : "day",
    minDate: dayjs().subtract(20, "year"), // Limit to last 20 years
    maxDate: dayjs(), // Limit to current year or current date
    sx: { height: 'auto' },
    //  open: isCalendarOpen, // Control the calendar open state
    // onClose: handleCloseCalendar,  // Custom styling if needed
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* <h3>Select Day, Month, or Year:</h3> */}
      {/* Tabs for Day, Month, Year */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
      >
        <Tab value="day" label="Day" />
        <Tab value="month" label="Month" />
        <Tab value="year" label="Year" />
      </Tabs>

      {/* DatePicker with custom functionality */}
      <div style={{ marginTop: "20px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker {...datePickerProps} />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default UnifiedDatePicker;
