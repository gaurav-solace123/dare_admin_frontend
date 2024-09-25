import React from "react";
import DashboardCard from "../../../components/shared/DashboardCard";
import { MenuItem, Select } from "@mui/material";
import Chart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import PieArcLabel from "./PieArcLabel";
import MenuOption from "./MenuOption";
function DigitalAdminPanel({ title,subTitle, data, options, menuOnChange }) {
  const [month, setMonth] = React.useState("1");

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // chart
  const optionscolumnchart = {
    chart: {
      type: "bar",
      fontFamily: "'Poppins', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
      height: 370,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "42%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },

    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: [
        "16/08",
        "17/08",
        "18/08",
        "19/08",
        "20/08",
        "21/08",
        "22/08",
        "23/08",
      ],
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart = [
    {
      name: "Eanings this month",
      data: [355, 390, 300, 350, 390, 180, 355, 390],
    },
    {
      name: "Expense this month",
      data: [280, 250, 325, 215, 250, 310, 280, 250],
    },
  ];
  return (
    <DashboardCard
      title={title}
      subtitle={subTitle}
      action={<MenuOption options={options} onChange={menuOnChange} />}
    >
      <PieArcLabel data={data} />
    </DashboardCard>
  );
}

export default DigitalAdminPanel;
