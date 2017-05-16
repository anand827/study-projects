## UI-Rage Gulp Workflow
------------------------

![Build Status][pass]
![DevDependency Status][dev-dep]
![License Status][license]
![Version Status][release]

## Table of Contents

* [Prerequisites](#prerequisites)
* [Usage](#usage)
* [Gulp Commands](#gulp-commands)
* [Important](#important)
* [Project Structure](#framework-structure)

## Prerequisites

* Node Js Latest Version [GetHere](https://nodejs.org/en/).
* VScode Editor [GetHere](https://code.visualstudio.com/) or any other.

## Usage

* Download the zip file in your specified path.
* Rename your root folder name(UI-Rage-Gulp-Workflow) as your PROJECT NAME.
* Create folder as `design` and `3rd-party` inside project root folder.
* Put your PSD and jpg as per datewise inside design folder and 3rd-party for framework reference(eg:bootstrap.zip).
* Navigate your project path in `CMD`(Command Prompt) `start + r`.
* Download your dependency files by running the command `npm install` in command line.
* After completion config your js in gulpfile.
* Create project document in the project.txt.
* Config your dependencies by the following command `gulp Lib`.
* After running above commands run this command for watch mode `gulp`(Start with css) or `gulp --Scss`(Start with sass) or `gulp --Less`(Start with less) project.


## Gulp Commands

* Default 	- `gulp`(Start with css) or `gulp --Scss`(Start with sass) or `gulp --Less`(Start with less)
* Polyfill  - `gulp Lib` Development || `gulp Jsmin --poly` Production (IE support polyfills concat and minification)
* Library 	- `gulp Lib` Development || `gulp Jsmin --lib` Production (Library concat and minification)
* Ui 		- `grunt Jsmin --ui` Production (custom js minification)
* Image   	- `gulp Imagemin` (Image optmization)
* Css 		- `gulp Cssmin` (Css minification)
* Html      - `gulp Htmlmin` (Html minification)


## Important

* This is a UI-Rage-Gulp-Workflow please adjust as per your project requirement (Not Project Structure).

## Project Structure

	   UI-Rage-Gulp-Workflow----|
								|---3rd-party    				--put your css and js library orginal source here for reference				
								|---design       				--put your jpg and psd design here in folder as per date				
								|---src          				--project source files	
									|---css  					--contains your custom css
									|---html     				--project root files and folder
										|---assets          	--contains project assets like css,images,fonts,js
											|---css    			--compiled css file
											|---images 			--project whole images 
												|---about       --about page images
												|---product     --product page images
												|---compressed 	--optimized image folder after running gulp command
											|---js				--contains generated js files
											|---fonts  			--contains font files
									|---js                      --contains your custom script (you can write ES5 or ES6 Spec)
									|---less     				--contains less files
									|---library             	--all library files
									|---sass     				--contains sass files
									|---template				--contains html files			
								|---.gitignore					--config file for git exclude items
								|---gulpfile.js					--gulp config
								|---package.json				--node package details
								|---project.txt                 --document about project
								|---README.md					--framework details

[pass]: https://img.shields.io/badge/build-pass-brightgreen.svg
[fail]: https://img.shields.io/badge/build-fail-red.svg
[dev-dep]: https://img.shields.io/badge/devDependencies-up--to--date-yellow.svg
[license]: https://img.shields.io/badge/license-UNLICENSED-orange.svg
[release]: https://img.shields.io/badge/version-1.2.0-blue.svg
