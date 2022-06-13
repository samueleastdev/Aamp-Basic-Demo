module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    cssmin: {
      sitecss: {
        options: {
          banner: "",
        },
        files: {
          "dist/bundle.css": ["css/*.css"],
        },
      },
    },
    uglify: {
      options: {
        compress: true,
      },
      applib: {
        src: ["src/*.js"],
        dest: "dist/bundle.js",
      },
    },
    cacheBust: {
      taskName: {
        options: {
          deleteOriginals: true,
          assets: ["dist/**"],
        },
        src: ["index.html"],
      },
    },
    watch: {
      scripts: {
        files: ["src/*.js"],
        tasks: ["uglify", "cssmin", "cacheBust"],
        options: {
          spawn: false,
        },
      },
    },
  });
  grunt.loadNpmTasks("grunt-cache-bust");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.registerTask("default", ["watch"]);
};
