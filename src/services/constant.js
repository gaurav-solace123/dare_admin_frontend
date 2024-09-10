const Api = {
    //users
    userLogin:'/auth/login',
    forgotPassword:'/auth/forgot-password',
    resetPassword:'/auth/reset-password',
    verifyToken:'/auth/verify-password-token',
    createUser:'/users/create',
    viewUser:'/users/view',
    updateUser:'/users/update',
    listUsers:'/users/list',

    //Bulk Upload
    bulkUplaod:"/upload/bulk-upload-students",
    bulkSampleFile:"/upload/sample-csv",
    // Student Report
    studentReports:'/users/student-report-chart'


};

export default Api;
