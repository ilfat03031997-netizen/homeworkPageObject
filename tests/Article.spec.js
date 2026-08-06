import { test, expect } from '@playwright/test';
import { ArticleBuilder } from '../src/helpers/builders/article';
import { UserBuilder } from '../src/helpers/builders/user';
import { CommentBuilder } from '../src/helpers/builders/comment';
import { EditArticleBuilder } from '../src/helpers/builders/editArticle';
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





const URL = 'https://realworld.qa.guru/';


// группировка(suite) тестов
test.describe('Авторизация', () => {
    let testUser;
    let testArticle;
    let testComment
    let EditArt


    // Предусловие
    test.beforeEach(async ({ page }) => {
        //создаем объект юзера
        testUser = new UserBuilder().withEmail().withPassword().withUsername().build();
        //генерируем поля для статьи
        testArticle = new ArticleBuilder().ArTitle().ArticleAbout().YourArticle().Entertags().build();
        //генерируем поле для коммента
        testComment = new CommentBuilder().Testcomment().build();
        //генерируем поле для редактирования статьи
        EditArt = new EditArticleBuilder().EdArticle().build();


        //Инициализируем странички
        const main = new MainPage(page);
        const register = new RegisterPage(page);
        //  Переходим на сайт и регистрируемся
        await main.goto();
        await main.gotoRegister();
        await register.signup(testUser);
    });




    // тест 1 - Создание новой статьи
    test('Авторизованный пользователь может создать статью', async ({ page }) => {

        await page.goto(URL);
        //Инициализируем странички
        const main = new MainPage(page);
        const NewArticle = new newArticlePage(page);
        const newPostArticle = new PostArticlePage(page);
        const authorization = new AuthorizationPage(page);

        //1.Авторизация пользователя
        await main.gotoAuthorization();
        await authorization.login(testUser);

        //2.Создание статьи
        await NewArticle.clickNewArticle()
        await NewArticle.newArticlewrite(testArticle);

        // Ожидаемый результат
        await expect(newPostArticle.getInputComment()).toContainText(testArticle.title);
    });




    //тест 2 - Добавление комента к созданным статьям
    test('Авторизованный пользователь может добавить комент к созданным статьям', async ({ page }) => {

        await page.goto(URL);
        //Инициализируем странички
        const main = new MainPage(page);
        const authorization = new AuthorizationPage(page);
        const NewArticle = new newArticlePage(page);
        const newComment = new NewCommentPage(page);

        //1.Авторизация пользователя
        await main.gotoAuthorization();
        await authorization.login(testUser);

        //2.Создание статьи
        await NewArticle.clickNewArticle()
        await NewArticle.newArticlewrite(testArticle);
        //3.Коментарий к новой статье
        await newComment.myAllArticle();
        await newComment.addComment(testComment);


        // Ожидаемый результат
        await expect(newComment.GetComment()).toContainText(testComment.comment);
    });

    //тест 3 - Поставить лайк новой статье
    test('Авторизованный пользователь может поставить лайк к созданным статьям', async ({ page }) => {

        await page.goto(URL);
        //Инициализируем странички
        const main = new MainPage(page);
        const authorization = new AuthorizationPage(page);

        const newPostArticle = new PostArticlePage(page);
        const NewArticle = new newArticlePage(page);
        const newComment = new NewCommentPage(page);
        const newLike = new LikeArticlePage(page);

        //1.Авторизация пользователя
        await main.gotoAuthorization();
        await authorization.login(testUser);

        //2.Создание статьи
        await NewArticle.clickNewArticle()
        await NewArticle.newArticlewrite(testArticle);
        await expect(newPostArticle.getInputComment()).toContainText(testArticle.title);

        //3.Перейти ко всем статьям
        await newComment.myAllArticle();
        //4.Поставить лайк статье
        await newLike.addLike();


        // Ожидаемый результат
        await expect(newLike.GetLike()).not.toContainText('0');
    });


    //тест 4 - редактирование статьи
    test('Авторизованный пользователь может редактировать статью', async ({ page }) => {

        await page.goto(URL);
        //Инициализируем странички
        const main = new MainPage(page);
        const authorization = new AuthorizationPage(page);

        const newPostArticle = new PostArticlePage(page);
        const NewArticle = new newArticlePage(page);
        const newComment = new NewCommentPage(page);

        const editArticle = new EditArticlePage(page);

        //1.Авторизация пользователя
        await main.gotoAuthorization();
        await authorization.login(testUser);

        //2.Создание статьи
        await NewArticle.clickNewArticle()
        await NewArticle.newArticlewrite(testArticle);
        await expect(newPostArticle.getInputComment()).toContainText(testArticle.title);


        //3.Редактирование статьи
        await newComment.myAllArticle();
        await editArticle.EditArticle(EditArt);



        // Ожидаемый результат
        await expect(editArticle.GetArticleE()).toContainText(EditArt.EditArticle);
    });
});
