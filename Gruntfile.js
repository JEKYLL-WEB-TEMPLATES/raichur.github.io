module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      all: ['Grunfile.js', '**/*.js']
    },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'js/main.min.js': 'js/main.js'          // 'destination': 'source'
        }
      }
    },

    // convert sass to css -----------------------------------------------------
    sass: {                                        // Task
      dist: {                                      // Target
        options: {                                 // Target options
          style: 'expanded'
        },
        files: {                                   // Dictionary of files
          'css/main.css': 'css/main.scss',       // 'destination': 'source'
        }
      }
    },

    // autoprefixer ------------------------------------------------------------
    autoprefixer: {
      dist: {
        files: {
          'css/main.css': 'css/main.css'
        }
      }
    },

    // configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'css/main.min.css': 'css/main.css'
        }
      }
    },

    // configure watch to auto update ------------------------------------------
    watch: {
      stylesheets: {
        files: ['css/*.scss', '_sass/*.scss'],
        tasks: ['sass', 'cssmin']
      },
      scripts: {
        files: 'js/*.js',
        tasks: ['uglify']
      },
    }

  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');

  // ===========================================================================
  // CREATE TASKS ==============================================================
  // ===========================================================================
  grunt.registerTask('default', ['uglify', 'cssmin', 'sass', 'watch']);
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

};
