import { useEffect, useState } from "react";

function Progress() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token =
          localStorage.getItem("hireflow_access");

        const response = await fetch(
          "http://127.0.0.1:8000/api/applications/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load applications"
          );
        }

        const data = await response.json();

        setApplications(data);
      } catch (error) {
        console.error(
          "Progress error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const total = applications.length;

  const applied = applications.filter(
    (app) => app.status === "Applied"
  ).length;

  const shortlisted = applications.filter(
    (app) => app.status === "Shortlisted"
  ).length;

  const interviews = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const offers = applications.filter(
    (app) => app.status === "Offer"
  ).length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  const shortlistedRate =
    total > 0
      ? Math.round(
          (shortlisted / total) * 100
        )
      : 0;

  const interviewRate =
    total > 0
      ? Math.round(
          (interviews / total) * 100
        )
      : 0;

  const offerRate =
    total > 0
      ? Math.round(
          (offers / total) * 100
        )
      : 0;

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>

        {/* HEADER */}

        <p style={eyebrowStyle}>
          YOUR JOB SEARCH
        </p>

        <h1 style={titleStyle}>
          Your Progress 📈
        </h1>

        <p style={subtitleStyle}>
          See how your applications are moving
          through your job-search journey.
        </p>

        {/* MAIN STATS */}

        <div style={statsGrid}>

          <StatCard
            icon="📨"
            title="Applications"
            value={
              loading ? "..." : total
            }
            description="Total applications"
          />

          <StatCard
            icon="⭐"
            title="Shortlisted"
            value={
              loading
                ? "..."
                : shortlisted
            }
            description="Companies interested"
          />

          <StatCard
            icon="🎤"
            title="Interviews"
            value={
              loading
                ? "..."
                : interviews
            }
            description="Interview opportunities"
          />

          <StatCard
            icon="🏆"
            title="Offers"
            value={
              loading ? "..." : offers
            }
            description="Offers received"
          />

        </div>

        {/* APPLICATION JOURNEY */}

        <div style={cardStyle}>

          <h2>
            Application journey
          </h2>

          <p style={descriptionStyle}>
            See how your applications move
            through each stage.
          </p>

          <ProgressRow
            label="Applied"
            count={applied}
            total={total}
          />

          <ProgressRow
            label="Shortlisted"
            count={shortlisted}
            total={total}
          />

          <ProgressRow
            label="Interview"
            count={interviews}
            total={total}
          />

          <ProgressRow
            label="Offer"
            count={offers}
            total={total}
          />

          <ProgressRow
            label="Rejected"
            count={rejected}
            total={total}
          />

        </div>

        {/* CONVERSION */}

        <div style={cardStyle}>

          <h2>
            Conversion rates
          </h2>

          <p style={descriptionStyle}>
            Understand how your applications
            are progressing.
          </p>

          <div style={conversionGrid}>

            <ConversionCard
              title="Shortlisted"
              value={`${shortlistedRate}%`}
              description="of applications"
            />

            <ConversionCard
              title="Interview"
              value={`${interviewRate}%`}
              description="of applications"
            />

            <ConversionCard
              title="Offer"
              value={`${offerRate}%`}
              description="of applications"
            />

          </div>

        </div>

        {/* EMPTY STATE */}

        {!loading && total === 0 && (
          <div style={emptyCardStyle}>

            <div style={emptyIconStyle}>
              🌱
            </div>

            <h2>
              Your progress starts here
            </h2>

            <p>
              Add your first application to
              start seeing your job-search
              statistics.
            </p>

          </div>
        )}

        {/* MOTIVATION */}

        <div style={motivationStyle}>

          <div style={motivationIcon}>
            🚀
          </div>

          <div>
            <p style={motivationLabel}>
              KEEP GOING
            </p>

            <h2>
              Every application is progress.
            </h2>

            <p>
              Don't focus only on the result.
              You're building experience with
              every application and interview.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}


/* ==========================================================
   STAT CARD
========================================================== */

function StatCard({
  icon,
  title,
  value,
  description,
}) {
  return (
    <div style={statCardStyle}>

      <div style={statTopStyle}>

        <span>
          {title}
        </span>

        <span style={statIconStyle}>
          {icon}
        </span>

      </div>

      <h2 style={statValueStyle}>
        {value}
      </h2>

      <p style={statDescriptionStyle}>
        {description}
      </p>

    </div>
  );
}


/* ==========================================================
   PROGRESS ROW
========================================================== */

function ProgressRow({
  label,
  count,
  total,
}) {
  const percentage =
    total > 0
      ? Math.round(
          (count / total) * 100
        )
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
          justifyContent:
            "space-between",
          marginBottom: "8px",
        }}
      >

        <span>
          {label}
        </span>

        <span
          style={{
            color: "#a9c6af",
          }}
        >
          {count} · {percentage}%
        </span>

      </div>

      <div style={progressBackground}>

        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            background: "#a9c6af",
            borderRadius: "20px",
            transition:
              "width 0.4s ease",
          }}
        />

      </div>

    </div>
  );
}


/* ==========================================================
   CONVERSION CARD
========================================================== */

function ConversionCard({
  title,
  value,
  description,
}) {
  return (
    <div style={conversionCardStyle}>

      <span
        style={{
          color: "#a9c6af",
          fontSize: "14px",
        }}
      >
        {title}
      </span>

      <h2
        style={{
          fontSize: "32px",
          margin: "10px 0 5px",
        }}
      >
        {value}
      </h2>

      <p
        style={{
          color: "#7f8a81",
          margin: 0,
        }}
      >
        {description}
      </p>

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
  marginBottom: "30px",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(4, 1fr)",
  gap: "18px",
  marginBottom: "25px",
};

const statCardStyle = {
  background: "#181c19",
  padding: "22px",
  borderRadius: "14px",
  border: "1px solid #303630",
};

const statTopStyle = {
  display: "flex",
  justifyContent:
    "space-between",
  color: "#a9c6af",
};

const statIconStyle = {
  fontSize: "20px",
};

const statValueStyle = {
  fontSize: "34px",
  margin: "15px 0 5px",
};

const statDescriptionStyle = {
  color: "#7f8a81",
  margin: 0,
  fontSize: "13px",
};

const cardStyle = {
  background: "#181c19",
  padding: "30px",
  borderRadius: "16px",
  border: "1px solid #303630",
  marginBottom: "22px",
};

const descriptionStyle = {
  color: "#7f8a81",
  marginBottom: "28px",
};

const progressBackground = {
  width: "100%",
  height: "9px",
  background: "#303630",
  borderRadius: "20px",
  overflow: "hidden",
};

const conversionGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(3, 1fr)",
  gap: "15px",
};

const conversionCardStyle = {
  background: "#101311",
  padding: "22px",
  borderRadius: "12px",
  border: "1px solid #303630",
};

const emptyCardStyle = {
  background: "#181c19",
  padding: "50px",
  borderRadius: "16px",
  border: "1px solid #303630",
  textAlign: "center",
  marginBottom: "22px",
};

const emptyIconStyle = {
  fontSize: "40px",
};

const motivationStyle = {
  display: "flex",
  gap: "20px",
  alignItems: "center",
  background: "#181c19",
  padding: "28px",
  borderRadius: "16px",
  border: "1px solid #303630",
  marginBottom: "40px",
};

const motivationIcon = {
  fontSize: "40px",
};

const motivationLabel = {
  color: "#a9c6af",
  letterSpacing: "2px",
  fontSize: "11px",
  fontWeight: "600",
  margin: 0,
};

export default Progress;