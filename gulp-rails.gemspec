require './lib/gulp-rails/version'

Gem::Specification.new do |spec|
  spec.name          = 'gulp-rails'
  spec.version       = GulpRails::VERSION
  spec.authors       = ['Nando Vieira']
  spec.email         = ['fnando.vieira@gmail.com']
  spec.summary       = 'Set up Rails with Gulp for asset pipeline.'
  spec.description   = spec.summary
  spec.homepage      = 'https://github.com/fnando/gulp-rails'
  spec.license       = 'MIT'
  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.bindir        = 'exe'
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ['lib']

  spec.add_development_dependency 'thor'
  spec.add_development_dependency 'bundler', '~> 1.10'
  spec.add_development_dependency 'rake', '~> 10.0'
end
