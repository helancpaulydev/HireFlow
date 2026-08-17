import { useEffect, useState } from "react";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add application form
  const [showForm, setShowForm] = useState(false);

  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");

  // Edit application
  const [editingId, setEditingId] = useState(null);

  const [editCompany, setEditCompany] = useState("");
  const [editJobTitle, setEditJobTitle] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editJobLink, setEditJobLink] = useState("");
  const [editDateApplied, setEditDateApplied] = useState("");
  const [editStatus, setEditStatus] = useState("Applied");
  const [editNotes, setEditNotes] = useState("");

  // --------------------------------------------------
  // GET APPLICATIONS
  // --------------------------------------------------

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // --------------------------------------------------
  // ADD APPLICATION
  // --------------------------------------------------

  const handleAddApplication = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("hireflow_access");

      const response = await fetch(
        "http://127.0.0.1:8000/api/applications/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            company: company,
            job_title: jobTitle,
            location: location,
            job_link: jobLink,
            date_applied: dateApplied,
            status: status,
            notes: notes,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        alert("Could not add application.");
        return;
      }

      setApplications((previousApplications) => [
        data,
        ...previousApplications,
      ]);

      // Clear form
      setCompany("");
      setJobTitle("");
      setLocation("");
      setJobLink("");
      setDateApplied("");
      setStatus("Applied");
      setNotes("");

      setShowForm(false);

    } catch (error) {
      console.error("Error adding application:", error);
      alert("Unable to connect to the server.");
    }
  };

  // --------------------------------------------------
  // START EDITING
  // --------------------------------------------------

  const startEditing = (application) => {
    setEditingId(application.id);

    setEditCompany(application.company || "");
    setEditJobTitle(application.job_title || "");
    setEditLocation(application.location || "");
    setEditJobLink(application.job_link || "");
    setEditDateApplied(application.date_applied || "");
    setEditStatus(application.status || "Applied");
    setEditNotes(application.notes || "");

    // Close add form if it is open
    setShowForm(false);
  };

  // --------------------------------------------------
  // CANCEL EDIT
  // --------------------------------------------------

  const cancelEditing = () => {
    setEditingId(null);

    setEditCompany("");
    setEditJobTitle("");
    setEditLocation("");
    setEditJobLink("");
    setEditDateApplied("");
    setEditStatus("Applied");
    setEditNotes("");
  };

  // --------------------------------------------------
  // UPDATE APPLICATION
  // --------------------------------------------------

  const handleUpdateApplication = async (event, id) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("hireflow_access");

      const response = await fetch(
        `http://127.0.0.1:8000/api/applications/${id}/`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            company: editCompany,
            job_title: editJobTitle,
            location: editLocation,
            job_link: editJobLink,
            date_applied: editDateApplied,
            status: editStatus,
            notes: editNotes,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        alert("Could not update application.");
        return;
      }

      setApplications((previousApplications) =>
        previousApplications.map((application) =>
          application.id === id ? data : application
        )
      );

      cancelEditing();

    } catch (error) {
      console.error("Error updating application:", error);
      alert("Unable to connect to the server.");
    }
  };

  // --------------------------------------------------
  // DELETE APPLICATION
  // --------------------------------------------------

  const handleDeleteApplication = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("hireflow_access");

      const response = await fetch(
        `http://127.0.0.1:8000/api/applications/${id}/`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        let data = {};

        try {
          data = await response.json();
        } catch {
          // No JSON response
        }

        console.error(data);

        alert("Could not delete application.");
        return;
      }

      setApplications((previousApplications) =>
        previousApplications.filter(
          (application) => application.id !== id
        )
      );

    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Unable to connect to the server.");
    }
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

      {/* --------------------------------------------------
          HEADER
      -------------------------------------------------- */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "35px",
        }}
      >

        <div>

          <h1
            style={{
              margin: 0,
              fontSize: "36px",
            }}
          >
            My Applications
          </h1>

          <p
            style={{
              color: "#a9c6af",
              fontSize: "16px",
            }}
          >
            Keep track of every opportunity and keep moving forward. 🌱
          </p>

        </div>

        <button
          onClick={() => {
            setShowForm(!showForm);

            if (editingId !== null) {
              cancelEditing();
            }
          }}
          style={primaryButtonStyle}
        >
          {showForm ? "Close" : "+ Add Application"}
        </button>

      </div>


      {/* --------------------------------------------------
          ADD APPLICATION FORM
      -------------------------------------------------- */}

      {showForm && (

        <div style={formCardStyle}>

          <h2>Add New Application</h2>

          <form onSubmit={handleAddApplication}>

            <div style={formGridStyle}>

              {/* COMPANY */}

              <div>
                <label>Company</label>

                <input
                  type="text"
                  placeholder="e.g. Google"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>


              {/* JOB TITLE */}

              <div>
                <label>Job Title</label>

                <input
                  type="text"
                  placeholder="e.g. Software Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>


              {/* LOCATION */}

              <div>
                <label>Location</label>

                <input
                  type="text"
                  placeholder="e.g. Bangalore / Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={inputStyle}
                />
              </div>


              {/* JOB LINK */}

              <div>
                <label>Job Link</label>

                <input
                  type="url"
                  placeholder="https://..."
                  value={jobLink}
                  onChange={(e) => setJobLink(e.target.value)}
                  style={inputStyle}
                />
              </div>


              {/* DATE */}

              <div>
                <label>Date Applied</label>

                <input
                  type="date"
                  value={dateApplied}
                  onChange={(e) => setDateApplied(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>


              {/* STATUS */}

              <div>
                <label>Status</label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={inputStyle}
                >
                  <option value="Applied">Applied</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Withdrawn">Withdrawn</option>
                </select>
              </div>

            </div>


            {/* NOTES */}

            <div style={{ marginTop: "20px" }}>

              <label>Notes</label>

              <textarea
                placeholder="Add notes about this application..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="4"
                style={{
                  ...inputStyle,
                  resize: "vertical",
                }}
              />

            </div>


            <button
              type="submit"
              style={{
                ...primaryButtonStyle,
                marginTop: "20px",
              }}
            >
              Save Application
            </button>

          </form>

        </div>
      )}


      {/* --------------------------------------------------
          APPLICATION LIST
      -------------------------------------------------- */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >

        {loading ? (

          <p>Loading applications...</p>

        ) : applications.length === 0 ? (

          <div style={emptyCardStyle}>

            <h2>No applications yet</h2>

            <p style={{ color: "#a9c6af" }}>
              Add your first application and start tracking your journey. 🌱
            </p>

          </div>

        ) : (

          <div
            style={{
              display: "grid",
              gap: "18px",
            }}
          >

            {applications.map((application) => (

              <div
                key={application.id}
                style={{
                  background: "#181c19",
                  padding: "24px",
                  borderRadius: "14px",
                  border: "1px solid #303630",
                }}
              >

                {/* --------------------------------------------------
                    EDIT MODE
                -------------------------------------------------- */}

                {editingId === application.id ? (

                  <form
                    onSubmit={(event) =>
                      handleUpdateApplication(
                        event,
                        application.id
                      )
                    }
                  >

                    <h2
                      style={{
                        marginTop: 0,
                        marginBottom: "25px",
                      }}
                    >
                      Edit Application
                    </h2>

                    <div style={formGridStyle}>

                      {/* EDIT COMPANY */}

                      <div>
                        <label>Company</label>

                        <input
                          type="text"
                          value={editCompany}
                          onChange={(e) =>
                            setEditCompany(e.target.value)
                          }
                          required
                          style={inputStyle}
                        />
                      </div>


                      {/* EDIT JOB TITLE */}

                      <div>
                        <label>Job Title</label>

                        <input
                          type="text"
                          value={editJobTitle}
                          onChange={(e) =>
                            setEditJobTitle(e.target.value)
                          }
                          required
                          style={inputStyle}
                        />
                      </div>


                      {/* EDIT LOCATION */}

                      <div>
                        <label>Location</label>

                        <input
                          type="text"
                          value={editLocation}
                          onChange={(e) =>
                            setEditLocation(e.target.value)
                          }
                          style={inputStyle}
                        />
                      </div>


                      {/* EDIT JOB LINK */}

                      <div>
                        <label>Job Link</label>

                        <input
                          type="url"
                          value={editJobLink}
                          onChange={(e) =>
                            setEditJobLink(e.target.value)
                          }
                          style={inputStyle}
                        />
                      </div>


                      {/* EDIT DATE */}

                      <div>
                        <label>Date Applied</label>

                        <input
                          type="date"
                          value={editDateApplied}
                          onChange={(e) =>
                            setEditDateApplied(e.target.value)
                          }
                          required
                          style={inputStyle}
                        />
                      </div>


                      {/* EDIT STATUS */}

                      <div>
                        <label>Status</label>

                        <select
                          value={editStatus}
                          onChange={(e) =>
                            setEditStatus(e.target.value)
                          }
                          style={inputStyle}
                        >
                          <option value="Applied">
                            Applied
                          </option>

                          <option value="Shortlisted">
                            Shortlisted
                          </option>

                          <option value="Interview">
                            Interview
                          </option>

                          <option value="Offer">
                            Offer
                          </option>

                          <option value="Rejected">
                            Rejected
                          </option>

                          <option value="Withdrawn">
                            Withdrawn
                          </option>
                        </select>
                      </div>

                    </div>


                    {/* EDIT NOTES */}

                    <div
                      style={{
                        marginTop: "20px",
                      }}
                    >

                      <label>Notes</label>

                      <textarea
                        value={editNotes}
                        onChange={(e) =>
                          setEditNotes(e.target.value)
                        }
                        rows="4"
                        style={{
                          ...inputStyle,
                          resize: "vertical",
                        }}
                      />

                    </div>


                    {/* EDIT BUTTONS */}

                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginTop: "20px",
                      }}
                    >

                      <button
                        type="submit"
                        style={primaryButtonStyle}
                      >
                        Save Changes
                      </button>

                      <button
                        type="button"
                        onClick={cancelEditing}
                        style={secondaryButtonStyle}
                      >
                        Cancel
                      </button>

                    </div>

                  </form>

                ) : (

                  /* --------------------------------------------------
                     NORMAL VIEW MODE
                  -------------------------------------------------- */

                  <>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "20px",
                      }}
                    >

                      <div>

                        <h2
                          style={{
                            margin: "0 0 8px",
                          }}
                        >
                          {application.job_title}
                        </h2>

                        <p
                          style={{
                            margin: 0,
                            color: "#a9c6af",
                            fontSize: "17px",
                          }}
                        >
                          {application.company}
                        </p>

                      </div>


                      {/* STATUS */}

                      <span
                        style={{
                          padding: "7px 12px",
                          borderRadius: "20px",
                          background: "#263128",
                          color: "#c9dfce",
                          fontSize: "13px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {application.status}
                      </span>

                    </div>


                    {/* DETAILS */}

                    <div
                      style={{
                        marginTop: "18px",
                        color: "#b9c0ba",
                        lineHeight: "1.8",
                      }}
                    >

                      <div>
                        📅 Applied: {application.date_applied}
                      </div>

                      {application.location && (

                        <div>
                          📍 {application.location}
                        </div>

                      )}

                      {application.job_link && (

                        <div>
                          🔗{" "}

                          <a
                            href={application.job_link}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              color: "#a9c6af",
                            }}
                          >
                            View Job
                          </a>

                        </div>

                      )}

                      {application.notes && (

                        <div
                          style={{
                            marginTop: "10px",
                          }}
                        >
                          📝 {application.notes}
                        </div>

                      )}

                    </div>


                    {/* ACTION BUTTONS */}

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "22px",
                      }}
                    >

                      <button
                        type="button"
                        onClick={() =>
                          startEditing(application)
                        }
                        style={editButtonStyle}
                      >
                        ✏️ Edit
                      </button>


                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteApplication(
                            application.id
                          )
                        }
                        style={deleteButtonStyle}
                      >
                        🗑️ Delete
                      </button>

                    </div>

                  </>

                )}

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}


