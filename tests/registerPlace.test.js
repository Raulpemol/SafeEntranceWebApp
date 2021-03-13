
describe('The SafeEntrance web application', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:3000/');
    });
  
    it('should be titled "SafeEntrance"', async () => {
      await expect(page.title()).resolves.toMatch('SafeEntrance');
    });

    it('should have a header "Bienvenido a SafeEntrance"', async () => {
        await expect(page).toMatchElement('h1[id="title"]');
    });

    it('should have a form with three inputs and a button', async () => {
        await expect(page).toMatchElement('form[id="formCard"]');
        await expect(page).toMatchElement('input[id="nameField"]');
        await expect(page).toMatchElement('input[id="addressField"]');
        await expect(page).toMatchElement('input[id="capacityField"]');
        await expect(page).toMatchElement('button[id="submitButton"]');
    });
  });