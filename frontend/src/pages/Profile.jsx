import { useEffect, useState } from "react";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    degree: "",
    college: "",
    field_of_study: "",
    graduation_year: "",
    current_job_title: "",
    years_of_experience: "",
    skills: "",
    preferred_job_role: "",
    preferred_work_location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    about: "",
  });

  // ==========================================================
  // LOAD PROFILE
  // ==========================================================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token =
          localStorage.getItem("hireflow_access");

        const response = await fetch(
          "http://127.0.0.1:8000/api/accounts/profile/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load profile"
          );
        }

        const data = await response.json();

        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
          degree: data.degree || "",
          college: data.college || "",
          field_of_study:
            data.field_of_study || "",
          graduation_year:
            data.graduation_year || "",
          current_job_title:
            data.current_job_title || "",
          years_of_experience:
            data.years_of_experience || "",
          skills: data.skills || "",
          preferred_job_role:
            data.preferred_job_role || "",
          preferred_work_location:
            data.preferred_work_location || "",
          linkedin: data.linkedin || "",
          github: data.github || "",
          portfolio: data.portfolio || "",
          about: data.about || "",
        });

      } catch (error) {
        console.error(
          "Profile loading error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ==========================================================
  // HANDLE INPUT
  // ==========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  };

  // ==========================================================
  // SAVE PROFILE
  // ==========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const token =
        localStorage.getItem("hireflow_access");

      const response = await fetch(
        "http://127.0.0.1:8000/api/accounts/profile/",
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data);

        setMessage(
          "Could not save your profile."
        );

        return;
      }

      setFormData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        location: data.location || "",
        degree: data.degree || "",
        college: data.college || "",
        field_of_study:
          data.field_of_study || "",
        graduation_year:
          data.graduation_year || "",
        current_job_title:
          data.current_job_title || "",
        years_of_experience:
          data.years_of_experience || "",
        skills: data.skills || "",
        preferred_job_role:
          data.preferred_job_role || "",
        preferred_work_location:
          data.preferred_work_location || "",
        linkedin: data.linkedin || "",
        github: data.github || "",
        portfolio: data.portfolio || "",
        about: data.about || "",
      });

      // Keep the local user information updated
      const existingUser =
        JSON.parse(
          localStorage.getItem(
            "hireflowUser"
          )
        ) || {};

      localStorage.setItem(
        "hireflowUser",
        JSON.stringify({
          ...existingUser,
          name: data.name || "",
          email: data.email || "",
        })
      );

      setMessage(
        "Profile saved successfully! ✓"
      );

    } catch (error) {
      console.error(
        "Profile save error:",
        error
      );

      setMessage(
        "Unable to connect to the server."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={loadingStyle}>
          Loading your profile...
        </div>
      </div>
    );
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>

        {/* HEADER */}

        <div style={headerStyle}>
          <p style={eyebrowStyle}>
            YOUR ACCOUNT
          </p>

          <h1 style={titleStyle}>
            My Profile
          </h1>

          <p style={subtitleStyle}>
            Keep your professional information
            up to date.
          </p>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>

          {/* PERSONAL INFORMATION */}

          <div style={cardStyle}>
            <SectionTitle
              icon="👤"
              title="Personal information"
              description="Basic information about you."
            />

            <div style={gridStyle}>

              <FormField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />

              <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />

              <FormField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91..."
              />

              <FormField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Kochi, Kerala"
              />

            </div>
          </div>

          {/* EDUCATION */}

          <div style={cardStyle}>
            <SectionTitle
              icon="🎓"
              title="Education"
              description="Tell us about your educational background."
            />

            <div style={gridStyle}>

              <FormField
                label="Degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder="B.Tech"
              />

              <FormField
                label="College / University"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="Your college"
              />

              <FormField
                label="Field of Study"
                name="field_of_study"
                value={
                  formData.field_of_study
                }
                onChange={handleChange}
                placeholder="Computer Science"
              />

              <FormField
                label="Graduation Year"
                name="graduation_year"
                value={
                  formData.graduation_year
                }
                onChange={handleChange}
                placeholder="2027"
              />

            </div>
          </div>

          {/* CAREER */}

          <div style={cardStyle}>
            <SectionTitle
              icon="💼"
              title="Career"
              description="Tell us what you're doing and what you're looking for."
            />

            <div style={gridStyle}>

              <FormField
                label="Current Job Title (if applicable)"
                name="current_job_title"
                value={
                  formData.current_job_title
                }
                onChange={handleChange}
                placeholder="Leave blank if you're a student/fresher"
              />

              <FormField
                label="Experience Level"
                name="years_of_experience"
                value={
                  formData.years_of_experience
                }
                onChange={handleChange}
                placeholder="Fresher / 1 year / 2 years"
              />

              <FormField
                label="Preferred Job Role"
                name="preferred_job_role"
                value={
                  formData.preferred_job_role
                }
                onChange={handleChange}
                placeholder="Software Engineer"
              />

              <FormField
                label="Preferred Work Location"
                name="preferred_work_location"
                value={
                  formData.preferred_work_location
                }
                onChange={handleChange}
                placeholder="Remote / Bangalore"
              />

            </div>

            <div style={singleFieldStyle}>
              <FormField
                label="Skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Python, Django, React, Java..."
              />
            </div>
          </div>

          {/* LINKS */}

          <div style={cardStyle}>
            <SectionTitle
              icon="🔗"
              title="Professional links"
              description="Add links that help recruiters learn more about you."
            />

            <div style={gridStyle}>

              <FormField
                label="LinkedIn"
                name="linkedin"
                type="url"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
              />

              <FormField
                label="GitHub"
                name="github"
                type="url"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />

              <FormField
                label="Portfolio"
                name="portfolio"
                type="url"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="https://..."
              />

            </div>
          </div>

          {/* ABOUT */}

          <div style={cardStyle}>
            <SectionTitle
              icon="📝"
              title="About me"
              description="Write a short professional introduction."
            />

            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Tell recruiters a little about yourself..."
              rows="6"
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
            />
          </div>

          {/* SAVE */}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "20px",
              marginBottom: "40px",
            }}
          >

            {message && (
              <span
                style={{
                  color:
                    message.includes(
                      "successfully"
                    )
                      ? "#a9c6af"
                      : "#f0b5b5",
                }}
              >
                {message}
              </span>
            )}

            <button
              type="submit"
              disabled={saving}
              style={{
                ...saveButtonStyle,
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving
                ? "Saving..."
                : "Save Profile"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}


/* ==========================================================
   COMPONENTS
========================================================== */

function SectionTitle({
  icon,
  title,
  description,
}) {
  return (
    <div
      style={{
        marginBottom: "25px",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "22px",
        }}
      >
        {icon} {title}
      </h2>

      <p
        style={{
          color: "#7f8a81",
          marginTop: "7px",
        }}
      >
        {description}
      </p>
    </div>
  );
}


function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "14px",
          fontWeight: "600",
          color: "#d7ded8",
        }}
      >
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={inputStyle}
      />
    </div>
  );
}


