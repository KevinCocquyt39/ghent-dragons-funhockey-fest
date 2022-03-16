# Introduction

This project is a tournament scoring application, made for 8 teams.

# Getting Started

### Install electron

    npm install electron

### Start electron

    npm start

# Build and Test

## Packager

### Globally install electron packager

    npm install electron-packager -g

### Create package

    electron-packager . <app> --platform win32 --arch x64 --out dist/ --overwrite

## Installer

### Globally install electron installer for windows

    npm install electron-installer-windows -g

### Create installer (.exe)

    electron-installer-windows --src dist/<app>-win32-x64/ --dest dist/installers/

## Important

-   Make sure 'app' is the same als 'name' in package.json file. when using multiple words, use \_ as separator.
-   Set homepage in package.json file, otherwise you get a 'URI not found' during the creation of the installer.

## Obsolete?

Installer for windows store (http://electron.atom.io/docs/tutorial/windows-store-guide/)

    npm install electron-windows-store -g

    electron-windows-store --input-directory <input> --output-directory <output> --flatten true --package-version 1.0.0.0 --package-name <package>
