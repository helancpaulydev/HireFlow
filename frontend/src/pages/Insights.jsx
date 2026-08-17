import { useEffect, useState } from "react";
import "../App.css";

function Insights() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        console.error("Insights error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const totalApplications = applications.length;

  const appliedCount = applications.filter(
    (application) => application.status === "Applied"
  ).length;

  const shortlistedCount = applications.filter(
    (application) => application.status === "Shortlisted"
  ).length;

  const interviewCount = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const offerCount = applications.filter(
    (application) => application.status === "Offer"
  ).length;

  const rejectedCount = applications.filter(
    (application) => application.status === "Rejected"
  ).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#101311",
        color: "#f4f6f4",
        padding: "40px",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 35px",
        }}
      >
        <p
          style={{
            color: "#a9c6af",
            letterSpacing: "2px",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          YOUR JOB SEARCH
        </p>

        <h1
          style={{
            fontSize: "38px",
            margin: "5px 0",
          }}
        >
          Insights
        </h1>

        <p
          style={{
            color: "#a9c6af",
            fontSize: "16px",
          }}
        >
          Understand your progress and see how
          your applications are moving forward.
        </p>
      </div>

      {/* STAT CARDS */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: "18px",
        }}
      >
        {/* APPLICATIONS */}

        <div style={statCardStyle}>
          <span style={statLabelStyle}>
            Applications
          </span>

          <h2 style={statNumberStyle}>
            {loading ? "..." : totalApplications}
          </h2>

          <p style={statDescriptionStyle}>
            Total tracked
          </p>
        </div>

        {/* SHORTLISTED */}

        <div style={statCardStyle}>
          <span style={statLabelStyle}>
            Shortlisted
          </span>

          <h2 style={statNumberStyle}>
            {loading ? "..." : shortlistedCount}
          </h2>

          <p style={statDescriptionStyle}>
            Moving forward
          </p>
        </div>

        {/* INTERVIEWS */}

        <div style={statCardStyle}>
          <span style={statLabelStyle}>
            Interviews
          </span>

          <h2 style={statNumberStyle}>
            {loading ? "..." : interviewCount}
          </h2>

          <p style={statDescriptionStyle}>
            Interview stage
          </p>
        </div>

        {/* OFFERS */}

        <div style={statCardStyle}>
          <span style={statLabelStyle}>
            Offers
          </span>

          <h2 style={statNumberStyle}>
            {loading ? "..." : offerCount}
          </h2>

          <p style={statDescriptionStyle}>
            Offers received
          </p>
        </div>
      </div>

      {/* APPLICATION STATUS */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "30px auto 0",
          background: "#181c19",
          padding: "30px",
          borderRadius: "16px",
          border: "1px solid #303630",
        }}
      >
        <h2 style={{ marginTop: 0 }}>
          Application status
        </h2>

        <p
          style={{
            color: "#a9c6af",
            marginBottom: "30px",
          }}
        >
          See where your applications currently
          stand.
        </p>

        {/* APPLIED */}

        <StatusRow
          label="Applied"
          count={appliedCount}
          total={totalApplications}
        />

        {/* SHORTLISTED */}

        <StatusRow
          label="Shortlisted"
          count={shortlistedCount}
          total={totalApplications}
        />

        {/* INTERVIEW */}

        <StatusRow
          label="Interview"
          count={interviewCount}
          total={totalApplications}
        />

        {/* OFFER */}

        <StatusRow
          label="Offer"
          count={offerCount}
          total={totalApplications}
        />

        {/* REJECTED */}

        <StatusRow
          label="Rejected"
          count={rejectedCount}
          total={totalApplications}
        />
      </div>
      {/* ==========================================================
    CONVERSION RATES
========================================================== */}

<div
  style={{
    maxWidth: "1100px",
    margin: "30px auto 0",
    background: "#181c19",
    padding: "30px",
    borderRadius: "16px",
    border: "1px solid #303630",
  }}
>
  <h2 style={{ marginTop: 0 }}>
    Conversion rates
  </h2>

  <p
    style={{
      color: "#a9c6af",
      marginBottom: "30px",
    }}
  >
    See how your applications move through
    the hiring process.
  </p>


  {/* SHORTLIST RATE */}

  <ConversionRow
    label="Shortlist rate"
    count={shortlistedCount}
    total={totalApplications}
  />


  {/* INTERVIEW RATE */}

  <ConversionRow
    label="Interview rate"
    count={interviewCount}
    total={totalApplications}
  />


  {/* OFFER RATE */}

  <ConversionRow
    label="Offer rate"
    count={offerCount}
    total={totalApplications}
  />


  {/* REJECTION RATE */}

  <ConversionRow
    label="Rejection rate"
    count={rejectedCount}
    total={totalApplications}
  />

</div>
{/* ==========================================================
    APPLICATION ACTIVITY
========================================================== */}

