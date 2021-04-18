describe('The SafeEntrance web application', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:3000/');
    });

    it('should be titled "SafeEntrance', async () => {
      await expect(page.title()).resolves.toMatch('SafeEntrance');
    });

    it('should have a header "Bienvenido a SafeEntrance', async () => {
        await expect(page).toMatchElement('h1[id="title"]');
    });

    it('should have a button to go to the register places page', async () => {
      await expect(page).toMatchElement('button[id="registerNavButton"]');
    });

    it('should have a form with three inputs and a button', async () => {
        await expect(page).toMatchElement('form[id="formCard"]');
        await expect(page).toMatchElement('input[id="nameField"]');
        await expect(page).toMatchElement('input[id="addressField"]');
        await expect(page).toMatchElement('input[id="capacityField"]');
        await expect(page).toMatchElement('button[id="submitButton"]');
    });
  });

describe('The form fields', () => {
    it('should be marked as invalid when empty', async () => {
        await expect(page).toClick('button', { id: 'submitButton' })
        await expect(page).toMatchElement('input[id="nameField"][aria-invalid="true"]');
        await expect(page).toMatchElement('input[id="addressField"][aria-invalid="true"]');
        await expect(page).toMatchElement('input[id="capacityField"][aria-invalid="true"]');
    });
});

describe('The input field for the name', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:3000/');
    });

    it('should not be marked as invalid when filled', async () => {
      await expect(page).toFill(
        'input[id="nameField"]',
        "Local de Prueba"
      );
      await expect(page).toClick('button', { id: 'submitButton' });
      await expect(page).toMatchElement('input[id="nameField"][aria-invalid="false"]');
      await expect(page).toMatchElement('input[id="addressField"][aria-invalid="true"]');
      await expect(page).toMatchElement('input[id="capacityField"][aria-invalid="true"]');
    });
});

describe('The input field for the address', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:3000/');
    });

    it('should not be marked as invalid when filled', async () => {
      await expect(page).toFill(
        'input[id="addressField"]',
        "c/Dirección de prueba, Nº8"
      );
      await expect(page).toClick('button', { id: 'submitButton' });
      await expect(page).toMatchElement('input[id="nameField"][aria-invalid="true"]');
      await expect(page).toMatchElement('input[id="addressField"][aria-invalid="false"]');
      await expect(page).toMatchElement('input[id="capacityField"][aria-invalid="true"]');
    });
});

describe('The input field for the capacity', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/');
  });

  it('should not be marked as invalid when filled', async () => {
    await expect(page).toFill(
      'input[id="capacityField"]',
      "1"
    );
    await expect(page).toClick('button', { id: 'submitButton' });
    await expect(page).toMatchElement('input[id="nameField"][aria-invalid="true"]');
    await expect(page).toMatchElement('input[id="addressField"][aria-invalid="true"]');
    await expect(page).toMatchElement('input[id="capacityField"][aria-invalid="false"]');
  });
});

describe('Duplicated places', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/');
  });

  it('should not be registered', async () => {
    await expect(page).toFill(
      'input[id="nameField"]',
      "Local de Prueba"
    );
    await expect(page).toFill(
        'input[id="addressField"]',
        "c/Dirección de prueba, Nº8"
    );
    await expect(page).toFill(
        'input[id="capacityField"]',
        "1"
    );
    await expect(page).toClick('button', { id: 'submitButton' });
    await expect(page).toMatchElement('input[id="nameField"][aria-invalid="false"]');
    await expect(page).toMatchElement('input[id="addressField"][aria-invalid="true"]');
    await expect(page).toMatchElement('input[id="capacityField"][aria-invalid="false"]');
  });
  it('a warning should be shown', async () => {
    await expect(page).toMatchElement('div[id="duplicatedPlaceAlert"]');
  });
});