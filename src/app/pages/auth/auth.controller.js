class AuthCtrl {
    constructor(User, $state, AppConstants, $window, Notification) {
        'ngInject';
        this._Constants = AppConstants;
        this._User = User;
        this._$state = $state;
        this._$window = $window;
        this.Notification = Notification;
        this.title = $state.current.title;
        this.authType = $state.current.name.replace('landing.', '');

        this.patterns = {
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        };

    }

    submitForm() {
        this.isSubmitting = true;

        if (this.authType === 'login') {
            this._User.login(this.formData).then(
                (res) => {
                    console.log(res);
                    //this._$state.go('app.dashboard');
                },

                (err) => {
                    this.isSubmitting = false;
                    this.errors = err;
                });
        }
    }
}

export default AuthCtrl;
