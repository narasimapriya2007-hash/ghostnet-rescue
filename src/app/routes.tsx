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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    path: "/login",
    Component: Login,
  },
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
]);
