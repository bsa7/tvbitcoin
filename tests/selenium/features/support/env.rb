# encoding: utf-8

require 'awesome_print'
require 'capybara'
require 'cucumber'
require 'capybara/cucumber'
require 'rspec'

require_relative '../../features/page_objects/main_page.rb'

capybara_settings = YAML.load(File.read('./capybara.yml'))
webdriver_settings = capybara_settings['webdriver_settings']
webdriver_settings.keys.each do |key|
  value = webdriver_settings[key]
  webdriver_settings[key.to_sym] = value
  webdriver_settings.delete(key)
end

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, webdriver_settings)
end

Capybara.default_driver = :selenium
Capybara.default_max_wait_time = 10
Capybara.app_host = capybara_settings['app_host']

RSpec.configure do |config|
  config.expect_with :rspec do |c|
    c.syntax = :expect
  end
end

# Create a directory for storing reports
reports_dir_path = './reports'
if !Dir.exist?(reports_dir_path)
  Dir.mkdir(reports_dir_path, 0777)
  puts "Directory is created at #{reports_dir_path}"
else
  puts "Directory is exist at #{reports_dir_path}"
end

# Create a directory for storing screenshots
screenshots_dir_path = './reports/screenshots'
if !Dir.exist?(screenshots_dir_path)
  Dir.mkdir(screenshots_dir_path, 0777)
  puts "Directory is created at #{screenshots_dir_path}"
else
  puts "Directory is exist at #{screenshots_dir_path}"
end

Before do
  Capybara.page.current_window.resize_to(1800, 1020)
  Capybara.visit("/")
end

# Run after each scenario
After do |scenario|
  # Check, scenario is failed?
  if(scenario.failed?)
    time = Time.now.strftime('%Y_%m_%d_%Y_%H_%M_%S_')
    name_of_scenario = time + scenario.name.gsub(/\s+/, "_").gsub("/","_")
    puts "Name of screenshot is #{name_of_scenario}"
    file_path = File.expand_path(screenshots_dir_path)+'/'+name_of_scenario +'.png'
    page.driver.browser.save_screenshot file_path
    puts 'Screenshot is taken'
    puts "Scenario:: #{scenario.name}"
  end
end