/* ==========================================================
   STYLES
========================================================== */

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  marginTop: "8px",
  padding: "12px",
  background: "#101311",
  color: "#f4f6f4",
  border: "1px solid #3a423b",
  borderRadius: "8px",
  fontSize: "15px",
};


const formGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
};


const primaryButtonStyle = {
  background: "#a9c6af",
  color: "#101311",
  border: "none",
  padding: "13px 20px",
  borderRadius: "10px",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
};


const secondaryButtonStyle = {
  background: "#303630",
  color: "#f4f6f4",
  border: "none",
  padding: "13px 20px",
  borderRadius: "10px",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
};


const editButtonStyle = {
  background: "#263128",
  color: "#c9dfce",
  border: "1px solid #3a423b",
  padding: "10px 16px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
};


const deleteButtonStyle = {
  background: "#321f20",
  color: "#f0b5b5",
  border: "1px solid #563537",
  padding: "10px 16px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
};


const formCardStyle = {
  maxWidth: "1100px",
  margin: "0 auto 35px",
  background: "#181c19",
  padding: "30px",
  borderRadius: "16px",
  border: "1px solid #303630",
};


const emptyCardStyle = {
  background: "#181c19",
  padding: "50px",
  borderRadius: "16px",
  textAlign: "center",
};


export default Applications;