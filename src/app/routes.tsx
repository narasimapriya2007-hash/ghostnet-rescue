import { createBrowserRouter } from "react-router";
import { Splash } from "./screens/Splash";
import { Login } from "./screens/Login";
import { Dashboard } from "./screens/Dashboard";
import { SOSActivation } from "./screens/SOSActivation";
import { VolunteerSupport } from "./screens/VolunteerSupport";
import { DisasterMap } from "./screens/DisasterMap";
import { SafeRoute } from "./screens/SafeRoute";
import { MedicalEmergency } from "./screens/MedicalEmergency";
import { FamilySafety } from "./screens/FamilySafety";
import { IncidentReport } from "./screens/IncidentReport";
import { ResourceSupport } from "./screens/ResourceSupport";
import { Accessibility } from "./screens/Accessibility";
import { RescueTeamDashboard } from "./screens/RescueTeamDashboard";
import { GovernmentAlerts } from "./screens/GovernmentAlerts";
import { MissionHistory } from "./screens/MissionHistory";
import { RouteDetails } from "./screens/RouteDetails";
import { DetailScreen } from "./screens/DetailScreen";
import { AmbulanceTracking } from "./screens/AmbulanceTracking";
import { HospitalMap } from "./screens/HospitalMap";
import { AlertCircle, Home } from "lucide-react";
import { useNavigate, useRouteError } from "react-router";

function ErrorPage() {
  const error: any = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center px-6 text-foreground text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(79,70,229,0.05),_transparent_70%)]"></div>
      <div className="relative mb-10 floating">
        <div className="absolute inset-0 bg-destructive/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="relative glass p-12 rounded-[3.5rem] border border-destructive/20 shadow-xl bg-white/40">
          <AlertCircle className="w-24 h-24 text-destructive" strokeWidth={2.5} />
        </div>
      </div>
      <h1 className="text-6xl font-black italic tracking-tighter uppercase mb-4">Something <span className="text-destructive">Went Wrong</span></h1>
      <p className="text-foreground/40 font-mono text-[11px] tracking-[0.4em] uppercase mb-16 max-w-sm font-bold">
        Error Details: {error.statusText || error.message || "Page Not Found"}
      </p>
      <button
        onClick={() => navigate('/dashboard')}
        className="glass border-primary/20 text-primary p-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-2xl active:scale-95 transition-all flex items-center gap-5 bg-white/60 border-t border-white/20"
      >
        <Home className="w-6 h-6" strokeWidth={2.5} />
        Go to Dashboard
      </button>
    </div>
  );
}

import { Layout } from "./Layout";
import { ProtectedRoute } from "./context/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/sos",
        Component: SOSActivation,
      },
      {
        path: "/volunteers",
        Component: VolunteerSupport,
      },
      {
        path: "/disaster-map",
        Component: DisasterMap,
      },
      {
        path: "/safe-route",
        Component: SafeRoute,
      },
      {
        path: "/route-details",
        Component: RouteDetails,
      },
      {
        path: "/medical",
        Component: MedicalEmergency,
      },
      {
        path: "/family",
        Component: FamilySafety,
      },
      {
        path: "/report",
        Component: IncidentReport,
      },
      {
        path: "/resources",
        Component: ResourceSupport,
      },
      {
        path: "/accessibility",
        Component: Accessibility,
      },
      {
        path: "/rescue-team",
        Component: RescueTeamDashboard,
      },
      {
        path: "/government",
        Component: GovernmentAlerts,
      },
      {
        path: "/relief-details",
        Component: DetailScreen,
      },
      {
        path: "/donation-success",
        Component: DetailScreen,
      },
      {
        path: "/supply-confirmation",
        Component: DetailScreen,
      },
      {
        path: "/team-details",
        Component: DetailScreen,
      },
      {
        path: "/analytics-details",
        Component: DetailScreen,
      },
      {
        path: "/volunteer-registration",
        Component: DetailScreen,
      },
      {
        path: "/volunteer-request-success",
        Component: DetailScreen,
      },
      {
        path: "/volunteer-details",
        Component: DetailScreen,
      },
      {
        path: "/ambulance-tracking",
        Component: DetailScreen,
      },
      {
        path: "/first-aid-assistant",
        Component: DetailScreen,
      },
      {
        path: "/hospital-map",
        Component: DetailScreen,
      },
      {
        path: "/shelter-details",
        Component: DetailScreen,
      },
      {
        path: "/report-success",
        Component: DetailScreen,
      },
      {
        path: "/family-member-details",
        Component: DetailScreen,
      },
      {
        path: "/missing-person-form",
        Component: DetailScreen,
      },
      {
        path: "/sos-tracking",
        Component: DetailScreen,
      },
      {
        path: "/mission-history",
        Component: MissionHistory,
      },
      {
        path: "/ambulance-tracking",
        Component: AmbulanceTracking,
      },
      {
        path: "/hospital-map",
        Component: HospitalMap,
      },
    ]
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
