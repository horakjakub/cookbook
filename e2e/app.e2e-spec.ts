import { AngularCookbookPage } from './app.po';

describe('angular-cookbook App', () => {
  let page: AngularCookbookPage;

  beforeEach(() => {
    page = new AngularCookbookPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
