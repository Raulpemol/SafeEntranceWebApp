describe('The SafeEntrance web application', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:3000/login');
    });

    it('should show a form to log in', async () => {
        await expect(page).toMatchElement('input[id="usernameField"]');
        await expect(page).toMatchElement('input[id="passwordField"]');
        await expect(page).toMatchElement('button[id="submitButton"]');
    });

});

describe('The login form', () => {
    test('should not allow login with empty fields', async (done) => {
        await expect(page).toClick('button', { id: 'submitButton' });
        setTimeout(async function () {
            await expect(page).toMatchElement('input[id="usernameField"][aria-invalid="true"]');
            await expect(page).toMatchElement('input[id="passwordField"][aria-invalid="true"]');
            await expect(page).toMatchElement('div[id="errorAlert"]');
            done();
        }, 3000);
    }, 10000);

    test('should not allow login with wrong username', async (done) => {
        await expect(page).toFill(
        'input[id="usernameField"]',
        "admin"
        );
        await expect(page).toFill(
            'input[id="passwordField"]',
            "#g9ads765gAhGY4sHIDSfsFSt6564#"
        );

        await expect(page).toClick('button', { id: 'submitButton' });
        setTimeout(async function () {
            await expect(page).toMatchElement('input[id="usernameField"][aria-invalid="true"]');
            await expect(page).toMatchElement('input[id="passwordField"][aria-invalid="true"]');
            await expect(page).toMatchElement('div[id="errorAlert"]');
            done();
        }, 3000);
    }, 10000);

    test('should not allow login with wrong password', async (done) => {
        await expect(page).toFill(
        'input[id="usernameField"]',
        "administrador"
        );
        await expect(page).toFill(
            'input[id="passwordField"]',
            "#g9ads765gAhGY4sHIDSfsFSt6564"
        );

        await expect(page).toClick('button', { id: 'submitButton' });
        setTimeout(async function () {
            await expect(page).toMatchElement('input[id="usernameField"][aria-invalid="true"]');
            await expect(page).toMatchElement('input[id="passwordField"][aria-invalid="true"]');
            await expect(page).toMatchElement('div[id="errorAlert"]');
            done();
        }, 3000);
    }, 10000);

    test('should allow to log in with the right credentials', async (done) => {
        await expect(page).toFill(
        'input[id="usernameField"]',
        "administrador"
        );
        await expect(page).toFill(
            'input[id="passwordField"]',
            "#g9ads765gAhGY4sHIDSfsFSt6564#"
        );

        await expect(page).toClick('button', { id: 'submitButton' });
        setTimeout(async function () {
            await expect(page).toMatchElement('h2[id="subtitlePanel"]');
            done();
        }, 3000);
    }, 10000);
});

describe('The admin panel', () => {
    test('should allow to modify the "Infection Days Before PCR" variable', async (done) => {
        await expect(page).toFill(
            'input[id="idbpField"]',
            "2"
        );

        await expect(page).toClick('button', { id: 'saveIdbp' });
        setTimeout(async function () {
            await expect(page).toMatchElement('div[id="messageAlert"]');
            done();
        }, 3000);
    }, 10000);
});