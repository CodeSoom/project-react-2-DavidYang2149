Feature('NotFound');

Scenario('존재하지 않는 페이지를 확인합니다.', ({ I }) => {
  I.amOnPage('/wrongPage');

  I.see('Recipe is Not Found!');
});
