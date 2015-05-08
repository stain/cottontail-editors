// Generated on 2014-06-25 using generator-angular 0.9.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
//            bower: {
//                files: ['bower.json'],
//                tasks: ['wiredep']
//            },
//      js: {
//        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
//        tasks: ['newer:jshint:all'],
//        options: {
//          livereload: '<%= connect.options.livereload %>'
//        }
//      },
//      jsTest: {
//        files: ['test/spec/{,*/}*.js'],
//        tasks: ['newer:jshint:test', 'karma']
//      },
            sass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['sass:server']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            template: {
                files: [
                    '<%= yeoman.app %>/views/{,*/}*.html',
                    '<%= yeoman.app %>/views/cliche/{,*/}*.html',
                    '<%= yeoman.app %>/views/app/{,*/}*.html',
                    '<%= yeoman.app %>/views/repo/{,*/}*.html',
                    '<%= yeoman.app %>/views/task/{,*/}*.html'
                ],
                tasks: ['ngtemplates:app', 'ngtemplates:cliche', 'ngtemplates:dyole']
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/scripts/{,*/}*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            options: {
                force: true
            },
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yeoman.dist %>/{,*/}*',
                            '!<%= yeoman.dist %>/.git*',
                            '!<%= yeoman.dist %>/fonts'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '{,*/}*.css',
                        dest: '.tmp/styles/'
                    }
                ]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            options: {
                cwd: '<%= yeoman.app %>'
            },
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                ignorePath: /..\//
            },
            sass: {
                src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                ignorePath: /(\.\.\/){1,2}bower_components\//
            }
        },

        sass: {
            server: {
                options: {
                    style: 'expanded',
                    sourcemap: 'auto'
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/styles',
                        src: ['*.scss'],
                        dest: '<%= yeoman.app %>/styles',
                        ext: '.css'
                    }
                ]
            },
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/styles',
                        src: ['*.scss'],
                        dest: '.tmp/styles',
                        ext: '.css'
                    }
                ]
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/scripts/{,*/}*.js',
                    '<%= yeoman.dist %>/styles/{,*/}*.css'
                    //'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    //'<%= yeoman.dist %>/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images']
            }
        },

        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css'
                    ]
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/vendor.min.js': [
                        '<%= yeoman.dist %>/scripts/vendor.js'
                    ],
                    '<%= yeoman.dist %>/scripts/dyole.min.js': [
                        '<%= yeoman.dist %>/scripts/util.js',
                        '<%= yeoman.dist %>/scripts/integration.js',
                        '<%= yeoman.dist %>/scripts/cliche.js',
                        '<%= yeoman.dist %>/scripts/dyole.js'
                    ],
                    '<%= yeoman.dist %>/scripts/cliche.min.js': [
                        '<%= yeoman.dist %>/scripts/util.js',
                        '<%= yeoman.dist %>/scripts/integration.js',
                        '<%= yeoman.dist %>/scripts/cliche.js'
                    ]
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            common: {
                src: [

                    '<%= yeoman.app %>/scripts/util/util.config.js',
                    '<%= yeoman.app %>/scripts/util/filters/is-empty.js',
                    '<%= yeoman.app %>/scripts/util/filters/encode.js',
                    '<%= yeoman.app %>/scripts/util/filters/trim.js',
                    '<%= yeoman.app %>/scripts/util/filters/repo.js',
                    '<%= yeoman.app %>/scripts/util/filters/is-integer.js',
                    '<%= yeoman.app %>/scripts/util/services/lodash.js',


                    '<%= yeoman.app %>/scripts/app/app.config.js',
                    '<%= yeoman.app %>/scripts/app/controllers/AppsCtrl.js',
                    '<%= yeoman.app %>/scripts/app/controllers/ToolCtrl.js',
                    '<%= yeoman.app %>/scripts/app/controllers/ToolRevisionCtrl.js',
                    '<%= yeoman.app %>/scripts/app/controllers/WorkflowViewCtrl.js',
                    '<%= yeoman.app %>/scripts/app/controllers/WorkflowEditorCtrl.js',
                    '<%= yeoman.app %>/scripts/app/models/App.js',

                    '<%= yeoman.app %>/scripts/repo/repo.config.js',
                    '<%= yeoman.app %>/scripts/repo/controllers/ReposCtrl.js',
                    '<%= yeoman.app %>/scripts/repo/controllers/RepoCtrl.js',
                    '<%= yeoman.app %>/scripts/repo/controllers/AddYourGitHubRepoCtrl.js',
                    '<%= yeoman.app %>/scripts/repo/controllers/RepoInstructionsCtrl.js',
                    '<%= yeoman.app %>/scripts/repo/controllers/PickRepoModalCtrl.js',
                    '<%= yeoman.app %>/scripts/repo/controllers/ManageRepoCtrl.js',
                    '<%= yeoman.app %>/scripts/repo/models/Repo.js',

                    '<%= yeoman.app %>/scripts/common/common.config.js',
                    '<%= yeoman.app %>/scripts/common/controllers/MarkdownCtrl.js',
                    '<%= yeoman.app %>/scripts/common/controllers/ModalCtrl.js',
                    '<%= yeoman.app %>/scripts/common/controllers/ExpressionCtrl.js',
                    '<%= yeoman.app %>/scripts/common/directives/copy.js',
                    '<%= yeoman.app %>/scripts/common/directives/loading.js',
                    '<%= yeoman.app %>/scripts/common/directives/paginator.js',
                    '<%= yeoman.app %>/scripts/common/directives/json-preview.js',
                    '<%= yeoman.app %>/scripts/common/directives/error.js',
                    '<%= yeoman.app %>/scripts/common/directives/is-valid-name.js',
                    '<%= yeoman.app %>/scripts/common/directives/is-valid-int.js',
                    '<%= yeoman.app %>/scripts/common/directives/expr.js',
                    '<%= yeoman.app %>/scripts/common/directives/codemirror.js',
                    '<%= yeoman.app %>/scripts/common/directives/help-message.js',
                    '<%= yeoman.app %>/scripts/common/directives/ng-enter.js',
                    '<%= yeoman.app %>/scripts/common/directives/focus-here.js',
                    '<%= yeoman.app %>/scripts/common/directives/content-loading.js',
                    '<%= yeoman.app %>/scripts/common/directives/file-picker.js',
                    '<%= yeoman.app %>/scripts/common/directives/selected-files.js',
                    '<%= yeoman.app %>/scripts/common/services/BeforeUnload.js',
                    '<%= yeoman.app %>/scripts/common/services/BeforeRedirect.js',
                    '<%= yeoman.app %>/scripts/common/services/Helper.js',
                    '<%= yeoman.app %>/scripts/common/services/SandBox.js',
                    '<%= yeoman.app %>/scripts/common/services/schema-validator.js',
                    '<%= yeoman.app %>/scripts/common/services/Api.js',
                    '<%= yeoman.app %>/scripts/common/services/HotkeyRegistry.js',
                    '<%= yeoman.app %>/scripts/common/services/HTTPInterceptor.js',
                    '<%= yeoman.app %>/scripts/common/constants/ScriptSchema.js',
                    '<%= yeoman.app %>/scripts/common/constants/ToolSchema.js',
                    '<%= yeoman.app %>/scripts/common/constants/WorkflowSchema.js',
                    '<%= yeoman.app %>/scripts/common/constants/HelpMessages.js',
                    '<%= yeoman.app %>/scripts/common/controllers/ModalJSONCtrl.js'
                ],
                dest: 'dist/scripts/util.js'
            },
            dyole: {
                src: [
                    '<% yeoman.app %>/scripts/cliche/cliche.config.js',
                    '<% yeoman.app %>/scripts/cliche/constants/schemas.js',
                    '<% yeoman.app %>/scripts/cliche/constants/schema-definitions.js',
                    '<% yeoman.app %>/scripts/cliche/controllers/ClicheCtrl.js',
                    '<% yeoman.app %>/scripts/cliche/controllers/InputFileMoreCtrl.js',
                    '<% yeoman.app %>/scripts/cliche/controllers/ManagePropertyArgCtrl.js',
                    '<% yeoman.app %>/scripts/cliche/controllers/ManagePropertyInputCtrl.js',
                    '<% yeoman.app %>/scripts/cliche/controllers/ManagePropertyOutputCtrl.js',
                    '<% yeoman.app %>/scripts/cliche/controllers/JsonEditorCtrl.js',
                    '<% yeoman.app %>/scripts/cliche/directives/property-input.js',
                    '<% yeoman.app %>/scripts/cliche/directives/property-output.js',
                    '<% yeoman.app %>/scripts/cliche/directives/property-arg.js',
                    '<% yeoman.app %>/scripts/cliche/directives/enum.js',
                    '<% yeoman.app %>/scripts/cliche/directives/input-field.js',
                    '<% yeoman.app %>/scripts/cliche/directives/add-property.js',
                    '<% yeoman.app %>/scripts/cliche/directives/key-changer.js',
                    '<% yeoman.app %>/scripts/cliche/directives/separator.js',
                    '<% yeoman.app %>/scripts/cliche/directives/separator-info.js',
                    '<% yeoman.app %>/scripts/cliche/directives/property-header.js',
                    '<% yeoman.app %>/scripts/cliche/filters/contains.js',
                    '<% yeoman.app %>/scripts/cliche/filters/size.js',
                    '<% yeoman.app %>/scripts/cliche/services/Cliche.js',
                    '<% yeoman.app %>/scripts/cliche/services/RecursionHelper.js',
                    '<% yeoman.app %>/scripts/cliche/services/Separator.js',
                    '<% yeoman.app %>/scripts/cliche/services/Validator.js',

                    '<%= yeoman.app %>/scripts/dyole-app/dyoleApp.js',
                    '<%= yeoman.app %>/scripts/dyole-app/template.js',
                    '<%= yeoman.app %>/scripts/dyole/dyole.config.js',

                    '<%= yeoman.app %>/scripts/dyole/constants/Schemas.js',

                    '<%= yeoman.app %>/scripts/dyole/controllers/PipelineCtrl.js',
                    '<%= yeoman.app %>/scripts/dyole/controllers/NodeEditCtrl.js',
                    '<%= yeoman.app %>/scripts/dyole/controllers/DyoleJsonEditorCtrl.js',
                    '<%= yeoman.app %>/scripts/dyole/controllers/DyoleEditMetadataCtrl.js',
                    '<%= yeoman.app %>/scripts/dyole/directives/pipeline.js',
                    '<%= yeoman.app %>/scripts/dyole/directives/drag.js',
                    '<%= yeoman.app %>/scripts/dyole/directives/drop.js',
                    '<%= yeoman.app %>/scripts/dyole/factories/pipeline.js',
                    '<%= yeoman.app %>/scripts/dyole/factories/event.js',
                    '<%= yeoman.app %>/scripts/dyole/factories/node.js',
                    '<%= yeoman.app %>/scripts/dyole/factories/connection.js',
                    '<%= yeoman.app %>/scripts/dyole/factories/terminal.js',
                    '<%= yeoman.app %>/scripts/dyole/factories/formater.js',
                    '<%= yeoman.app %>/scripts/dyole/factories/formaterD2.js',
                    '<%= yeoman.app %>/scripts/dyole/factories/common.js',

                    '<%= yeoman.app %>/scripts/dyole/services/PipelineService.js'
                ],
                dest: 'dist/scripts/dyole.js'
            },
            cliche: {
                src: [
                    '<%= yeoman.app %>/scripts/cliche-app/clicheApp.js',
                    '<%= yeoman.app %>/scripts/cliche-app/template.js',
                    '<%= yeoman.app %>/scripts/cliche/cliche.config.js',
                    '<%= yeoman.app %>/scripts/cliche/constants/schemas.js',
                    '<%= yeoman.app %>/scripts/cliche/constants/schema-definitions.js',
                    '<%= yeoman.app %>/scripts/cliche/controllers/ClicheCtrl.js',
                    '<%= yeoman.app %>/scripts/cliche/controllers/InputFileMoreCtrl.js',
                    '<%= yeoman.app %>/scripts/cliche/controllers/ManagePropertyArgCtrl.js',
                    '<%= yeoman.app %>/scripts/cliche/controllers/ManagePropertyInputCtrl.js',
                    '<%= yeoman.app %>/scripts/cliche/controllers/ManagePropertyOutputCtrl.js',
                    '<%= yeoman.app %>/scripts/cliche/controllers/JsonEditorCtrl.js',
                    '<%= yeoman.app %>/scripts/cliche/directives/property-input.js',
                    '<%= yeoman.app %>/scripts/cliche/directives/property-output.js',
                    '<%= yeoman.app %>/scripts/cliche/directives/property-arg.js',
                    '<%= yeoman.app %>/scripts/cliche/directives/enum.js',
                    '<%= yeoman.app %>/scripts/cliche/directives/input-field.js',
                    '<%= yeoman.app %>/scripts/cliche/directives/add-property.js',
                    '<%= yeoman.app %>/scripts/cliche/directives/key-changer.js',
                    '<%= yeoman.app %>/scripts/cliche/directives/separator.js',
                    '<%= yeoman.app %>/scripts/cliche/directives/separator-info.js',
                    '<%= yeoman.app %>/scripts/cliche/directives/property-header.js',
                    '<%= yeoman.app %>/scripts/cliche/filters/contains.js',
                    '<%= yeoman.app %>/scripts/cliche/filters/size.js',
                    '<%= yeoman.app %>/scripts/cliche/services/Cliche.js',
                    '<%= yeoman.app %>/scripts/cliche/services/RecursionHelper.js',
                    '<%= yeoman.app %>/scripts/cliche/services/Separator.js',
                    '<%= yeoman.app %>/scripts/cliche/services/Validator.js'

                ],
                dest: 'dist/scripts/cliche.js'
            },
            integration: {
                src: [
                    '<%= yeoman.app %>/scripts/integration/integration.config.js',
                    '<%= yeoman.app %>/scripts/integration/services/UserService.js',
                    '<%= yeoman.app %>/scripts/integration/services/ApiService.js'
                ],
                dest: 'dist/scripts/integration.js'
            },
            vendor: {
                src: [
                    '<%= yeoman.app %>/vendor/jsandbox/src/jsandbox.js',
                    '<%= yeoman.app %>/vendor/angular-ui-sortable/sortable.min.js',

                    'bower_components/jquery/dist/jquery.js',

                    'bower_components/angular/angular.js',
                    'bower_components/angular-resource/angular-resource.js',
                    'bower_components/angular-cookies/angular-cookies.js',
                    'bower_components/angular-sanitize/angular-sanitize.js',
                    'bower_components/angular-animate/angular-animate.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.js',

                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                    'bower_components/ng-prettyjson/dist/ng-prettyjson.min.js',

                    'bower_components/angular-marked/angular-marked.js',
                    'bower_components/ng-tags-input/ng-tags-input.js',
                    'bower_components/chronicle/chronicle.js'
                ],
                dest: 'dist/scripts/vendor.js'
            }
        },

        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.{png,jpg,jpeg,gif}',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },

        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.dist %>',
                        src: ['*.html', 'views/{,*/}*.html'],
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            }
        },

        // ngmin tries to make the code safe for minification automatically by
        // using the Angular long form for dependency injection. It doesn't work on
        // things like resolve or inject so those have to be done manually.
        ngmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/concat/scripts',
                        src: '*.js',
                        dest: '.tmp/concat/scripts'
                    }
                ]
            }
        },

        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            registryApp: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/concat/scripts',
                        src: '*.js',
                        dest: '.tmp/concat/scripts'
                    }
                ]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            //'views/{,*/}*.html',
                            '!**/views/**',
                            'images/{,*/}*.{png,jpg,jpeg,gif,webp,svg,ico}',
                            'fonts/*',
