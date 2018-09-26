This patch allows command line creation of the theme BOOST CSS File.

After changes are made to any of the theme's SCSS files, or on Moodle updates, you can manually create the theme CSS files

Prerequisites

You will need node.js and grunt installed to use this patch

Key files:

Gruntfile.js (contains to statements for Grunt to compile css)
postcss.js (required for post processing css and adding browser prefixes)
package.json (list of node modules required for grunt).

After using this patch navigate to your boost folder:

$/ cd theme/boost

Run the node installer to get all required modules

$/ npm install


Now run grunt to compiled the css files

$/ grunt compile


The output should be something like this:

Running "sass:dist" (sass) task

Running "exec:postcss" (exec) task

> theme-boost-tasks@0.1.0 postcss /var/www/repositories/stable_master/moodle/theme/boost
> postcss --config postcss.js --output style/moodle.css style/moodle.css


Running "exec:decache" (exec) task
Moodle theme cache reset.

