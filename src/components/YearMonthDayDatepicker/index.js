import * as React from "react";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Tab, Tabs, Button, Grid } from "@mui/material";
import dayjs from "dayjs";

const UnifiedDatePicker = ({ selectedDate = null, setSelectedDate, setFilter, filter,calendarTabs, }) => {

  //constant
  
  //all states
  const [activeTab, setActiveTab] = useState(filter); // Default to 'day' tab
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedQuarter, setSelectedQuarter] = useState(null)
  //all functions
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setFilter(newValue);
    setIsCalendarOpen(true);
  };

  const handleCloseCalendar = () => {
    setIsCalendarOpen(false); // Close calendar when user interacts elsewhere or you want to manually close it
  };

  // Function to handle quarter selection
  const handleQuarterSelect = (quarter) => {
    const year = selectedDate ? selectedDate.year() : dayjs().year();
    const startMonth = (quarter - 1) * 3; // Calculate the start month of the quarter
    setSelectedQuarter(quarter); // Set the selected quarter
    setSelectedDate(dayjs().year(year).month(startMonth)); // Set the date to the beginning of the selected quarter
  };
  const datePickerProps = {
    label:
      activeTab === "day"
        ? "Select Day"
        : activeTab === "month"
        ? "Select Month"
        : activeTab === "year"
        ? "Select Year"
        : "Select Quarter",
    value: selectedDate,
    onChange: handleDateChange,
    views:
      activeTab === "day"
        ? ["year", "month", "day"]
        : activeTab === "month"
        ? ["month"]
        : activeTab === "year"
        ? ["year"]
        : [],
    openTo:
      activeTab === "month"
        ? "month"
        : activeTab === "year"
        ? "year"
        : "day",
    minDate: dayjs().subtract(20, "year"), // Limit to last 20 years
    maxDate: dayjs(), // Limit to current year or current date
    sx: { height: "auto" },
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* Tabs for Day, Month, Year, Quarter */}
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        {calendarTabs?.map(({label,value})=><Tab key={label} value={value} label={label} />)}
      </Tabs>

      {/* DatePicker with custom functionality */}
      <div style={{ marginTop: "20px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {activeTab !== "quarter" ? (
            <DatePicker {...datePickerProps} />
          ) : (
            <Grid container spacing={2} justifyContent="center">
      {[1, 2, 3, 4].map((quarter) => (
        <Grid item key={quarter}>
          <Button
            variant={selectedQuarter === quarter ? "contained" : "outlined"}
            onClick={() => handleQuarterSelect(quarter)}
          >
            Q{quarter} - {`${
              quarter === 1
                ? "Jan-Mar"
                : quarter === 2
                ? "Apr-Jun"
                : quarter === 3
                ? "Jul-Sep"
                : "Oct-Dec"
            }`}
          </Button>
        </Grid>
      ))}
    </Grid>
          )}
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default UnifiedDatePicker;
