'use strict';

module.exports = function(grunt){

  /* Configure
  ============================ */
  var configs = {

    css_combine_files : [
      'src/vendor/css/bootstrap.min.css',
      'src/css/combined.css'],

    js_combine_files : [
      'src/vendor/js/jquery-1.10.1.min.js',
      'src/vendor/js/modernizr-2.6.2-respond-1.1.0.min.js',
      'src/vendor/js/bootstrap.min.js',
      'src/js/main.js'],

    js_hint_files : [
      'src/js/main.js'],

    watch_files : [
      'assets/sass/**/*',
      'src/js/*',
      'src/vendor/css/*',
      'src/vendor/js/*']
  }

  /* Init
  ============================ */
  grunt.initConfig({
    sass: {
  		options: {
  			sourceMap: true
  		},
  		dist: {
  			files: {
          "assets/css/main.css" : "assets/sass/main.scss"
  			}
  		}
  	},
    jshint: {
      beforeconcat: configs.js_hint_files
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: configs.js_combine_files,
        dest: 'src/js/compiled.js',
      },
    },
    uglify: {
        my_target: {
          files: {
            'dist/js/compiled.min.js' : 'src/js/compiled.js'
          }
        }
    },
    cssmin: {
      combine: {
        files: {
          'assets/css/main.min.css' : configs.css_combine_files
        }
      }
    },
    watch: {
      src: {
        files: configs.watch_files,
        tasks: ['build']
      }
    }
  });

  // Add plugins
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Register tasks
  // grunt.registerTask('build', ['sass','cssmin','concat','uglify','jshint']);
  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build']);

  grunt.event.on('watch', function(action, filepath) {
    grunt.log.writeln(filepath + ' has ' + action);
  });

};
