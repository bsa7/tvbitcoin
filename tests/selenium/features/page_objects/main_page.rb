# encoding: utf-8

# Main page URL - http://stage.invent-realty.ru/
class MainPage
  def visit_main_page
    Capybara.visit("/")
  end
end
