/**
 * Created by xgharibyan on 11/1/16.
 */

function UsersStore(EventBus, BaseStore, $stateParams, $state, Project) {
    'ngInject';

    const factory = BaseStore(EventBus);
    factory.id = 'Users';

    EventBus.on(EventBus.users.SET, function (scope, data) {
        factory.data.users = data;
        factory.emitChanges();
    });

    factory.getUsers = function () {
        return factory.data.users;
    };

    return factory;
}

export default UsersStore;