<div
  style={{
    maxWidth: "1100px",
    margin: "30px auto 0",
    background: "#181c19",
    padding: "30px",
    borderRadius: "16px",
    border: "1px solid #303630",
  }}
>
  <h2 style={{ marginTop: 0 }}>
    Application activity
  </h2>

  <p
    style={{
      color: "#a9c6af",
      marginBottom: "30px",
    }}
  >
    Your applications by date.
  </p>

  {applications.length === 0 ? (
    <p
      style={{
        color: "#7f8a81",
      }}
    >
      Add applications to start seeing your
      activity here.
    </p>
  ) : (
    <ApplicationActivity
      applications={applications}
    />
  )}
</div>
{/* ==========================================================
    COMPANY INSIGHTS
========================================================== */}

<div
  style={{
    maxWidth: "1100px",
    margin: "30px auto 0",
    background: "#181c19",
    padding: "30px",
    borderRadius: "16px",
    border: "1px solid #303630",
  }}
>
  <h2 style={{ marginTop: 0 }}>
    Company insights
  </h2>

  <p
    style={{
      color: "#a9c6af",
      marginBottom: "30px",
    }}
  >
    See where you're applying the most.
  </p>

  {applications.length === 0 ? (
    <p
      style={{
        color: "#7f8a81",
      }}
    >
      Add applications to see company insights.
    </p>
  ) : (
    <CompanyInsights
      applications={applications}
    />
  )}
</div>
{/* ==========================================================
    SMART JOB SEARCH INSIGHTS
========================================================== */}

<div
  style={{
    maxWidth: "1100px",
    margin: "30px auto 0",
    background: "#181c19",
    padding: "30px",
    borderRadius: "16px",
    border: "1px solid #303630",
  }}
>
  <h2 style={{ marginTop: 0 }}>
    💡 Smart insights
  </h2>

  <p
    style={{
      color: "#a9c6af",
      marginBottom: "25px",
    }}
  >
    A quick look at what your application
    activity tells you.
  </p>

  <SmartInsights
    applications={applications}
  />
</div>

      {/* QUICK SUMMARY */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "30px auto 0",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <div style={panelStyle}>
          <h2>
            📊 Your progress
          </h2>

          <p style={descriptionStyle}>
            You are currently tracking{" "}
            <strong>
              {totalApplications}
            </strong>{" "}
            application
            {totalApplications !== 1
              ? "s"
              : ""}.
          </p>

          <p style={descriptionStyle}>
            {shortlistedCount} shortlisted ·{" "}
            {interviewCount} interviews ·{" "}
            {offerCount} offers
          </p>
        </div>

        <div style={panelStyle}>
          <h2>
            🌱 Keep going
          </h2>

          <p style={descriptionStyle}>
            Every application is another
            opportunity to move forward.
          </p>

          <p style={descriptionStyle}>
            Keep applying, learning and improving.
          </p>
        </div>
      </div>
    </div>
  );
}


/* ==========================================================
   STATUS ROW
========================================================== */

