Feature('Home');

Scenario('메인 페이지를 확인한다.', ({ I }) => {
  I.amOnPage('/');

  I.see('Oh My Baking Recipe');
});
