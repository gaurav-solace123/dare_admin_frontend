import React from "react";
import DashboardCard from "../../../components/shared/DashboardCard";
import PieArcLabel from "./PieArcLabel";
import MenuOption from "./MenuOption";
function DigitalAdminPanel({ title, subTitle, data, options, menuOnChange }) {
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
