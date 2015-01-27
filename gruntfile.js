module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        components : [
          "js/audio_controls.js",
          "js/video.js",
          "js/player_utils.js",
          "js/player.js"
        ],
        src: [ '<%= concat.dist.components %>' ],
        dest: 'player.dev.js'
      }
    },
    uglify: {
      options: {
        // banner: '/*! <%= pkg.name %> <%= grunt.template.today() %> */\n'
      },
      dist: {
        files: {
          'player.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: [ 'gruntfile.js', '<%= concat.dist.components %>' ],
      options: {
        asi: true,
        smarttabs: true,
        laxcomma: true,
        lastsemic: true,
        // options here to override JSHint defaults
        globals: {
          console: true,
          module: true,
          document: true
        }
      }
    },
    notify: {
      watch: {
        options: {
          title: 'HRRRRRGH',
          message: 'No errors while grunting'
        }
      }
    },
    //less: {
    //    production: {
	//        options: {
	//	        cleancss: true
	//		},
	//		files: {
	//			'player.min.css': 'less/player.less'
	//		}
	//	},
	//	development: {
	//		files: {
	//			'player.dev.css': 'less/player.less'
	//		}
	//	}
    //},
    watch: {
      config : {
        files : ['gruntfile.js'],
        options : {
          reload: true
        }
      },
     // css: {
     //   files: ['less/*.less'],
     //   tasks: ['css']
     // },
      js: {
        files: ['<%= concat.dist.src %>'],
        tasks: ['js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-notify');
  //grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');


  //grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'notify', 'less']);
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'notify']);
  grunt.registerTask('js', ['jshint', 'concat', 'uglify', 'notify' ]);
  //grunt.registerTask( 'css', ['less', 'notify'] );

};
