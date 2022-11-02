import MainPage from '../components/Pages/Main';
import SettingsUserPage from '../components/Pages/Settings/Users';
import SettingsUserGroupPage from '../components/Pages/Settings/UserGroups';
import SettingsRolesPage from '../components/Pages/Settings/Roles';
import SettingsFilePage from '../components/Pages/Settings/Files';
import SettingsFileReportPage from '../components/Pages/Settings/FilesReports';
import TestCaseTracker from '../components/Pages/TestCaseTracker';
import AdminTestCaseTracker from '../components/Pages/AdminTestCaseTracker';
import Dashboard from '../components/Pages/Dashboard';
import ExecutionPlan from '../components/Pages/ExecutionPlan';
import TesterPlanReport from '../components/Pages/TesterPlanReport';
import TestDataMonitoring from '../components/Pages/TestDataMonitoring';
import ScenarioBreakdown from '../components/Pages/ScenarioBreakdown';
import ObjectiveTracker from '../components/Pages/ObjectiveTracker';
import ObjectiveView from "../components/Pages/ObjectiveView";
import LoginPage from '../components/Pages/Login';
import SCTestData from '../components/Pages/SCTestData';
import TestDataReport from "../components/Pages/TestDataReport";
import ForgotPassword from '../components/Pages/ForgotPassword';
import ChangePassword from '../components/Pages/ChangePassword';
import TestCaseReviewMonitoring from '../components/Pages/TestCaseReviewMonitoring';
import TestCaseRejectedMonitoring from '../components/Pages/TestCaseRejectedMonitoring';
import TestCaseBlockedMonitoring from '../components/Pages/TestCaseBlockedMonitoring';
import ScenarioCloning from '../components/Pages/ScenarioCloning';
import TestObjectives from '../components/Pages/TestObjectives';
import ExecutionLogView from "../components/Pages/ExecutionLogView";
import ScenarioManagement from '../components/Pages/ScenarioManagement';
import ExecutionModeReport from '../components/Pages/ExecutionModeReport';
import ChaserReport from '../components/Pages/ChaserReport';
import DailyOpsTracker from '../components/Pages/DailyOpsTracker';
import ScenarioReplication from '../components/Pages/ScenarioReplication';
import ObjectivesPercentageReport from '../components/Pages/ObjectivesPercentageReport';
import ScenarioReExecution from '../components/Pages/ScenarioReExecution';
import ScenarioReAssgined from '../components/Pages/ScenarioReAssgined';

export default [
  {
    path: "/",
    component: TestCaseTracker,
  },
  {
    path: "/users",
    component: SettingsUserPage,
  },
  {
    path: "/user-groups",
    component: SettingsUserGroupPage,
  },
  {
    path: "/roles",
    component: SettingsRolesPage,
  },
  {
    path: "/files",
    component: SettingsFilePage,
  },
  {
    path: "/file-report",
    component: SettingsFileReportPage,
  },
  {
    path: "/test-case-tracker",
    component: TestCaseTracker,
  },
  {
    path: "/admin-test-case-tracker",
    component: AdminTestCaseTracker,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/sc-test-data/:code",
    component: SCTestData,
  },
  {
    path: "/test-data-report/:code",
    component: TestDataReport,
  },
  {
    path: "forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/change-password/:sessionId",
    component: ChangePassword,
  },
  {
    path: "/sc-failed-monitoring",
    component: TestCaseReviewMonitoring,
  },
  {
    path: "/sc-reject-monitoring",
    component: TestCaseRejectedMonitoring,
  },
  {
    path: "/sc-blocked-monitoring",
    component: TestCaseBlockedMonitoring,
  },
  {
    path: "/scenario-cloning",
    component: ScenarioCloning,
  },
  {
    path: "/test-objectives",
    component: TestObjectives,
  },
  {
   path: "/objective-view",
    component: ObjectiveView
  },
  {
    path: "/objective-tracker",
    component: ObjectiveTracker,
  },
  {
    path: "/scenario-management",
    component: ScenarioManagement,
  },
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/execution-plan",
    component: ExecutionPlan,
  },
  {
    path: "/tc-per-tester-report",
    component: TesterPlanReport,
  },
  {
    path: "/execution-mode-report",
    component: ExecutionModeReport,
  },
  {
    path: "/scenario-status-breakdown",
    component: ScenarioBreakdown,
  },
  {
    path: "/chaser-report",
    component: ChaserReport,
  },
  {
    path: "/daily-ops",
    component: DailyOpsTracker,
  },
  {
    path: "/test-data-monitoring",
    component: TestDataMonitoring,
  },
  {
    path: "/sc-replication",
    component: ScenarioReplication,
  },
  {
    path: "/execution-log-view",
    component: ExecutionLogView,
  },
  {
    path: "/objectives-percentage-report",
    component: ObjectivesPercentageReport,
  },
  {
    path: "/scenario-reexecution",
    component: ScenarioReExecution,
  },
  {
    path: "/scenario-reassigned",
    component: ScenarioReAssgined,
  },
];