/* ==========================================================
   STYLES
========================================================== */

const pageStyle = {
  minHeight: "100vh",
  background: "#101311",
  color: "#f4f6f4",
  padding: "40px",
};


const containerStyle = {
  maxWidth: "1000px",
  margin: "0 auto",
};


const headerStyle = {
  marginBottom: "30px",
};


const eyebrowStyle = {
  color: "#a9c6af",
  letterSpacing: "2px",
  fontSize: "12px",
  fontWeight: "600",
  margin: 0,
};


const titleStyle = {
  fontSize: "38px",
  margin: "5px 0",
};


const subtitleStyle = {
  color: "#a9c6af",
  fontSize: "16px",
};


const cardStyle = {
  background: "#181c19",
  padding: "30px",
  borderRadius: "16px",
  border: "1px solid #303630",
  marginBottom: "22px",
};


const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "22px",
};


const singleFieldStyle = {
  marginTop: "22px",
};


const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  marginTop: "8px",
  padding: "13px",
  background: "#101311",
  color: "#f4f6f4",
  border: "1px solid #3a423b",
  borderRadius: "9px",
  fontSize: "15px",
  outline: "none",
};


const saveButtonStyle = {
  background: "#a9c6af",
  color: "#101311",
  border: "none",
  padding: "14px 25px",
  borderRadius: "10px",
  fontSize: "15px",
  fontWeight: "700",
  cursor: "pointer",
};


const loadingStyle = {
  minHeight: "100vh",
  background: "#101311",
  color: "#f4f6f4",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
};


export default Profile;