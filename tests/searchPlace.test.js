describe('The SafeEntrance web application', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:3000/');
    });

    it('should have a nav menu', async () => {
      await expect(page).toMatchElement('div[role="tablist"]');
    });

    it('should have a button to go to the search places page', async () => {
        await expect(page).toMatchElement('button[id="searchNavButton"]');
    });
});