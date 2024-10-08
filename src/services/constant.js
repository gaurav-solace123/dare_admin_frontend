const Api = {
    //users
    userLogin:'/auth/login',
    forgotPassword:'/auth/forgot-password',
    resetPassword:'/auth/reset-password',
    generatePassword:'/users/reset-password-user',
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
    reAssignSession:'/users/reassign-session-code',

    //dashBoard
    sessionsActivatedByLevel:'/users/workbook-session-count',
    creditsActivatedByLevel:'/users/credit-consume',
    totalCredit:'/users/dashboard/assigned-available-credit-count',
    officerAffiliation:'/users/instructors-details-excel-report',
    buyerInformation:'/users/instructors-purchase-credit-excel-report',
    sessionSoldByState:'/users/session-sold-by-district-excel-report',
    //instructor credits
    generateInstructorCredits:'/users/generate-creadits-instructor',
    purchaseCreditInstructor:'/users/credits-purchase-details',
    transferCreditInstructor:'/users/credits-transfer-details',
    
    //instructor details
    instructorDetails:'/users/instructor-details',
    //instructor report
    instructorReport:'/users/instructors-credit-transfer-purchase-list',
    instructorReportExport:'/users/instructors-purchase-transfer-credit-excel-report',

    //workbooks
    workbookList:'/users/workbook-list',

    //cms
    updateCMS:'/users/update/cms'



};

export default Api;
