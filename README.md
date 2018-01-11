# Foundation for Sites Template

This is the basic starter theme for [Foundation for Sites 6](http://foundation.zurb.com/sites). It includes a Sass compiler and a gulp setup for you.

## Installation

To use this template, your computer needs:

- [NodeJS](https://nodejs.org/en/) (0.12 or greater)
- [Git](https://git-scm.com/)
- Bower to update Foundation

Firstly create a blank Wordpress installation and then clone the repo into the *site* root. This will clone the theme to htdocs/wp-content/themes/eclipsecreative. 

Next, remove the .git folder to start your own repository for the website.

To set up the theme, cd into theme folder and run:

```bash
	npm install
```

To get browserSync to work you will need to change the SITE_URL variable in gulpfile.js

To compile and start browser sync run the command:

```bash
	gulp
```

The gulp tasks include: 

	- Sass compilation and compression
	- Javascript concatination and minification
	- SVG optimization and a duplicate .PNG file created
	- Image compression
	- Automatic browser refresh on save

### Using the CLI

Install the Foundation CLI with this command:

```bash
npm install foundation-cli --global
```

Use this command to set up a blank Foundation for Sites project with this template:

```bash
foundation new --framework sites --template basic
```

The CLI will prompt you to give your project a name. The template will be downloaded into a folder with this name.

### Manual Setup

To manually set up the template, first download it with Git:

```bash
git clone https://github.com/zurb/foundation-sites-template projectname
```

Then open the folder in your command line, and install the needed dependencies:

```bash
cd projectname
npm install
bower install
```

Finally, run `npm start` to run the Sass compiler. It will re-run every time you save a Sass file.
