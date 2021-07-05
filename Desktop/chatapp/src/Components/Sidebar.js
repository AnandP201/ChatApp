import React from 'react';
import DashboardToggle from './dashboard/DashboardToggle';
import RoomCreationModal from './RoomCreationModal';

const Sidebar = () => (
  <div className="h-100 pt-2">
    <div>
      <DashboardToggle />
      <RoomCreationModal />
    </div>
  </div>
);

export default Sidebar;
