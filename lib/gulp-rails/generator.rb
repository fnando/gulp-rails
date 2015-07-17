module GulpRails
  class Generator < Thor::Group
    attr_accessor :settings

    include Thor::Actions
    desc 'Prepare Rails project with Gulp'

    def self.source_root
      File.expand_path('../../../templates', __FILE__)
    end

    def create_testem_config_file
     template 'testem.json.erb', 'testem.json'
    end

    def create_jshintrc
      copy_file 'jshintrc.json', '.jshintrc'
    end

    def copy_gulpfile
      copy_file 'Gulpfile.js', 'Gulpfile.js'
    end

    def copy_package
      template 'package.json.erb', 'package.json'
    end

    def copy_helper
      copy_file 'asset_rev_helper.rb', 'app/helpers/asset_rev_helper.rb'
    end

    def copy_frontend_directory
      directory 'frontend', 'app/frontend', recursive: true
    end

    def copy_test_directory
      directory settings.test_dirname, "#{settings.test_dirname}/javascript", recursive: true
    end

    def copy_gulp_tasks
      directory 'gulp', 'gulp', recursive: true
      copy_file "gulp_#{settings.test_dirname}_task.js", "gulp/tasks/#{settings.test_dirname}.js"
      template 'gulp_watch_task.js.erb', 'gulp/tasks/watch.js'
      template 'gulp_default_task.js.erb', 'gulp/tasks/default.js'
      template 'gulp_config.js.erb', 'gulp/config.js'
      other_test_task_file = (Settings::TEST_DIRNAME.values - [settings.test_dirname]).first
      remove_file File.join('gulp/tasks', "#{other_test_task_file}.js")
    end

    def append_to_gitignore
      append_to_file '.gitignore' do
        %w[
          /node_modules
          /app/frontend/scripts/templates
          /public/images
          /public/javascripts
          /public/stylesheets
          /public/rev-manifest.json
          /public/sm-*
        ].join("\n")
      end
    end

    def install_npm_packages
      in_root do
        run 'npm install --save-dev'
        run 'npm prune'
      end
    end
  end
end
