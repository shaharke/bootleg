# Bootleg

[![Build Status](https://travis-ci.org/shaharke/bootleg.svg?branch=develop)](https://travis-ci.org/shaharke/bootleg)


Bootleg is an extensible initialization layer for [Node.js](http://nodejs.org/)
applications that has been heavily inspired by [Bootable](https://github.com/jaredhanson/bootable).

Bootleg allows initialization *phases* to be registered for an application.
These phases will be executed sequentially during startup, after which the
application will be ready to run.

The main difference between Bootleg and Bootable is that Bootleg works with promises to evaluate
the execution of phases.


## Install

    $ npm install bootleg

## Usage

_TBD_

## Tests

    $ npm install
    $ npm test

## Credits

  - [Shahar Kedar](http://github.com/shaharke)
  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2013 Jared Hanson
