import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RegisterPage, MainPage, YourfeedPage, AuthorizationPage, EditUserPage } from '../pages/realworld.page';


// todo при добавлении нового теста, данные будут использованы те же самые
const URL = 'https://realworld.qa.guru/';
test.describe('Регистрация', () => {
let testUser;

test.beforeEach(async ({ page }) => {
    //создали через фейкер объект юзера
    testUser = {
        username: faker.person.fullName(),
        email: faker.internet.email({ lastName: 'BIN', provider: 'robot.dev' }),
        password: faker.internet.password()
    };
    // Деструктуризация объекта - разбираем объект на переменные
    //const { email, password, username } = testUser;
    const main = new MainPage(page);
    const register = new RegisterPage(page);
    //  Переходим на сайт и регистрируемся
    await main.goto();
    await main.gotoRegister();
    await register.signup(testUser);
});

// тест 1 -  Регистрация пользователя на realworld.qa.guru

test('Пользователь может зарегистрироваться используя email и пароль', async ({ page }) => {
    // вопрос куда выносить)

    //Инициализируем странички
    const main = new MainPage(page);
    const yourfeed = new YourfeedPage(page);


    //временный вариант
    // await expect(yourfeed.profileName).toContainText(username);
    await expect(yourfeed.getProfileName()).toContainText(testUser.username);

    //await yourfeedPage.checkVisible();

    //await expect(page.getByRole('navigation')).toContainText(username);
});



// тест 2 - Авторизация зарегистрированного пользователя

test('Авторизация зарегистрированного пользователя', async ({ page }) => {

    await page.goto(URL);
    //Инициализируем странички
    const main = new MainPage(page);
    const authorization = new AuthorizationPage(page);
    const yourfeed = new YourfeedPage(page);

    await main.gotoAuthorization();
    await authorization.login(testUser);


    await expect(yourfeed.getProfileName()).toContainText(testUser.username);
});

// тест 3 - Автоизованный пользователь может редактировать свои данные

    test('Пользователь может поменять свои данные ', async ({ page }) => {

        await page.goto(URL);
        //Инициализируем странички
        const main = new MainPage(page);
        const authorization = new AuthorizationPage(page);
        const editUser = new EditUserPage(page);

        // 1.авторизация пользователя
        await main.gotoAuthorization();
        await authorization.login(testUser);

        //2.редактирование карточки пользователя
        await editUser.EditSettings();
      

        // Ожидаемый результат
        await expect(editUser.GetBio()).toContainText('test_bio');
    });
});