import * as React from "react";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Tab, Tabs, Button, Grid, Box } from "@mui/material";
import dayjs from "dayjs";

const UnifiedDatePicker = ({
  selectedDate = null,
  setSelectedDate,
  setFilter,
  filter,
  calendarTabs,
  disabled,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const [activeTab, setActiveTab] = useState(filter); // Default to 'day' tab
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const handleDateChange = (date) => {
        setSelectedDate(date);
    if(startDate){
      setStartDate(null)
    }
    if(endDate){
      setEndDate(null)
    }
  };

  const handleTabChange = (_event, newValue) => {
    setActiveTab(newValue);
    setFilter(newValue);
    
    // setSelectedDate(null)
  };

  const handleQuarterSelect = (quarter) => {
    const year = selectedDate ? selectedDate.year() : dayjs().year();
    const startMonth = (quarter - 1) * 3; // Calculate the start month of the quarter
    setSelectedQuarter(quarter);
    setSelectedDate(dayjs().year(year).month(startMonth)); // Set date to the beginning of the quarter
  };
  const getDatePickerLabel = () => {
    switch (activeTab) {
      case "day":
        return "Select Day";
      case "month":
        return "Select Month";
      case "year":
        return "Select Year";
      default:
        return "Select Quarter";
    }
  };

  const getDatePickerViews = () => {
    switch (activeTab) {
      case "day":
        return ["year", "month", "day"];
      case "month":
        return ["month"];
      case "year":
        return ["year"];
      default:
        return [];
    }
  };

  const getOpenToView = (dateTab) => {
    if (dateTab === "month") {
      return "month";
    } else if (dateTab === "year") {
      return "year";
    } else {
      return "day";
    }
  };
  const datePickerProps = {
    label:getDatePickerLabel()
      ,
    value: selectedDate,
    onChange: handleDateChange,
    views:getDatePickerViews(),
    openTo: getOpenToView(activeTab),
    minDate: dayjs().subtract(20, "year"), // Limit to last 20 years
    maxDate: dayjs(), // Limit to current year or current date
    sx: { height: "auto" },
    slotProps:{
      textField: {
          readOnly: true,
      },
  },
    
  };


  const renderDatePickers = () => {
    if (activeTab === "range") {
      return (
        <Box display={"flex"} justifyContent={"space-between"}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
              if (endDate && newValue && newValue.isAfter(endDate)) {
                setEndDate(null); // Reset end date if start date is after end date
              }
            }}
            maxDate={endDate || dayjs()} // Restrict end date if selected
            sx={{ mr: 2 }}
            slotProps={{
              textField: {
                readOnly: true,
              },
            }}
          />
  
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            minDate={startDate || dayjs().subtract(20, "year")} // Restrict start date if selected
            maxDate={dayjs()} // Maximum date is today or current date
            sx={{ ml: 2 }}
            slotProps={{
              textField: {
                readOnly: true,
              },
            }}
          />
        </Box>
      );
    } else {
      return <DatePicker {...datePickerProps} disabled={disabled} />;
    }
  };
  
  const getQuarterLabel = (quarter) => {
    switch (quarter) {
      case 1:
        return "Jan-Mar";
      case 2:
        return "Apr-Jun";
      case 3:
        return "Jul-Sep";
      case 4:
        return "Oct-Dec";
      default:
        return "";
    }
  };
  const renderQuarterButtons = () => {
    return (
      <Grid container spacing={2} justifyContent="center">
        {[1, 2, 3, 4].map((quarter) => (
          <Grid item key={quarter}>
            <Button
              variant={selectedQuarter === quarter ? "contained" : "outlined"}
              onClick={() => handleQuarterSelect(quarter)}
            >
              Q{quarter} - {getQuarterLabel(quarter)}
            </Button>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* Tabs for Day, Month, Year, Quarter */}
      {calendarTabs && (
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          {calendarTabs?.map(({ label, value }) => (
            <Tab key={label} value={value} label={label} />
          ))}
        </Tabs>
      )}

      {/* DatePicker or custom range picker */}
      <div style={{ marginTop: "20px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {activeTab !== "quarter" ? renderDatePickers() : renderQuarterButtons()}
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default UnifiedDatePicker;
