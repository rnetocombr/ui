module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        stripBanners: true
      },
      css: {
        src: [
          'src/stylesheets/kube.css',
          'src/stylesheets/ui.css',
          'src/stylesheets/font-awesome.css',
        ],
        dest: 'dist/stylesheets/ui.css',
        nonull: true
      },
      js: {
        src: [
          'src/javascripts/kube.js',

          'src/javascripts/moment.js',
          'src/javascripts/moment-pt-br.js',

          'src/javascripts/jquery-mask.js',
          'src/javascripts/jquery-maskmoney.js',
          'src/javascripts/jquery-keyfilter.js',
          'src/javascripts/jquery-safeform.js',
          'src/javascripts/jquery-checkboxes.js',

          'src/javascripts/ui.js'
        ],
        dest: 'dist/javascripts/ui.js',
        nonull: true
      }
    },

    uglify: {
      options: {
        preserveComments: false,
        screwIE8: true,
        beautify: false,
        mangle: {
          except: ['jQuery', 'Kube']
        }
      },
      ui: {
        files: {
          'dist/javascripts/ui.js': ['dist/javascripts/ui.js']
        }
      }
    },

    cssmin: {
      options: {
        level: 2,
        keepSpecialComments: 0,
        compability: 'ie11'
      },
      css:{
        src: 'dist/stylesheets/ui.css',
        dest: 'dist/stylesheets/ui.css'
      }
    },

    watch: {
      scripts: {
        files: ['Gruntfile.js', 'src/javascripts/*.js', 'src/stylesheets/*.css'],
        tasks: ['concat'],
      },
    },

    connect: {
      server: {
        options: {
          port: 9000,
          hostname: '*',
          keepalive: true,
          base: {
            path: '.'
          }
        }
      }
    },

    compress: {
      main: {
        options: {
          archive: 'ui.zip',
          pretty: true
        },
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['**/*'],
            dest: '/dist/'
          },
          {
            expand: true,
            cwd: 'docs/',
            src: ['**/*'],
            dest: '/docs/'
          }
        ]

      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('dist', ['concat', 'uglify', 'cssmin', 'compress']);
  grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'compress', 'connect']);
};
