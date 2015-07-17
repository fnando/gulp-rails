module GulpRails
  class CLI < Thor
    map %w[-v --version] => :version

    desc 'install PATH', 'Install Gulp files'
    option 'test_framework', required: true, default: 'qunit', aliases: '-t'
    def install(path = Dir.pwd)
      validate_test_framework!

      generator = Generator.new
      generator.destination_root = File.expand_path(path)
      generator.options = options
      generator.settings = Settings.new(options)
      generator.invoke_all
    end

    desc 'version', 'Display version'
    def version
      say VERSION
    end

    private
    def validate_test_framework!
      raise Error.new, 'invalid test framework. Can be qunit or jasmine' unless %w[qunit jasmine].include?(options['test_framework'])
    end
  end
end
