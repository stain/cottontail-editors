/**
 * @ngdoc service
 * @name clicheApp.ApiService
 * @description
 * Api override
 *
 * @requires $resource, $http, Globals
 *
 * */


angular.module('integration')
    .service('Api', ['$resource', '$http', 'Globals',function ($resource, $http, Globals) {

        var self = {};
        var sessionId = Globals.user.sessionId;
        var brood = Globals.apiUrls.brood;
        var broodAppUrl = brood + 'apps';
        var projectOwner = Globals.projectOwner;
        var projectSlug = Globals.projectSlug;
        var appName = Globals.appName;
        var revision = parseInt(Globals.revision, 10);
        var getAppsUrl = Globals.get_apps_url;
        var getMineAppsByProject = 'aggregate?group_by=project&func=array&visibility=mine';
        var getPublicAppsByProject = 'aggregate?group_by=project&func=array&visibility=public';
        var validateAppUrl =  brood + 'validate/app';
        var headers = {
            'Content-Type': 'application/json',
            'session-id': sessionId
        };

        self.apps = $resource(broodAppUrl + '/' + projectOwner + '/' + projectSlug + '/' + appName + '/:revision', {revision: '@revision'}, {
            'post': {method: 'POST', headers: headers},
            'update': {method: 'POST', headers: headers},
            'get': {method: 'GET', headers: headers, params: {'_role': 'default'}},
            'delete': {method: 'DELETE', headers: headers}
        });

        self.getApp = $resource(broodAppUrl + '/:projectOwner/:projectSlug/:appName', {projectOwner: '@projectOwner', appName: '@appName',projectSlug: '@projectSlug'}, {
            'get': {method: 'GET', headers: headers, params: {'_role': 'default'}}
        });

        self.getAllApps = $resource(broodAppUrl + getAppsUrl, {}, {
            'get': {method: 'GET', headers: headers}
        });

        self.getPublicAppsByProject = $resource(brood + getPublicAppsByProject, {}, {
            'get': {method: 'GET', headers: headers}
        });

        self.getMineAppsByProject = $resource(brood + getMineAppsByProject, {}, {
            'get': {method: 'GET', headers: headers}
        });

        self.validateApp = $resource(validateAppUrl, {}, {
            'validate': {method: 'POST', headers: headers}
        });

        self.getLatest = $resource(broodAppUrl  + '/' + projectOwner + '/' + projectSlug + '/' + appName, {}, {
            'get': {method: 'GET', headers: headers}
        });

        return self;


    }]);