//                            'bower_components/*'
                            'bower_components/es5-shim/es5-shim.js',
                            'bower_components/json3/lib/json3.min.js',
                            'bower_components/zeroclipboard/dist/ZeroClipboard.swf',
                            'data/*',
                            'vendor/jsandbox/src/jsandbox-worker.js',
                            'vendor/raphael/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/images',
                        src: ['generated/*']
                    }
                ]
            }
//            styles: {
//                expand: true,
//                cwd: '<%= yeoman.app %>/styles',
//                dest: '.tmp/styles/',
//                src: '{,*/}*.css'
//            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'sass:server'
            ],
            test: [
                'sass'
            ],
            dist: [
                'sass:dist',
                'imagemin',
                'svgmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        ngtemplates: {
            app: {
                cwd: '<%= yeoman.app %>',
                src: [
                    'views/{,*/}*.html',
                    'views/cliche/{,*/}*.html',
                    'views/app/{,*/}*.html',
                    'views/repo/{,*/}*.html',
                    'views/task/{,*/}*.html'
                ],
                dest: '<%= yeoman.app %>/scripts/template.js',
                options: {
                    module: 'registryApp',
                    htmlmin: {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true
                    }
                }
            },

            cliche: {
                cwd: '<%= yeoman.app %>',
                src: [
                    'views/{,*/}*.html',
                    'views/cliche/{,*/}*.html',
                    'views/app/{,*/}*.html',
                    'views/repo/{,*/}*.html',
                    'views/task/{,*/}*.html'
                ],
                dest: '<%= yeoman.app %>/scripts/cliche-app/template.js',
                options: {
                    module: 'clicheApp',
                    htmlmin: {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true
                    }
                }
            },

            dyole: {
                cwd: '<%= yeoman.app %>',
                src: [
                    'views/{,*/}*.html',
                    'views/dyole/{,*/}*.html',
                    'views/cliche/{,*/}*.html',
                    'views/app/{,*/}*.html',
                    'views/repo/{,*/}*.html',
                    'views/task/{,*/}*.html'
                ],
                dest: '<%= yeoman.app %>/scripts/dyole-app/template.js',
                options: {
                    module: 'dyoleApp',
                    htmlmin: {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true
                    }
                }
            }
        }


    });


    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            //'wiredep',
            'concurrent:server',
            'autoprefixer',
//            'configureProxies:livereload',
//            'connect:livereload',
            'ngtemplates:app',
            'watch'
        ]);
    });

    grunt.registerTask('integrate', 'Compiles editors as separate apps', function (target) {

        if (target === 'cliche') {
            grunt.task.run([
                'clean:server',
                'concurrent:server',
                'autoprefixer',
                'ngtemplates:cliche',
                'watch'
            ]);
        }

        if (target === 'dyole') {
            grunt.task.run([
                'clean:server',
                'concurrent:server',
                'autoprefixer',
                'ngtemplates:dyole',
                'watch'
            ]);
        }

        if (!target) {
            grunt.task.run([
                'clean:server',
                'concurrent:server',
                'autoprefixer',
                'ngtemplates:dyole',
                'ngtemplates:cliche',
                'watch'
            ]);
        }
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('test', [
        'clean:server',
        //'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
//        'useminPrepare',
        'concurrent:dist',
        'ngtemplates:dyole',
        'ngtemplates:cliche',
        'autoprefixer',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'cssmin',
        'uglify'
    ]);

    grunt.registerTask('default', [
//        'newer:jshint',
//        'test',
        'build'
    ]);
};
