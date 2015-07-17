module GulpRails
  class Settings
    attr_reader :test_framework

    TEST_DIRNAME = {
      'qunit' => 'test',
      'jasmine' => 'spec'
    }

    def initialize(options = {})
      options.each do |key, value|
        instance_variable_set "@#{key}", value
      end
    end

    def qunit?
      test_framework == 'qunit'
    end

    def test_dirname
      TEST_DIRNAME[test_framework]
    end

    def testem_page
      File.join(test_dirname, 'javascript', "#{test_dirname}_runner.html")
    end
  end
end
