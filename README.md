# gulp-rails

Want to use Gulp on your Rails application? Here's some sample configuration.

It includes:

- JavaScript transpiling with Babel.js (with Browserify for ES6 module support)
- Stylesheet generation using Sass
- Assets with cache bursting for production
- Template compilation using Handlebars
- ES6 linting with JSHint
- Tests using QUnit and Phantom.js
- Tests using testem

All tasks are available at `./gulp/tasks/*`.

## Installation

Install the gem:

    $ gem install gulp-rails

## Usage

Then from your project's root directory:

    $ gulp-rails install               # default to qunit
    $ gulp-rails install -t qunit
    $ gulp-rails install -t jasmine
    $ gulp-rails install /some/other/path

### Running Gulp

You can start the `watch` script for development:

```
$ npm run-script watch
```

When you're ready to deploy, run the `build` script. This will generate the minified version with cache burst.

```
$ npm run-script build
```

### Tests

Browserify requires you load each and every file in order to create the module structure. This is handled by the `(tests|specs)-manifest` task, which will create a file at `./tmp/(tests|specs)-loader.js`.

Then we compile this file using our JavaScript pipeline; the generated file will be available at `./tmp/(tests|specs).js`. This file is loaded by the test runner.

To see sourcemaps when running tests, you must start a local server. You can execute something like:

- `python -m SimpleHTTPServer`
- `php -S localhost:8000`
- `ruby -run -e httpd . -p 8000`

The you can visit <http://localhost:8000/test/javascript/test_runner.html> (QUnit) or <http://localhost:8000/spec/javascript/spec_runner.html> (Jasmine).

If you want to use [testem](https://github.com/airportyh/testem), just run `npm run-script testem`.

### Bundle files

You can have as many bundles as you need; just create root files at `app/frontend/styles/` and `app/frontend/scripts`. By default, this setup comes with `app/frontend/styles/application.scss` and `app/frontend/scripts/application.js`.

### Rails helpers

For asset cache bursting to work, you'll have to copy the helper methods available at `app/helpers/application_helper.rb`.

This file will replace the `path_to_asset` method, which is used by all methods that require an asset path. I'm using the `gulp-rev` package creating the manifest, instead of using the one created by asset pipeline.

Talking about asset pipeline... you don't have to disable it, and I honestly don't encourage you to do so because you may have engines that need this feature.

### Source Maps

You don't want to expose your sourcemaps in production, but you may want to allow having this for an exception tracking service like [Rollbar](http://rollbar.com). We generate a name like `sm-<uuid>`, but you can change the `sourcemapsOutput` option at `./gulp/config.js` to whatever you want.

## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake test` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment. Run `bundle exec gulp-rails` to use the gem in this directory, ignoring other installed copies of this gem.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/fnando/gulp-rails. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

