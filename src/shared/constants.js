export const ENV = {
	SERVER: 'http://127.0.0.1:8000/api/',
    API: 'http://127.0.0.1:8000/api/',
    AUTH: 'auth/login',
    REQUEST_TOKEN: 'request_token',
}

export const STATUS = {
    ENABLED : 1,
    DISABLED : 0,
}

export const TEST_SAMPLE_SESSION_ID = 'hkjijasd123iasdh09s';

export const ASSIGNED_STATUS = 2;
export const FOR_EXECUTION_STATUS = 3;
export const IN_PROGRESS_STATUS = 4;
export const COMPLETED_STATUS = 5;
export const FAILED_STATUS = 7;
export const FOR_REJECTION_STATUS = 6;
export const BLOCKED_STATUS = 8;
export const DEFECT_STATUS = 9;
export const PASSED_STATUS = 10;
export const REVIEW_STATUS = 11;
export const FAILED_TO_REVIEW_STATUS = 12;
export const ABANDON_STATUS=13;
export const REJECTED_STATUS=14;

export const TS_STATUS_FAILED = 2;
export const TS_STATUS_PASSED = 1;
export const TS_STATUS_UNKNOWN = 0;
export const TS_STATUS_NOT_APPLICABLE = 3;
export const TS_STATUS_BLOCKED = 4;

export const DynamicDataOptions = [
    {
        'key'   : 1,
        'value' : 'Subscriber Account'
    },
    {
        'key'   : 2,
        'value' : 'Subscriber IP address'
    },
    {
        'key'   : 3,
        'value' : 'Change Request'
    }
];
export const DynamicMenu = 
    {
        'users': 'Users',
        'roles': 'Access Roles',
        'user-groups' : 'User Groups',
        '' : 'Test Case Tracker',
        'test-case-tracker': 'Test Case Tracker',
        'test-objectives':'Test Objectives', 
        'admin-test-case-tracker': 'Admin Test Tracker',
        'scenario-cloning': 'Dynamic Test Data',
        'sc-blocked-monitoring': 'Blocked Test Case',
        'sc-reject-monitoring': 'Rejected Test Case',
        'sc-failed-monitoring': 'Failed Test Case',
        'files' : 'Upload File',
        'file-report' : 'File Reports',
        'objective-tracker' : 'Objective Tracker',
        'objective-view' : 'Objectives View',
        'scenario-management' : 'Scenario Management',
        'dashboard' : 'Dashboard',
        'execution-plan':'Execution Plan',
        'tc-per-tester-report':'TC per Tester Report ',
        'execution-mode-report': 'Execution Mode Report',
        'scenario-status-breakdown': 'Scenario Breakdown',
        "chaser-report" : "Chaser Report",
        "daily-ops" : "Daily Operations Tracker",
        "test-data-monitoring" : "Test Data Monitoring",
        "sc-replication" : "Scenario Replication",
        "execution-log-view": "Execution Log View",
        "objectives-percentage-report": "Objectives Percentage Report",
        "scenario-reexecution": "Scenario Re-Execution",
        "scenario-reassigned": "TC Execution Update"
    };

export const DYNAMIC_DATA_COLS = {
    'attr' : '',
    'value' : '',
    'remarks' : '',
    'isOldRecord' : false,
    'id': ''
};
export const CHART_COLOR=[null,
    "rgb(255, 159, 64)",
    "rgb(93, 64, 203)",
    "rgb(181,52,234)",
    "rgb(219, 255, 95)",
    "rgb(26, 137, 31)",
    "rgb(255,56,56)",
    "rgb(255, 51, 54)",
    "rgb(103, 2, 41)",
    "rgb(199, 0, 57)",
        "rgb( 17, 42,101)",
    "rgb(226,215,56)",

    "rgb(205,107,35)",
     "rgb(205,107,35)"
];


 
export const OBJECTIVE_COLS = {
    'area' : '',
    'objectives' : '',
    'description' : '',
    'remarks': '',
    'to_id':'',
 
};