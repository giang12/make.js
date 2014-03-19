/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '<%= pkg.repository ? "* " + pkg.repository.url + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> (<%= pkg.author.url %>);' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            version: {
                src: ['lib/head.js',
                    'lib/modules/*.js',
                    'lib/foot.js'

                ],
                dest: 'dist/<%= pkg.version %>/<%= pkg.name %>-<%= pkg.version %>.js'
            },
            main: {
                src: ['lib/head.js',
                    'lib/modules/*.js',
                    'lib/foot.js'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            main: {
                src: '<%= concat.main.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            },
            version: {
                src: '<%= concat.version.dest %>',
                dest: 'dist/<%= pkg.version %>/<%= pkg.name %>-<%= pkg.version %>.min.js'
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                globals: {}
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib: {
                src: ['lib/head.js',
                    'lib/modules/*.js',
                    'lib/foot.js'
                ]
            }
        },

        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            }
        },

        open: {
            test: {
                path: 'tests/index.html',
                app: 'Google Chrome'
            },

        },

        qunit: {
            all: ['tests/*.html']
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');

    // Default task.
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('test', ['qunit']);
    grunt.registerTask('default', ['concat', 'uglify', 'test']);

};