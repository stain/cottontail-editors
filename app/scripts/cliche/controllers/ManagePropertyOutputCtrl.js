/**
 * Author: Milica Kadic
 * Date: 12/18/14
 * Time: 12:30 PM
 */

'use strict';

angular.module('registryApp.cliche')
    .controller('ManagePropertyOutputCtrl', ['$scope', '$modalInstance', 'Cliche', 'options', 'lodash', 'HelpMessages', function ($scope, $modalInstance, Cliche, options, _, HelpMessages) {

        var key = options.key || 'name';
        var idObj = {n: '', o: ''};

        $scope.help = HelpMessages;

        $scope.view = {};
		$scope.view.uniqueId = _.uniqueId();
        $scope.view.key = key;
        $scope.view.mode = options.mode;
        $scope.view.property = options.property || {};
        $scope.view.property.type = Cliche.getSchema('output', options.property, options.toolType, false);

        // only add adapter if one has been defined
        if (options.property && options.property.outputBinding) {
            $scope.view.property.outputBinding = Cliche.getAdapter(options.property, false, 'output');
        }

        $scope.view.name = Cliche.parseName(options.property);
        $scope.view.required = Cliche.isRequired($scope.view.property.type);
        $scope.view.type = Cliche.parseType($scope.view.property.type);
        $scope.view.items = Cliche.getItemsRef($scope.view.type, $scope.view.property.type);
        $scope.view.itemsType = Cliche.getItemsType($scope.view.items);

        $scope.view.types = Cliche.getTypes('output');
        $scope.view.itemTypes = Cliche.getTypes('outputItem');

		$scope.view.label = $scope.view.property.label;
		$scope.view.description = $scope.view.property.description;
		$scope.view.fileTypes = $scope.view.property['sbg:fileTypes'];

		$scope.view.metadata = [];
		if ($scope.view.property.outputBinding && $scope.view.property.outputBinding.metadata) {
			_.forOwn($scope.view.property.outputBinding.metadata, function (value, key) {
				$scope.view.metadata.push({value: value, key: key});
			});
		}
		$scope.view.showFileTypes = $scope.view.type === 'File' || $scope.view.itemsType === 'File';

        idObj.o = $scope.view.name;

        // shows expression style input rather than regular input
        // for secondary files
        $scope.view.isSecondaryFilesExpr = false;

        // create list of input ids to inherit metadata from
        $scope.view.inputs = _.pluck(_.filter(Cliche.getTool().inputs, function(input) {
            var type = Cliche.parseType(input.type),
                typeObj = Cliche.parseTypeObj(input.type);
            return type === 'File' || (typeObj.items && typeObj.items === 'File');
        }), 'id');

		if (!_.isEmpty($scope.view.inputs)) {
			$scope.$watch('view.property.outputBinding["sbg:inheritMetadataFrom"]', function(n) {
				if (_.isNull(n)) {
					delete  $scope.view.property.outputBinding['sbg:inheritMetadataFrom'];
					if (_.isEmpty($scope.view.property.outputBinding)) {
						delete $scope.view.property.outputBinding;
					}
				}
			})
		}


        /**
         * Toggle secondary files into array (not currently using)
         */
        //$scope.toggleToList = function() {
        //    $scope.view.property.outputBinding.secondaryFiles = [];
        //    $scope.view.property.outputBinding.secondaryFiles.push('');
        //    $scope.view.isSecondaryFilesExpr = false;
        //};

		$scope.addMetadata = function () {
			$scope.view.metadata.push({
				key: '',
				value: ''
			});
		};

        /**
         * Remove meta data from the output
         *
         * @param {integer} index
         */
        $scope.removeMetadata = function (index) {
            $scope.view.metadata.splice(index, 1);
        };

        /**
         * Update existing meta value with expression or literal
         *
         * @param index
         * @param value
         */
        $scope.updateMetaValue = function (index, value) {
            $scope.view.metadata[index].value = value;
        };

        /**
         * Save property changes
         *
         * @returns {boolean}
         */
        $scope.save = function() {

            $scope.view.error = '';
            $scope.view.form.$setDirty();

            if ($scope.view.form.$invalid) { return false; }

	        if ($scope.view.showFileTypes) {
		        if (!$scope.view.property.outputBinding) {
			        $scope.view.property.outputBinding = {};
		        }

		        $scope.view.property.outputBinding.metadata = {};


		        if (!_.isEmpty($scope.view.metadata)) {
			        _.forEach($scope.view.metadata, function(meta) {
				        if (!meta.error && meta.key !== '') {
					        $scope.view.property.outputBinding.metadata[meta.key] = meta.value;
				        }
			        });
		        }
	        }

            var inner = {
                key: key,
                name: $scope.view.name,
                required: $scope.view.required,
                type: $scope.view.type,
                items: $scope.view.items
            };

            $scope.view.property.type = $scope.view.property.schema;
            delete $scope.view.property.schema;

            var formatted = Cliche.formatProperty(inner, $scope.view.property, 'output');

	        if ($scope.view.label !== '') { formatted.label = $scope.view.label; }
	        if ($scope.view.description !== '') { formatted.description = $scope.view.description; }
	        if ($scope.view.fileTypes !== '') { formatted['sbg:fileTypes'] = $scope.view.fileTypes; }

	        idObj.n = $scope.view.name;

            Cliche.manageProperty(options.mode, formatted, options.properties, idObj)
                .then(function() {
                    $modalInstance.close({prop: formatted});
                }, function(error) {
                    $scope.view.error = error;
                });

        };

        /* watch for the type change in order to adjust the property structure */
        $scope.$watch('view.type', function(n, o) {
            if (n !== o) {
                if (n === 'array') {
                    $scope.view.itemsType = 'File';
                    $scope.view.items = $scope.view.itemsType;
	                $scope.view.showFileTypes = true;
                } else {
                    delete $scope.view.items;
	                $scope.view.showFileTypes = n === 'File';
                }
            }
        });


        /**
         * Update existing glob value with expression or literal
         *
         * @param value
         */
        $scope.updateGlobValue = function (value) {

            if (_.isUndefined($scope.view.property.outputBinding)) {
                $scope.view.property.outputBinding = {};
            }
            $scope.view.property.outputBinding.glob = value;
        };

        /**
         * Dismiss modal
         */
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);
