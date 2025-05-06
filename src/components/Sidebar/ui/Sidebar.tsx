import React from 'react';

// import { NavLink } from 'react-router-dom';
// import { ThemeToggle } from '@/components/ThemeToggle';
import { ThemeToggle } from '@/components/ThemeToggle';

import './index.scss';

/*
TODO:
1. Сделать кастомный тонкий скролл для всех браузеров
*/

const Sidebar: React.FC = () => {
  return (
    <aside className={`sidebar`}>
      <div className="sidebar-header">
        <ThemeToggle />
      </div>
      <nav className="sidebar-nav">
        <ul>
          {/* <li><a href="/tasks">Tasks</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/settings">Settings</a></li> */}
        </ul>
      </nav>
      <div className="sidebar-footer">
        {/* <p>© 2025 Your App</p> */}
      
      </div>
    </aside>
  );
};

export default Sidebar;
