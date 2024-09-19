const Api = {
    //users
    userLogin:'/auth/login',
    forgotPassword:'/auth/forgot-password',
    resetPassword:'/auth/reset-password',
    generatePassword:'/users/reset-password-of-user',
    verifyToken:'/auth/verify-password-token',
    createUser:'/users/create',
    viewUser:'/users/view',
    updateUser:'/users/update',
    listUsers:'/users/list',

    //Bulk Upload
    bulkUplaod:"/upload/bulk-upload-students",
    bulkSampleFile:"/upload/sample-csv",
    // Student Report
    studentReports:'/users/student-report-chart',
    studentExport:'/users/export-student',
    //Students sessions
    studentSessionReassign:'/users/student-session-reasign-list',
    sessionList:'/users/session-list',
    reAssignSession:'/users/update-session-code',

    //dashBoard
    sessionsActivatedByLevel:'/users/workbook-session-count',
    creditsActivatedByLevel:'/users/credit-consume'
};

export default Api;
