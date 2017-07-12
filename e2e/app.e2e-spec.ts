import { GiparPage } from './app.po';

describe('gipar App', () => {
  let page: GiparPage;

  beforeEach(() => {
    page = new GiparPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
