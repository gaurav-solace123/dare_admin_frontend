import React from 'react';
import Menuitems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;

  const renderMenuItems = (items, level = 1) => {
    return items.map((item) => {
      if (item.subheader) {
        return <NavGroup item={item} key={item.subheader} />;
      } else {
        return (
          <>
            <NavItem item={item} key={item.id} level={level} pathDirect={pathDirect} />
            {/* Render children if any */}
            {item.children && (
              <List sx={{ pl: 4 }}>
                {renderMenuItems(item.children, level + 1)}
              </List>
            )}
          </>
        );
      }
    });
  };

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {renderMenuItems(Menuitems)}
      </List>
    </Box>
  );
};

export default SidebarItems;

