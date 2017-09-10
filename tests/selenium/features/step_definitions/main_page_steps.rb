# encoding: utf-8

Допустим(/^Пользователь открывает главную страницу Invent Realty$/) do
  main_page = MainPage.new
  main_page.visit_main_page
end
