import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';

import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#001F3F">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <a
            href="/"
            className="text-decoration-none"
            style={{ color: 'inherit' }}
          > Logo
            
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink  to="/admin" >
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/faculty" >
              <CDBSidebarMenuItem icon="landmark">Faculty</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/marketing_manager" >
              <CDBSidebarMenuItem icon="user-graduate">Marketing Manager</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/marketing_coordinator" >
              <CDBSidebarMenuItem icon="user-tie">Marketing Coordiantor</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/student" >
              <CDBSidebarMenuItem icon="users">Student</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/term" >
              <CDBSidebarMenuItem icon="business-time">Terms</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/analytics">
              <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
            </NavLink>

            <NavLink  to="/hero404"  >
              <CDBSidebarMenuItem icon="user-circle">Profile</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>          
          
        </CDBSidebarContent>

        <CDBSidebarFooter className='sidebar-content'>
        <NavLink  to="/profile" >
              <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
            </NavLink>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;