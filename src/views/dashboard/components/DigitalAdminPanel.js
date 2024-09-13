import React from 'react'
import DashboardCard from '../../../components/shared/DashboardCard'
import PieArcLabel from './PieArcLabel';
import MenuOption from './MenuOption';
function DigitalAdminPanel({ title,data,options }) {
    // chart
    return (
        <DashboardCard title={title} action={<MenuOption options={options} />}>
            <PieArcLabel data={data} />
        </DashboardCard>
    )
}

export default DigitalAdminPanel