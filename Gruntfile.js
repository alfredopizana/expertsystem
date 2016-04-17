module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'css/main.css' : 'sass/main.scss'
				}
			}
		},
		cssmin:{
		   build: {
                src: 'css/main.css',
                dest: 'css/main.min.css'
            }
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass','cssmin']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default',['watch']);
}