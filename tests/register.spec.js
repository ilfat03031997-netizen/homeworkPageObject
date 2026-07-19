import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RegisterPage } from '../pages/Register.page';
import { MainPage } from '../pages/Main.page';
import { YourfeedPage } from '../pages/Yourfeed.page';
import { AuthorizationPage } from '../pages/Authorization.page';
import { EditUserPage } from '../pages/EditUser.page';
import { newArticlePage } from '../pages/newArticle.page';
import { PostArticlePage } from '../pages/PostArticle.page';
import { NewCommentPage } from '../pages/NewComment.page';
import { LikeArticlePage } from '../pages/LikeArticle.page';
import { EditArticlePage } from '../pages/EditArticle.page';
import { UserBuilder } from '../src/helpers/builders/user';




const URL = 'https://realworld.qa.guru/';

// группировка(suite) тестов
test.describe('Регистрация', () => {
    let testUser;


    // Предусловие 
    test.beforeEach(async ({ page }) => {
        // Генерируем тестового пользователя
        testUser = new UserBuilder().withEmail().withPassword().withUsername().build();

        //Инициализируем странички
        const main = new MainPage(page);
        const register = new RegisterPage(page);

        //  Переходим на сайт и регистрируемся
        await main.goto();
        await main.gotoRegister();
        await register.signup(testUser);
        
    });




    // тест 1 -  Регистрация пользователя на realworld.qa.guru

    test('Пользователь может зарегистрироваться используя email и пароль', async ({ page }) => {
      
       
        //Инициализируем странички
        const main = new MainPage(page);
        const yourfeed = new YourfeedPage(page);

        

        // Ожидаемый результат
        await expect(yourfeed.getProfileName()).toContainText(testUser.username);

      
    });



    // тест 2 - Авторизация зарегистрированного пользователя

    test('Авторизация зарегистрированного пользователя', async ({ page }) => {
        
        await page.goto(URL);
        //Инициализируем странички
        const main = new MainPage(page);
        const authorization = new AuthorizationPage(page);
        const yourfeed = new YourfeedPage(page);


        //Авторизация пользователя
        await main.gotoAuthorization();
        await authorization.login(testUser);

        // Ожидаемый результат
        await expect(yourfeed.getProfileName()).toContainText(testUser.username);
    });

    // тест 3 - Автоизованный пользователь может редактировать свои данные

    test('Пользователь может редактировать свои данные ', async ({ page }) => {
        
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