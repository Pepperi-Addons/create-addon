# ClientSide

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

## Development server
There are 2 different ways to develop your UI:

- Inside WebApp (Single-Spa)
    to run this configuration, use `npm run single-spa` and than Navigate to https://app.sandbox.pepperi.com/settings/your-app-uuid/addon?dev=true to see your changes.

The app will automatically reload if you change any of the source files.

## Project structure
---
The following is an overview of the project structure. 
The node_modules folder is in use by `npm`

#### Folders
|Folder | Description |
| ---:  | :---       |
| app | folder contains all project related files (eg. components, routing info, modules) |
| assets | put any assets you might need for the front end (eg. translation files, images) |
| single-spa | configuration files for single-spa wrapper |

#### Additional files
`angular.json` contains configuration for the angular project

`extra-webpack.config.js` extra configuration for bundling your application. 

`package.json` contains dependencies for your project, and all the scripts you can run

`README.md` This file. You can file info here regarding your project.

## Routing
all your projects routes are inside `app-routing.module.ts` inside `app` folder.
```
const routes: Routes = [
    {
        path: ':settingsSectionName/:addonUUID/:slugName',
        component: SettingsComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./editor-list/editor-list.module').then(m => m.EditorListModule),
            },
            {
                path: ':form_key',
                loadChildren: () => import('./editor-form/editor-form.module').then(m => m.EditorFormModule)
            },
            { path: '**', component: EmptyRouteComponent }
        ]
    }
];
```
each object created inside **children** array will define a new path for the project. 
it is recommended that each path will have it's own component
