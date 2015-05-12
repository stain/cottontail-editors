/**
 * Created by filip on 12.5.15..
 */

'use strict';

angular.module('registryApp.cliche')
    .controller('SuggestedFilesCtrl', ['$scope', '$modal', '$templateCache', 'Cliche', 'Const', 'lodash', function ($scope, $modal, $templateCache, Cliche, Const, _) {

        $scope.view = {};

        $scope.view.required = Cliche.isRequired($scope.model);
        $scope.view.model = $scope.model.suggestedValue || [];

        var schema = $scope.model.outputs[0].schema;
        var type = Cliche.parseType(schema);
        var isArray = type === 'array';

        $scope.openFilePicker = function () {

            var modalInstance = $modal.open({
                template: $templateCache.get('views/partials/choose-file.html'),
                controller: 'ChooseFileCtrl',
                size: 'lg',
                windowClass: 'file-picker-modal',
                resolve: {
                    data: function () {
                        return {
                            selectedFiles: $scope.view.model,
                            selectOne: !isArray
                        }
                    }
                }
            });

            modalInstance.result.then(function (result) {
                $scope.view.model = result;
                console.log('*** Files Chosen: ', result);
            });
        };
        
        $scope.removeFile = function (id) {
            _.remove($scope.view.model, function (file) {
                return file.id === id;
            });
        };

        $scope.view.model = $scope.suggestedFiles;

        $scope.$watch('view.model', function(n, o) {
            if (n !== o) {
                $scope.model.suggestedValue = n;
            }
        });

    }])
    .directive('suggestedFiles', ['RecursionHelper', '$templateCache', function (RecursionHelper, $templateCache) {
        return {
            restrict: 'E',
            template: $templateCache.get('views/cliche/partials/suggested-files.html'),
            scope: {
                model: '=ngModel'
            },
            controller: 'SuggestedFilesCtrl',
            compile: function(element) {
                return RecursionHelper.compile(element, function() {});
            }
        };
    }]);