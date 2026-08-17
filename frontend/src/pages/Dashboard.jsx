import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("hireflowUser"));
  const firstName = user?.name?.split(" ")[0] || "there";

  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("hireflow_access");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [applicationsResponse, interviewsResponse] =
          await Promise.all([
            fetch("http://127.0.0.1:8000/api/applications/", {
              headers,
            }),
            fetch("http://127.0.0.1:8000/api/applications/interviews/", {
              headers,
            }),
          ]);

        if (!applicationsResponse.ok || !interviewsResponse.ok) {
          throw new Error("Unable to load dashboard data");
        }

        const applicationsData = await applicationsResponse.json();
        const interviewsData = await interviewsResponse.json();

        setApplications(applicationsData);
        setInterviews(interviewsData);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalApplications = applications.length;

  const appliedCount = applications.filter(
    (a) => a.status === "Applied"
  ).length;

  const shortlistedCount = applications.filter(
    (a) => a.status === "Shortlisted"
  ).length;

  const interviewApplicationCount = applications.filter(
    (a) => a.status === "Interview"
  ).length;

  const offerCount = applications.filter(
    (a) => a.status === "Offer"
  ).length;

  const rejectedCount = applications.filter(
    (a) => a.status === "Rejected"
  ).length;

  const upcomingInterviews = interviews.filter(
    (i) => i.status === "Upcoming"
  );

  const getApplication = (id) => {
    return applications.find((application) => application.id === id);
  };

  const sortedUpcomingInterviews = [...upcomingInterviews].sort(
    (a, b) => {
      return (
        new Date(`${a.date}T${a.time}`) -
        new Date(`${b.date}T${b.time}`)
      );
    }
  );

  const responseRate =
    totalApplications > 0
      ? Math.round(
          ((shortlistedCount +
            interviewApplicationCount +
            offerCount) /
            totalApplications) *
            100
        )
      : 0;

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-main">

        {/* TOP HEADER */}

        <header className="premium-header">

          <div>
            <p className="header-label">
              CAREER OVERVIEW
            </p>

            <h1>
              Welcome back, {firstName}
            </h1>

            <p className="header-description">
              Here's what's happening with your job search.
            </p>
          </div>

          <button
            className="premium-add-button"
            onClick={() => navigate("/applications")}
          >
            <span>+</span>
            Add application
          </button>

        </header>


        {/* SUMMARY */}

        <section className="summary-grid">

          <div className="summary-card main-summary">

            <div className="summary-card-header">
              <span>Applications</span>
              <div className="summary-icon">A</div>
            </div>

            <strong>
              {loading ? "—" : totalApplications}
            </strong>

            <p>
              Total applications tracked
            </p>

          </div>


          <div className="summary-card">

            <div className="summary-card-header">
              <span>Interviews</span>
              <div className="summary-icon">I</div>
            </div>

            <strong>
              {loading ? "—" : interviews.length}
            </strong>

            <p>
              {upcomingInterviews.length} upcoming
            </p>

          </div>


          <div className="summary-card">

            <div className="summary-card-header">
              <span>Offers</span>
              <div className="summary-icon">O</div>
            </div>

            <strong>
              {loading ? "—" : offerCount}
            </strong>

            <p>
              Offers received
            </p>

          </div>


          <div className="summary-card">

            <div className="summary-card-header">
              <span>Response rate</span>
              <div className="summary-icon">%</div>
            </div>

            <strong>
              {loading ? "—" : `${responseRate}%`}
            </strong>

            <p>
              Positive responses
            </p>

          </div>

        </section>


        {/* PIPELINE */}

        <section className="dashboard-block">

          <div className="block-heading">

            <div>
              <h2>Application pipeline</h2>
              <p>
                Track how your applications move forward.
              </p>
            </div>

            <button
              className="text-button"
              onClick={() => navigate("/applications")}
            >
              View applications →
            </button>

          </div>


          <div className="pipeline-card">

            <div className="pipeline-item active">

              <div className="pipeline-number">
                01
              </div>

              <div>
                <h3>Applied</h3>
                <p>{appliedCount} applications</p>
              </div>

            </div>


            <div className="pipeline-connector" />


            <div className="pipeline-item">

              <div className="pipeline-number">
                02
              </div>

              <div>
                <h3>Shortlisted</h3>
                <p>{shortlistedCount} applications</p>
              </div>

            </div>


            <div className="pipeline-connector" />


            <div className="pipeline-item">

              <div className="pipeline-number">
                03
              </div>

              <div>
                <h3>Interview</h3>
                <p>{interviewApplicationCount} applications</p>
              </div>

            </div>


            <div className="pipeline-connector" />


            <div className="pipeline-item">

              <div className="pipeline-number">
                04
              </div>

              <div>
                <h3>Offer</h3>
                <p>{offerCount} applications</p>
              </div>

            </div>

          </div>

        </section>


        {/* TWO COLUMN AREA */}

        <div className="dashboard-two-column">


          {/* UPCOMING INTERVIEWS */}

          <section className="dashboard-block">

            <div className="block-heading">

              <div>
                <h2>Upcoming interviews</h2>
                <p>
                  Your next opportunities.
                </p>
              </div>

              <button
                className="text-button"
                onClick={() => navigate("/interviews")}
              >
                View all →
              </button>

            </div>


            <div className="interview-list">

              {sortedUpcomingInterviews.length === 0 ? (

                <div className="premium-empty">

                  <div className="empty-symbol">
                    —
                  </div>

                  <h3>
                    No upcoming interviews
                  </h3>

                  <p>
                    Scheduled interviews will appear here.
                  </p>

                </div>

              ) : (

                sortedUpcomingInterviews
                  .slice(0, 3)
                  .map((interview) => {

                    const application = getApplication(
                      interview.application
                    );

                    return (
                      <div
                        className="interview-item"
                        key={interview.id}
                      >

                        <div className="company-letter">
                          {application
                            ? application.company
                                .charAt(0)
                                .toUpperCase()
                            : "?"}
                        </div>

                        <div className="interview-main">

                          <h3>
                            {application
                              ? application.job_title
                              : "Unknown Position"}
                          </h3>

                          <p>
                            {application
                              ? application.company
                              : "Unknown Company"}
                          </p>

                        </div>

                        <div className="interview-date">

                          <strong>
                            {interview.date}
                          </strong>

                          <span>
                            {interview.time}
                          </span>

                        </div>

                      </div>
                    );
                  })

              )}

            </div>

          </section>


          {/* SEARCH INSIGHT */}

          <section className="insight-card">

            <p className="insight-label">
              YOUR JOB SEARCH
            </p>

            <h2>
              {totalApplications === 0
                ? "Your journey starts here."
                : "Keep building momentum."}
            </h2>

            <p>
              {totalApplications === 0
                ? "Start adding applications and HireFlow will organize your entire search."
                : `${totalApplications} application${
                    totalApplications !== 1 ? "s" : ""
                  } tracked so far. Every application is another step forward.`}
            </p>

            <div className="insight-stat">

              <div>
                <span>Rejected</span>
                <strong>{rejectedCount}</strong>
              </div>

              <div>
                <span>Interviews</span>
                <strong>{interviews.length}</strong>
              </div>

              <div>
                <span>Offers</span>
                <strong>{offerCount}</strong>
              </div>

            </div>

          </section>

        </div>


        {/* RECENT APPLICATIONS */}

        <section className="dashboard-block recent-block">

          <div className="block-heading">

            <div>
              <h2>Recent applications</h2>
              <p>
                Your latest job applications.
              </p>
            </div>

            <button
              className="text-button"
              onClick={() => navigate("/applications")}
            >
              View all →
            </button>

          </div>


          <div className="applications-table">

            <div className="table-header">

              <span>POSITION</span>
              <span>COMPANY</span>
              <span>DATE</span>
              <span>STATUS</span>

            </div>


            {applications.length === 0 ? (

              <div className="premium-empty">

                <div className="empty-symbol">
                  —
                </div>

                <h3>
                  No applications yet
                </h3>

                <p>
                  Add your first application to start tracking.
                </p>

              </div>

            ) : (

              applications
                .slice(0, 5)
                .map((application) => (

                  <div
                    className="application-table-row"
                    key={application.id}
                  >

                    <div className="position-cell">
                      <strong>
                        {application.job_title}
                      </strong>
                    </div>

                    <span>
                      {application.company}
                    </span>

                    <span className="application-date">
                      {application.date_applied}
                    </span>

                    <span className="status-pill">
                      {application.status}
                    </span>

                  </div>

                ))

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;