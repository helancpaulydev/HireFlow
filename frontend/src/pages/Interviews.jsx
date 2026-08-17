import { useEffect, useState } from "react";
import "./Interviews.css";

function Interviews() {
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [editingInterview, setEditingInterview] = useState(null);

  const [formData, setFormData] = useState({
    application: "",
    date: "",
    time: "",
    interview_type: "Online",
    status: "Upcoming",
    notes: "",
  });

  // ==========================================================
  // GET APPLICATIONS
  // ==========================================================

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("hireflow_access");

      const response = await fetch(
        "http://127.0.0.1:8000/api/applications/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to load applications");
      }

      const data = await response.json();

      setApplications(data);
    } catch (error) {
      console.error("Error loading applications:", error);
    }
  };

  // ==========================================================
  // GET INTERVIEWS
  // ==========================================================

  const fetchInterviews = async () => {
    try {
      const token = localStorage.getItem("hireflow_access");

      const response = await fetch(
        "http://127.0.0.1:8000/api/applications/interviews/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to load interviews");
      }

      const data = await response.json();

      setInterviews(data);
    } catch (error) {
      console.error("Error loading interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // LOAD DATA
  // ==========================================================

  useEffect(() => {
    fetchApplications();
    fetchInterviews();
  }, []);

  // ==========================================================
  // HANDLE FORM CHANGE
  // ==========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // ==========================================================
  // RESET FORM
  // ==========================================================

  const resetForm = () => {
    setFormData({
      application: "",
      date: "",
      time: "",
      interview_type: "Online",
      status: "Upcoming",
      notes: "",
    });

    setEditingInterview(null);
    setShowForm(false);
  };

  // ==========================================================
  // ADD INTERVIEW
  // ==========================================================

  const handleAddInterview = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("hireflow_access");

      const response = await fetch(
        "http://127.0.0.1:8000/api/applications/interviews/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            application: Number(formData.application),
            date: formData.date,
            time: formData.time,
            interview_type: formData.interview_type,
            status: formData.status,
            notes: formData.notes,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        alert("Could not add interview.");
        return;
      }

      setInterviews((previousInterviews) => [
        ...previousInterviews,
        data,
      ]);

      resetForm();

    } catch (error) {
      console.error("Error adding interview:", error);
      alert("Unable to connect to the server.");
    }
  };

  // ==========================================================
  // START EDITING
  // ==========================================================

  const startEditing = (interview) => {
    setEditingInterview(interview);

    setFormData({
      application: String(interview.application),
      date: interview.date || "",
      time: interview.time || "",
      interview_type: interview.interview_type || "Online",
      status: interview.status || "Upcoming",
      notes: interview.notes || "",
    });

    setShowForm(true);
  };

  // ==========================================================
  // UPDATE INTERVIEW
  // ==========================================================

  const handleUpdateInterview = async (event) => {
    event.preventDefault();

    if (!editingInterview) {
      return;
    }

    try {
      const token = localStorage.getItem("hireflow_access");

      const response = await fetch(
        `http://127.0.0.1:8000/api/applications/interviews/${editingInterview.id}/`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            application: Number(formData.application),
            date: formData.date,
            time: formData.time,
            interview_type: formData.interview_type,
            status: formData.status,
            notes: formData.notes,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        alert("Could not update interview.");
        return;
      }

      setInterviews((previousInterviews) =>
        previousInterviews.map((interview) =>
          interview.id === editingInterview.id
            ? data
            : interview
        )
      );

      resetForm();

    } catch (error) {
      console.error("Error updating interview:", error);
      alert("Unable to connect to the server.");
    }
  };

  // ==========================================================
  // DELETE INTERVIEW
  // ==========================================================

  const handleDeleteInterview = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("hireflow_access");

      const response = await fetch(
        `http://127.0.0.1:8000/api/applications/interviews/${id}/`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        alert("Could not delete interview.");
        return;
      }

      setInterviews((previousInterviews) =>
        previousInterviews.filter(
          (interview) => interview.id !== id
        )
      );

    } catch (error) {
      console.error("Error deleting interview:", error);
      alert("Unable to connect to the server.");
    }
  };

  // ==========================================================
  // FIND APPLICATION
  // ==========================================================

  const getApplication = (applicationId) => {
    return applications.find(
      (application) => application.id === applicationId
    );
  };

  // ==========================================================
  // FILTER INTERVIEWS
  // ==========================================================

  const upcomingInterviews = interviews.filter(
    (interview) => interview.status === "Upcoming"
  );

  const completedInterviews = interviews.filter(
    (interview) => interview.status === "Completed"
  );

  const cancelledInterviews = interviews.filter(
    (interview) => interview.status === "Cancelled"
  );

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="interviews-page">
        <div className="empty-state">
          <h3>Loading interviews...</h3>
        </div>
      </div>
    );
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="interviews-page">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="page-header">

        <div>
          <h1>Interviews</h1>

          <p>
            Keep track of your upcoming and completed interviews.
          </p>
        </div>

        <button
          className="add-interview-btn"
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
            }
          }}
        >
          {showForm ? "Close" : "+ Add Interview"}
        </button>

      </div>


      {/* ======================================================
          STATISTICS
      ====================================================== */}

      <div className="interview-stats">

        <div className="stat-card">

          <div className="stat-icon">
            📅
          </div>

          <div>
            <h3>{interviews.length}</h3>
            <p>Total Interviews</p>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            ⏳
          </div>

          <div>
            <h3>{upcomingInterviews.length}</h3>
            <p>Upcoming</p>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            ✓
          </div>

          <div>
            <h3>{completedInterviews.length}</h3>
            <p>Completed</p>
          </div>

        </div>

      </div>


      {/* ======================================================
          ADD / EDIT FORM
      ====================================================== */}

      {showForm && (

        <div className="interview-form-card">

          <div className="form-header">

            <h2>
              {editingInterview
                ? "Edit Interview"
                : "Add New Interview"}
            </h2>

            <button
              className="close-btn"
              onClick={resetForm}
            >
              ×
            </button>

          </div>


          {applications.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                💼
              </div>

              <h3>No applications available</h3>

              <p>
                Add an application first before creating an
                interview.
              </p>

            </div>

          ) : (

            <form
              onSubmit={
                editingInterview
                  ? handleUpdateInterview
                  : handleAddInterview
              }
            >

              <div className="form-grid">

                {/* APPLICATION */}

                <div className="form-group">

                  <label>
                    Job Application
                  </label>

                  <select
                    name="application"
                    value={formData.application}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select an application
                    </option>

                    {applications.map((application) => (

                      <option
                        key={application.id}
                        value={application.id}
                      >
                        {application.company} —{" "}
                        {application.job_title}
                      </option>

                    ))}

                  </select>

                </div>


                {/* DATE */}

                <div className="form-group">

                  <label>
                    Interview Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* TIME */}

                <div className="form-group">

                  <label>
                    Interview Time
                  </label>

                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* TYPE */}

                <div className="form-group">

                  <label>
                    Interview Type
                  </label>

                  <select
                    name="interview_type"
                    value={formData.interview_type}
                    onChange={handleChange}
                  >

                    <option value="Online">
                      Online
                    </option>

                    <option value="Phone">
                      Phone
                    </option>

                    <option value="In-person">
                      In-person
                    </option>

                  </select>

                </div>


                {/* STATUS */}

                <div className="form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >

                    <option value="Upcoming">
                      Upcoming
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>

                  </select>

                </div>

              </div>


              {/* NOTES */}

              <div className="form-group full-width">

                <label>
                  Notes
                </label>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add preparation notes, meeting link, location, etc."
                  rows="4"
                />

              </div>


              {/* BUTTONS */}

              <div className="form-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  {editingInterview
                    ? "Update Interview"
                    : "Save Interview"}
                </button>

              </div>

            </form>

          )}

        </div>

      )}


      {/* ======================================================
          UPCOMING INTERVIEWS
      ====================================================== */}

      <div className="interview-section">

        <div className="section-title">

          <h2>
            Upcoming Interviews
          </h2>

          <span>
            {upcomingInterviews.length}
          </span>

        </div>


        {upcomingInterviews.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              📅
            </div>

            <h3>
              No upcoming interviews
            </h3>

            <p>
              Add an interview to keep track of your schedule.
            </p>

          </div>

        ) : (

          <div className="interview-list">

            {upcomingInterviews.map((interview) => {

              const application = getApplication(
                interview.application
              );

              return (

                <div
                  className="interview-card"
                  key={interview.id}
                >

                  <div className="interview-main">

                    <div className="company-icon">

                      {application
                        ? application.company
                            .charAt(0)
                            .toUpperCase()
                        : "?"}

                    </div>


                    <div className="interview-info">

                      <h3>
                        {application
                          ? application.job_title
                          : "Unknown Position"}
                      </h3>

                      <p className="company-name">

                        {application
                          ? application.company
                          : "Unknown Company"}

                      </p>


                      <div className="interview-details">

                        <span>
                          📅 {interview.date}
                        </span>

                        <span>
                          ⏰ {interview.time}
                        </span>

                        <span>
                          💻 {interview.interview_type}
                        </span>

                      </div>


                      {interview.notes && (

                        <p className="interview-notes">
                          📝 {interview.notes}
                        </p>

                      )}

                    </div>

                  </div>


                  <div className="interview-actions">

                    <span className="status upcoming">
                      Upcoming
                    </span>

                    <button
                      onClick={() =>
                        startEditing(interview)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDeleteInterview(
                          interview.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </div>


      {/* ======================================================
          COMPLETED INTERVIEWS
      ====================================================== */}

      <div className="interview-section">

        <div className="section-title">

          <h2>
            Completed Interviews
          </h2>

          <span>
            {completedInterviews.length}
          </span>

        </div>


        {completedInterviews.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              ✓
            </div>

            <h3>
              No completed interviews
            </h3>

            <p>
              Your completed interviews will appear here.
            </p>

          </div>

        ) : (

          <div className="interview-list">

            {completedInterviews.map((interview) => {

              const application = getApplication(
                interview.application
              );

              return (

                <div
                  className="interview-card completed-card"
                  key={interview.id}
                >

                  <div className="interview-main">

                    <div className="company-icon">

                      {application
                        ? application.company
                            .charAt(0)
                            .toUpperCase()
                        : "?"}

                    </div>


                    <div className="interview-info">

                      <h3>

                        {application
                          ? application.job_title
                          : "Unknown Position"}

                      </h3>

                      <p className="company-name">

                        {application
                          ? application.company
                          : "Unknown Company"}

                      </p>


                      <div className="interview-details">

                        <span>
                          📅 {interview.date}
                        </span>

                        <span>
                          ⏰ {interview.time}
                        </span>

                        <span>
                          💻 {interview.interview_type}
                        </span>

                      </div>


                      {interview.notes && (

                        <p className="interview-notes">
                          📝 {interview.notes}
                        </p>

                      )}

                    </div>

                  </div>


                  <div className="interview-actions">

                    <span className="status completed">
                      Completed
                    </span>

                    <button
                      onClick={() =>
                        startEditing(interview)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDeleteInterview(
                          interview.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </div>


      {/* ======================================================
          CANCELLED INTERVIEWS
      ====================================================== */}

      {cancelledInterviews.length > 0 && (

        <div className="interview-section">

          <div className="section-title">

            <h2>
              Cancelled Interviews
            </h2>

            <span>
              {cancelledInterviews.length}
            </span>

          </div>


          <div className="interview-list">

            {cancelledInterviews.map((interview) => {

              const application = getApplication(
                interview.application
              );

              return (

                <div
                  className="interview-card"
                  key={interview.id}
                >

                  <div className="interview-main">

                    <div className="company-icon">
                      {application
                        ? application.company
                            .charAt(0)
                            .toUpperCase()
                        : "?"}
                    </div>


                    <div className="interview-info">

                      <h3>
                        {application
                          ? application.job_title
                          : "Unknown Position"}
                      </h3>

                      <p className="company-name">
                        {application
                          ? application.company
                          : "Unknown Company"}
                      </p>

                      <div className="interview-details">

                        <span>
                          📅 {interview.date}
                        </span>

                        <span>
                          ⏰ {interview.time}
                        </span>

                        <span>
                          💻 {interview.interview_type}
                        </span>

                      </div>

                      {interview.notes && (

                        <p className="interview-notes">
                          📝 {interview.notes}
                        </p>

                      )}

                    </div>

                  </div>


                  <div className="interview-actions">

                    <span
                      className="status"
                      style={{
                        background: "#392727",
                        color: "#ef9a9a",
                      }}
                    >
                      Cancelled
                    </span>

                    <button
                      onClick={() =>
                        startEditing(interview)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDeleteInterview(
                          interview.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              );
            })}

          </div>

        </div>

      )}

    </div>
  );
}

export default Interviews;