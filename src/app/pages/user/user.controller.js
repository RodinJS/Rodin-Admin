class UserCtrl {
    constructor(AppConstants, $scope, User, $stateParams, $state, UsersStore, EventBus) {
        'ngInject';
        this._User = User;
        this._UsersStore = UsersStore;
        this._EventBus = EventBus;
        this._$stateParams = $stateParams;
        this.user = User.current;

        if (!this._$stateParams.username) return $state.go('app.dashboard');

        this.getUser(this._$stateParams.username);

        /* this._UsersStore.subscribeAndInit($scope, () => {
             const users = this._UsersStore.getUsers();
             if (!users) return this.getAllUsers();

             this.users = users;
         });*/
    }

    getUser(username) {
        this._User.getSingle(username).then(
            user => {
                console.log(user);
            },

            err => {
                _.each(err, (val, key) => {
                    this.Notification.error(val.fieldName);
                });
            }
        );
    }
}

export default UserCtrl;
