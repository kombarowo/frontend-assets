# Run project

_install dependencies_
npm i
_run gulp for build or dev_
npx gulp [ dev | build ]

# About "maker"

_"maker" can create base entries and modules files_

it helps to keep you poject structure well organized and easy scalable
for more underatanding you can check the folder structure picture

## Entry files

Entry files are main parts of app, there are 1 htm, 1 js, and 1 scss files
Htm includes scss and js, so for 1 page we are need only 3 files
_Main concpet - entry is a single document which browser loads to display the page, there are htm,js,scss_
_Example is about page: there are 1 html file for page content which includes entry scss and entry js files_

## Modules files

Modules are children of entries, so every entry file has child modules
We can create modules by languages, so we can create htm,js,scss or only scss and htm, or even only htm
Modules will be automaticaly import in parent entry file
_Main concpet - modules are parts of entries, for example it can be divided by page sections_
_Example is about-slider section: there are js, or js + scss and other combo for this part of page_
_Example is about-form section: there are js, or js + scss and other combo for this part of page_

### Command examples

-   Command example №1: npm run maker e(type - entry) products(entities) - single entry
-   Command example №2: npm run maker m(type - module) products-slider(entities) jsh(langs) - single module
-   Command example №3: npm run maker m(type - module) products,categories,news(entities) - multiple entries
-   Command example №4: npm run maker m(type - module) products-slider,products-block1,products-block2(entities) - multiple modules

npm run maker [type] [names] [langs]
