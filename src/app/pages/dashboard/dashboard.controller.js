class DashboardCtrl {
    constructor(AppConstants, $scope, Project, User, $state, Notification, UsersStore, EventBus) {
        'ngInject';
        this._User = User;
        this._UsersStore = UsersStore;
        this._EventBus = EventBus;
        this.user = User.current;
        this.appName = AppConstants.appName;
        this.editorUrl = AppConstants.EDITOR;
        this.PUBLIC = AppConstants.PUBLIC;
        this.Project = Project;
        this.$state = $state;
        this.Notification = Notification;

        this.projects = [];
        this.showLoader = false;
        this.queryString = '';
        this.timerToSearch = null;

        this.newPassword = {
            password: '',
            confirm: '',
        };

        this.currentModalProject = null;
        this.modals = {
            share: false,
            remove: false,
        };

        this._UsersStore.subscribeAndInit($scope, () => {
            const users = this._UsersStore.getUsers();
            if (!users) return this.getAllUsers();

            this.users = users;
        });
    }

    getAllUsers() {
        this._User.allUsers().then(
            users => {
                this._EventBus.emit(this._EventBus.users.SET, users);
            },

            err => {
                _.each(err, (val, key) => {
                    this.Notification.error(val.fieldName);
                });
            }
        );
    }
}

export default DashboardCtrl;
