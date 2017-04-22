module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        stripBanners: true
      },
      css: {
        src: [
          'src/stylesheets/bootstrap.css',
          'src/stylesheets/bootstrap-submenu.css',
          'src/stylesheets/bootstrap4-classes.css',
          'src/stylesheets/bootstrap-datepicker.css',
          'src/stylesheets/datatables-bootstrap.css',
          'src/stylesheets/datatables-buttons.css',
          'src/stylesheets/jquery-form-validator.css',

          'src/stylesheets/ui.css',
        ],
        dest: 'dist/stylesheets/ui.css',
        nonull: true
      },
      js: {
        src: [
          'src/javascripts/bootstrap.js',
          'src/javascripts/bootstrap-submenu.js',
          'src/javascripts/bootstrap-datepicker.js',
          'src/javascripts/bootstrap-datepicker.pt-BR.js',
          'src/javascripts/jquery-datatables.js',
          'src/javascripts/jquery-datatables-bootstrap.js',
          'src/javascripts/jquery-datatables-buttons.js',
          'src/javascripts/jquery-datatables-buttons-html5.js',
          'src/javascripts/jquery-mask.js',
          'src/javascripts/jquery-maskmoney.js',
          'src/javascripts/jquery-safeform.js',
          'src/javascripts/jquery-checkboxes.js',

          'src/javascripts/jquery-form-validator.js',
          'src/javascripts/jquery-form-validator-brazil.js',
          'src/javascripts/jquery-form-validator-date.js',
          'src/javascripts/jquery-form-validator-file.js',
          'src/javascripts/jquery-form-validator-logic.js',
          'src/javascripts/jquery-form-validator-sanitize.js',
          'src/javascripts/jquery-form-validator-security.js',
          'src/javascripts/jquery-form-validator-lang-pt.js',

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
