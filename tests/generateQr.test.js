describe('The SafeEntrance web application', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:3000/');
    });

    it('should show a QR after filling the form correctly', async () => {
        await expect(page).toFill(
            'input[id="nameField"]',
            "Local de Prueba"
        );
        await expect(page).toFill(
            'input[id="addressField"]',
            "c/Dirección de prueba, Nº8"+Math.random()
        );
        await expect(page).toFill(
            'input[id="capacityField"]',
            "1"
        );

        await expect(page).toClick('button', { id: 'submitButton' });

        await page.waitForNavigation();
        
        await expect(page).toMatchElement('canvas[id="qr"]');
        await expect(page).toMatchElement('button[id="goBackButton"]');
        await expect(page).toMatchElement('button[id="downloadButton"]');
    });

    it('should not generate a QR if the URL parameter is incorrect', async () => {
        await page.goto('http://localhost:3000/generated_qr/wrongplace');

        await expect(page).not.toMatchElement('canvas[id="qr"]');
        await expect(page).toMatchElement('p[id="messageWrongPlace"]');
    });

    it('should have a back button to navigate to the form', async () => {
        await expect(page).toClick('button', { id: 'goBackButton' });
        await expect(page).toMatchElement('form[id="formCard"]');
    });
});