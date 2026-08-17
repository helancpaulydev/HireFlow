import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("hireflowUser");
    navigate("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: "⌂",
      path: "/dashboard",
    },
    {
      name: "Applications",
      icon: "▣",
      path: "/applications",
    },
    {
      name: "Interviews",
      icon: "◉",
      path: "/interviews",
    },
    {
      name: "Insights",
      icon: "◈",
      path: "/insights",
    },
    {
      name: "Progress",
      icon: "↗",
      path: "/progress",
    },
  ];

  return (
    <aside className="sidebar">

      {/* BRAND */}

      <div className="sidebar-brand">

        <div className="sidebar-brand-icon">
          H
        </div>

        <span>HireFlow</span>

      </div>


      {/* MAIN MENU */}

      <nav className="sidebar-menu">

        <p className="sidebar-label">
          WORKSPACE
        </p>

        {menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >

            <span className="sidebar-icon">
              {item.icon}
            </span>

            <span>
              {item.name}
            </span>

          </NavLink>

        ))}

      </nav>


      {/* BOTTOM MENU */}

      <div className="sidebar-bottom">

        <p className="sidebar-label">
          ACCOUNT
        </p>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span className="sidebar-icon">
            ◯
          </span>

          <span>Profile</span>

        </NavLink>


        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >

          <span className="sidebar-icon">
            ⚙
          </span>

          <span>Settings</span>

        </NavLink>


        {/* LOGOUT */}

        <button
          className="sidebar-logout"
          onClick={handleLogout}
        >

          <span className="sidebar-icon">
            ↪
          </span>

          <span>
            Sign out
          </span>

        </button>


        {/* MOTIVATION */}

        <div className="sidebar-motivation">

          <div className="motivation-icon">
            🌱
          </div>

          <div>
            <strong>
              Keep moving forward
            </strong>

            <p>
              Every application is
              part of the journey.
            </p>
          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;