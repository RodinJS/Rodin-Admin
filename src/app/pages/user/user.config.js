function DashboardConfig($stateProvider) {
    'ngInject';

    $stateProvider
     .state('app.user', {
        url: '/user/:username',
        controller: 'UserCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'pages/user/user.html',
        title: 'User',
        resolve: {
            auth: function (User) {
                return User.ensureAuthIs(true);
            },
        },
    });

}

export default DashboardConfig;
