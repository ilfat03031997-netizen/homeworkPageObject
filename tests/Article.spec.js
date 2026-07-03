import { test, expect } from '@playwright/test';
import { ArticleBuilder } from '../src/helpers/builders/article';
import { faker } from '@faker-js/faker';
import { RegisterPage, MainPage, YourfeedPage, AuthorizationPage, newArticle, PostArticle, NewComment, LikeArticle, EditArticle } from '../pages/realworld.page';


const URL = 'https://realworld.qa.guru/';
test.describe('Авторизация', () => {
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

    // тест 1 - Создание новой статьи
    test('Авторизованный пользователь может создать статью', async ({ page }) => {
        //генерируем поля для статьи
        let testArticle = new ArticleBuilder().ArTitle().ArticleAbout().YourArticle().Entertags().build();

        await page.goto(URL);
        //Инициализируем странички
        const main = new MainPage(page);
        const NewArticle = new newArticle(page);
        const newPostArticle = new PostArticle(page);
        const authorization = new AuthorizationPage(page);

        //1.Авторизация пользователя
        await main.gotoAuthorization();
        await authorization.login(testUser);

        //2.Создание статьи
        await NewArticle.newArticlewrite(testArticle);


        await expect(newPostArticle.getInputComment()).toContainText('Post Comment');
    });

    //тест 2 - Добавление комента к созданным статьям
    test('Авторизованный может добавить комент к созданным статьям', async ({ page }) => {

        //генерируем поля для статьи
        let testArticle = new ArticleBuilder().ArTitle().ArticleAbout().YourArticle().Entertags().build();
        await page.goto(URL);
        //Инициализируем странички
        const main = new MainPage(page);
        const authorization = new AuthorizationPage(page);
        const NewArticle = new newArticle(page);
        const newComment = new NewComment(page);

        //1.Авторизация пользователя
        await main.gotoAuthorization();
        await authorization.login(testUser);

        //2.Создание статьи
        await NewArticle.newArticlewrite(testArticle);
        //3.Коментарий к новой статье
        await newComment.myAllArticle();
        await newComment.addComment();


        await expect(newComment.GetComment()).not.toBeEmpty();
    });

    //тест 3 - Поставить лайк новой статье
    test('Авторизованный может поставить лайк к созданным статьям', async ({ page }) => {

        //генерируем поля для статьи
        let testArticle = new ArticleBuilder().ArTitle().ArticleAbout().YourArticle().Entertags().build();
        await page.goto(URL);
        //Инициализируем странички
        const main = new MainPage(page);
        const authorization = new AuthorizationPage(page);

        const newPostArticle = new PostArticle(page);
        const NewArticle = new newArticle(page);
        const newComment = new NewComment(page);
        const newLike = new LikeArticle(page);

        //1.Авторизация пользователя
        await main.gotoAuthorization();
        await authorization.login(testUser);

        //2.Создание статьи
        await NewArticle.newArticlewrite(testArticle);
        await expect(newPostArticle.getInputComment()).toContainText('Post Comment');

        //3.Перейти ко всем статьям
        await newComment.myAllArticle();
        //4.Поставить лайк статье
        await newLike.addLike();



        await expect(newLike.GetLike()).toContainText('1');
    });


//тест 4 - редактирование статьи
test('Авторизованный может редактировать статью', async ({ page }) => {

    //генерируем поля для статьи
    let testArticle = new ArticleBuilder().ArTitle().ArticleAbout().YourArticle().Entertags().build();
    await page.goto(URL);
    //Инициализируем странички
    const main = new MainPage(page);
    const authorization = new AuthorizationPage(page);

    const newPostArticle = new PostArticle(page);
    const NewArticle = new newArticle(page);
    const newComment = new NewComment(page);

    const editArticle = new EditArticle(page);

    //1.Авторизация пользователя
    await main.gotoAuthorization();
    await authorization.login(testUser);

    //2.Создание статьи
    await NewArticle.newArticlewrite(testArticle);
    await expect(newPostArticle.getInputComment()).toContainText('Post Comment');

   
    //3.Редактирование статьи
    await newComment.myAllArticle();
    await editArticle.EditArticle();
    



    await expect(editArticle.GetArticleE()).toContainText('test123');
});
});