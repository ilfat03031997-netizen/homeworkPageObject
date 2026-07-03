// todo
const URL = 'https://realworld.qa.guru/';

export class MainPage {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы
        this.signupButton = page.getByRole('link', { name: 'Sign up' });
        this.loginButton = page.getByRole('link', { name: 'Login' });
    }

    // Бизнес-сценарии на страничке
    async goto() {
        await this.page.goto(URL);
    }
    async gotoRegister() {
        await this.signupButton.click();
    }
    async gotoAuthorization() {
        await this.loginButton.click();
    }

}

export class RegisterPage {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы

        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.yournameInput = page.getByRole('textbox', { name: 'Your Name' });

        this.signupButton = page.getByRole('button', { name: 'Sign up' });

    }

    // Бизнес-сценарии на страничке
    async signup(user)
    // ({email, password, username})
    {
        // Деструктуризация объекта - разбираем объект на переменные
        const { email, password, username } = user;

        await this.yournameInput.click();
        await this.yournameInput.fill(username);
        await this.emailInput.click();
        await this.emailInput.fill(email);
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.signupButton.click();
    }
}


export class YourfeedPage {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы
        this.profileName = page.getByRole('navigation');
    }

    // Бизнес-сценарии на страничке

    getProfileName() {
        return this.profileName;
    }
}




export class AuthorizationPage {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы

        this.emailinputA = page.getByRole('textbox', { name: 'Email' });
        this.passwordinputA = page.getByRole('textbox', { name: 'Password' });
      

        this.LoginButton = page.getByRole('button', { name: 'Login' });

    }

    // Бизнес-сценарии на страничке
    async login(user)
    // ({email, password, username})
    {
        // Деструктуризация объекта - разбираем объект на переменные
        const { email, password, username } = user;

        await this.emailinputA.click();
        await this.emailinputA.fill(email);
        await this.passwordinputA.click();
        await this.passwordinputA.fill(password);
        await this.LoginButton.click();
    }
}


export class EditUserPage {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы

        this.UserDropdown = page.locator('div.nav-link.dropdown-toggle.cursor-pointer'); 
        this.SettingsBut = page.getByText('Settings', { exact: true });
        this.Shortbio = page.getByRole('textbox', { name: 'Short bio about you' });
        this.UpdateSettingsB = page.getByRole('button', { name: 'Update Settings' });
    }

    // Бизнес-сценарии на страничке
    async EditSettings()
    // ({email, password, username})
    {
        await this.UserDropdown.click();
        await this.SettingsBut.click();
        await this.Shortbio.click();
        await this.Shortbio.fill('test_bio');
        await this.UpdateSettingsB.click();    
    }

    GetBio() {
        return this.Shortbio;
    }

}


export class newArticle {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы
        this.ArticleNew = page.getByRole('link', { name: 'New Article' });
        this.ArticleTitleinp = page.getByRole('textbox', { name: 'Article Title' });
        this.WhatisArtAboutinp = page.getByRole('textbox', { name: /What's this article about\?/i });
        this.ArticleYourinput = page.getByRole('textbox', { name: 'Write your article (in markdown)' });
        this.EnterTagsinput = page.getByRole('textbox', { name: 'Enter tags' });
        this.PublishBut = page.getByText('Publish Article', { exact: true });

    }
        // Бизнес-сценарии на страничке
    async newArticlewrite(testArticle)
        {
        const { title, about, YourArticle, tags } = testArticle;

            await this.ArticleNew.click();
            await this.ArticleTitleinp.click();
            await this.ArticleTitleinp.fill(title);
            await this.WhatisArtAboutinp.click();
            await this.WhatisArtAboutinp.fill(about);
            await this.ArticleYourinput.click();
            await this.ArticleYourinput.fill(YourArticle);
            await this.EnterTagsinput.click();
            await this.EnterTagsinput.fill(tags);

            await this.PublishBut.click();
        }
}
export class PostArticle {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы
        this.inputWriteCommentArt = page.getByRole('button', { name: 'Post Comment' });
    }

    // Бизнес-сценарии на страничке

    getInputComment() {
        return this.inputWriteCommentArt;
    }
}


export class NewComment {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы
        this.inputDropdownUser = page.locator('div.nav-link.dropdown-toggle.cursor-pointer');
        this.Profile = page.getByText('Profile', { exact: true });
        this.Readmore = page.getByRole('heading');
        

        this.writeComment = page.getByRole('textbox', { name: 'Write a comment...' });
        this.PostComment = page.getByRole('button', { name: 'Post Comment' });

        this.getComment = page.locator('p.card-text');
    }

    // Бизнес-сценарии на страничке
    async myAllArticle() {
        await this.inputDropdownUser.click();
        await this.Profile.click();
    }
    async addComment() {
        await this.Readmore.click();
        await this.writeComment.first().click();
        await this.writeComment.fill('test_comment');
        await this.PostComment.click();
    }

    GetComment() {
        return this.getComment;
    }
}

export class LikeArticle {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы
        this.buttonLike = page.getByText('( 0 )', { exact: true });
        

        this.getLike = page.getByText('( 1 )', { exact: true });
    }

    // Бизнес-сценарии на страничке
    async addLike() {
        await this.buttonLike.first().click();
    }

    GetLike() {
        return this.getLike;
    }
}

export class EditArticle {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы
        this.ArticleFirst = page.locator('p:visible');

        this.ButtonEdit = page.getByRole('link', { name: 'Edit Article' });

        this.EditArt = page.getByRole('textbox', { name: 'Write your article (in markdown)' });

        this.buttonUpdate = page.getByRole('button', { name: 'Update Article' });

        this.GetArticleEdit = page.getByText('test123', { exact: true });
    }

    // Бизнес-сценарии на страничке
    async EditArticle() {
        await this.ArticleFirst.click();
        await this.ButtonEdit.first().click();

        await this.EditArt.click();
        await this.EditArt.fill('test123');

        await this.buttonUpdate.click();
        
    }

    GetArticleE() {
        return this.GetArticleEdit;
    }
}
