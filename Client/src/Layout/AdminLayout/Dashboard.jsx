import React from 'react';
import './Dashboard.css';
import Linechart from './Linechart';
import AdminNavbar from './AdminNavbar';

const AdminDashboard = () => {
  return (
    
    <div className="admin-dashboard">

      <AdminNavbar/>
      <header className="dashboard-header">
        {/* <h1>Hello, Admin</h1>
        <p>Your control center at a glance</p> */}
      </header>

      <section className="dashboard-metrics">
        <div className="metric-card users">
          <h3>Total Users</h3>
          <p>1,240 <span className="positive">+10%</span></p>
        </div>

        <div className="metric-card courses">
          <h3>Courses</h3>
          <p>85 <span className="neutral">0%</span></p>
        </div>

        <div className="metric-card feedback">
          <h3>Feedback</h3>
          <p>320 <span className="positive">+5%</span></p>
        </div>

        <div className="metric-card earnings">
          <h3>Skills</h3>
          <p>500 <span className="positive">+12%</span></p>
        </div>

        <div className="metric-card instructors">
          <h3>Instructors</h3>
          <p>45 <span className="positive">+2%</span></p>
        </div>

        <div className="metric-card students">
          <h3>Active Students</h3>
          <p>980 <span className="negative">-1%</span></p>
        </div>
      </section>

      {/* Only one big chart below */}
      <section className="dashboard-chart">
        <div className="chart-box large">
          <h3>User Growth</h3>
          <Linechart />
        </div>
      </section>

      <section className="dashboard-activity">
        <div className="activity-box">
          <h3>Recent Activity</h3>
          <ul>
            <li><strong>John</strong> enrolled in "React Basics" <span>5 min ago</span></li>
            <li>New course "Node.js Advanced" published <span>1 hr ago</span></li>
            <li><strong>Jane</strong> left feedback on "UI Design" <span>3 hrs ago</span></li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
