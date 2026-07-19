export class EditArticlePage {
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