function StatusRow({
  label,
  count,
  total,
}) {
  const percentage =
    total > 0
      ? (count / total) * 100
      : 0;

  return (
    <div
      style={{
        marginBottom: "22px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <span>
          {label}
        </span>

        <strong>
          {count}
        </strong>
      </div>

      <div
        style={{
          height: "8px",
          background: "#303630",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            background: "#a9c6af",
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  );
}


/* ==========================================================
   STYLES
========================================================== */

const statCardStyle = {
  background: "#181c19",
  padding: "24px",
  borderRadius: "14px",
  border: "1px solid #303630",
};

const statLabelStyle = {
  color: "#a9c6af",
  fontSize: "14px",
};

const statNumberStyle = {
  fontSize: "34px",
  margin: "12px 0 5px",
};

const statDescriptionStyle = {
  color: "#7f8a81",
  margin: 0,
};

const panelStyle = {
  background: "#181c19",
  padding: "28px",
  borderRadius: "16px",
  border: "1px solid #303630",
};

const descriptionStyle = {
  color: "#a9c6af",
  lineHeight: "1.7",
};
function ConversionRow({
  label,
  count,
  total,
}) {
  const percentage =
    total > 0
      ? ((count / total) * 100).toFixed(1)
      : 0;

  return (
    <div
      style={{
        marginBottom: "25px",
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >

        <span>
          {label}
        </span>

        <strong>
          {percentage}%
        </strong>

      </div>


      <div
        style={{
          height: "8px",
          background: "#303630",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >

        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            background: "#a9c6af",
            borderRadius: "10px",
            transition: "width 0.5s ease",
          }}
        />

      </div>

    </div>
  );
}
function ApplicationActivity({
  applications,
}) {
  const dateCounts = {};

  applications.forEach((application) => {
    const date = application.date_applied;

    if (date) {
      dateCounts[date] =
        (dateCounts[date] || 0) + 1;
    }
  });

  const sortedDates =
    Object.keys(dateCounts).sort();

  const maximum =
    Math.max(
      ...Object.values(dateCounts),
      1
    );

  return (
    <div>
      {sortedDates.map((date) => {
        const count = dateCounts[date];

        const width =
          (count / maximum) * 100;

        return (
          <div
            key={date}
            style={{
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "7px",
              }}
            >
              <span>
                {date}
              </span>

              <strong>
                {count}{" "}
                {count === 1
                  ? "application"
                  : "applications"}
              </strong>
            </div>

            <div
              style={{
                height: "9px",
                background: "#303630",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${width}%`,
                  height: "100%",
                  background: "#a9c6af",
                  borderRadius: "10px",
                  transition:
                    "width 0.5s ease",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
function CompanyInsights({
  applications,
}) {
  const companyCounts = {};

  applications.forEach((application) => {
    const company =
      application.company?.trim();

    if (!company) {
      return;
    }

    companyCounts[company] =
      (companyCounts[company] || 0) + 1;
  });

  const companies =
    Object.entries(companyCounts)
      .sort((a, b) => b[1] - a[1]);

  const maximum =
    Math.max(
      ...companies.map(
        ([, count]) => count
      ),
      1
    );

  return (
    <div>
      {companies.map(
        ([company, count]) => {

          const width =
            (count / maximum) * 100;

          return (
            <div
              key={company}
              style={{
                marginBottom: "22px",
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >

                <span
                  style={{
                    fontWeight: "500",
                  }}
                >
                  {company}
                </span>

                <strong
                  style={{
                    color: "#c9dfce",
                  }}
                >
                  {count}{" "}
                  {count === 1
                    ? "application"
                    : "applications"}
                </strong>

              </div>


              <div
                style={{
                  height: "9px",
                  background: "#303630",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >

                <div
                  style={{
                    width: `${width}%`,
                    height: "100%",
                    background: "#a9c6af",
                    borderRadius: "10px",
                    transition:
                      "width 0.5s ease",
                  }}
                />

              </div>

            </div>
          );
        }
      )}
    </div>
  );
}
function SmartInsights({
  applications,
}) {
  const total = applications.length;

  const shortlisted = applications.filter(
    (application) =>
      application.status === "Shortlisted"
  ).length;

  const interviews = applications.filter(
    (application) =>
      application.status === "Interview"
  ).length;

  const offers = applications.filter(
    (application) =>
      application.status === "Offer"
  ).length;

  if (total === 0) {
    return (
      <div
        style={{
          background: "#202620",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h3 style={{ marginTop: 0 }}>
          🌱 Start your journey
        </h3>

        <p
          style={{
            color: "#a9c6af",
            marginBottom: 0,
          }}
        >
          Add your first application to start
          receiving personalized insights.
        </p>
      </div>
    );
  }

  const shortlistRate =
    (shortlisted / total) * 100;

  const interviewRate =
    (interviews / total) * 100;

  const offerRate =
    (offers / total) * 100;

  return (
    <div
      style={{
        display: "grid",
        gap: "14px",
      }}
    >

      {/* APPLICATION ACTIVITY */}

      <InsightMessage
        icon="📊"
        title="Application activity"
        message={`You're currently tracking ${total} application${
          total === 1 ? "" : "s"
        }.`}
      />


      {/* SHORTLIST */}

      <InsightMessage
        icon="🎯"
        title="Shortlist performance"
        message={
          shortlisted === 0
            ? "You haven't been shortlisted yet. Keep applying and use each application as a learning opportunity."
            : `You've been shortlisted ${shortlisted} time${
                shortlisted === 1 ? "" : "s"
              }, giving you a ${shortlistRate.toFixed(
                1
              )}% shortlist rate.`
        }
      />


      {/* INTERVIEW */}

      <InsightMessage
        icon="🎤"
        title="Interview-stage progress"
        message={
          interviews === 0
            ? "No interviews yet. Keep building your application pipeline."
            : `You've reached the interview stage ${interviews} time${
                interviews === 1 ? "" : "s"
              }. Your interview-stage rate is ${interviewRate.toFixed(
                1
              )}%.`
        }
      />


      {/* OFFER */}

      <InsightMessage
        icon="🏆"
        title="Offer progress"
        message={
          offers === 0
            ? "No offers yet — keep going. Every application moves you closer."
            : `You've received ${offers} offer${
                offers === 1 ? "" : "s"
              }. Your current offer rate is ${offerRate.toFixed(
                1
              )}%.`
        }
      />

    </div>
  );
}
function InsightMessage({
  icon,
  title,
  message,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        alignItems: "flex-start",
        background: "#202620",
        padding: "18px",
        borderRadius: "12px",
      }}
    >

      <div
        style={{
          fontSize: "22px",
        }}
      >
        {icon}
      </div>

      <div>

        <h3
          style={{
            margin: "0 0 6px",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            margin: 0,
            color: "#a9c6af",
            lineHeight: "1.6",
          }}
        >
          {message}
        </p>

      </div>

    </div>
  );
}
export default Insights;