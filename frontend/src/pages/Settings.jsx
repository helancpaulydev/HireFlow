import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const [interviewReminders, setInterviewReminders] =
    useState(true);

  const [applicationUpdates, setApplicationUpdates] =
    useState(true);

  const [weeklySummary, setWeeklySummary] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("hireflowUser")
  );

  const email =
    user?.email || "No email available";

  const handleLogout = () => {
    localStorage.removeItem("hireflow_access");
    localStorage.removeItem("hireflowUser");

    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#101311",
        color: "#f4f6f4",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}

        <p
          style={{
            color: "#a9c6af",
            letterSpacing: "2px",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          YOUR ACCOUNT
        </p>

        <h1
          style={{
            fontSize: "38px",
            margin: "5px 0",
          }}
        >
          Settings
        </h1>

        <p
          style={{
            color: "#a9c6af",
          }}
        >
          Manage your HireFlow preferences.
        </p>

        {/* NOTIFICATIONS */}

        <div style={cardStyle}>
          <h2>🔔 Notifications</h2>

          <p style={descriptionStyle}>
            Choose which notifications you'd like
            to receive.
          </p>

          <SettingToggle
            title="Interview reminders"
            description="Get reminded about upcoming interviews."
            checked={interviewReminders}
            onChange={() =>
              setInterviewReminders(
                !interviewReminders
              )
            }
          />

          <SettingToggle
            title="Application updates"
            description="Stay informed about your application activity."
            checked={applicationUpdates}
            onChange={() =>
              setApplicationUpdates(
                !applicationUpdates
              )
            }
          />

          <SettingToggle
            title="Weekly job-search summary"
            description="Receive a summary of your job-search progress."
            checked={weeklySummary}
            onChange={() =>
              setWeeklySummary(
                !weeklySummary
              )
            }
          />
        </div>

        {/* APPEARANCE */}

        <div style={cardStyle}>
          <h2>🎨 Appearance</h2>

          <p style={descriptionStyle}>
            Customize how HireFlow looks.
          </p>

          <div
            style={{
              background: "#101311",
              padding: "18px",
              borderRadius: "10px",
              border:
                "1px solid #303630",
            }}
          >
            <strong>
              Dark theme
            </strong>

            <p
              style={{
                color: "#7f8a81",
                marginBottom: 0,
              }}
            >
              HireFlow currently uses the dark
              theme.
            </p>
          </div>
        </div>

        {/* ACCOUNT */}

        <div style={cardStyle}>
          <h2>🔐 Account</h2>

          <p style={descriptionStyle}>
            Manage your account information.
          </p>

          <div
            style={{
              background: "#101311",
              padding: "18px",
              borderRadius: "10px",
              border:
                "1px solid #303630",
              marginBottom: "15px",
            }}
          >
            <span
              style={{
                color: "#7f8a81",
                fontSize: "13px",
              }}
            >
              Email
            </span>

            <p
              style={{
                margin:
                  "6px 0 0",
              }}
            >
              {email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={logoutButtonStyle}
          >
            🚪 Log out
          </button>
        </div>

        {/* REMINDER */}

        <div
          style={{
            background: "#181c19",
            padding: "25px",
            borderRadius: "14px",
            border:
              "1px solid #303630",
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "30px",
            }}
          >
            🌱
          </div>

          <h3>
            Keep moving forward
          </h3>

          <p
            style={{
              color: "#7f8a81",
              marginBottom: 0,
            }}
          >
            Small progress every day adds up.
          </p>
        </div>
      </div>
    </div>
  );
}


/* ==========================================================
   TOGGLE
========================================================== */

function SettingToggle({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        alignItems: "center",
        padding: "20px 0",
        borderBottom:
          "1px solid #303630",
      }}
    >
      <div>
        <strong>{title}</strong>

        <p
          style={{
            color: "#7f8a81",
            margin:
              "6px 0 0",
            fontSize: "14px",
          }}
        >
          {description}
        </p>
      </div>

      <button
        onClick={onChange}
        style={{
          width: "50px",
          height: "28px",
          borderRadius: "20px",
          border: "none",
          background: checked
            ? "#a9c6af"
            : "#303630",
          cursor: "pointer",
          position: "relative",
          transition: "0.2s",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "4px",
            left: checked
              ? "26px"
              : "4px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#f4f6f4",
            transition: "0.2s",
          }}
        />
      </button>
    </div>
  );
}


/* ==========================================================
   STYLES
========================================================== */

const cardStyle = {
  background: "#181c19",
  padding: "30px",
  borderRadius: "16px",
  border: "1px solid #303630",
  marginTop: "25px",
};

const descriptionStyle = {
  color: "#7f8a81",
  marginBottom: "20px",
};

const logoutButtonStyle = {
  background: "#321f20",
  color: "#f0b5b5",
  border:
    "1px solid #563537",
  padding: "12px 18px",
  borderRadius: "9px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
};

export default Settings;