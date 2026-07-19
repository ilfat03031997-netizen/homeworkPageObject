export class NewCommentPage {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы
        this.inputDropdownUser = page.locator('div.nav-link.dropdown-toggle.cursor-pointer');
        this.Profile = page.getByText('Profile', { exact: true });
        this.Readmore = page.locator('span').filter({ hasText: 'Read more...' }).first();


        this.writeComment = page.getByRole('textbox', { name: 'Write a comment...' });
        this.PostComment = page.getByRole('button', { name: 'Post Comment' });

        this.getComment = page.getByText('test_comment', { exact: true });
    }

    // Бизнес-сценарии на страничке
    async myAllArticle() {
        await this.inputDropdownUser.click();
        await this.Profile.click();
    }
    async addComment() {
        await this.Readmore.click();
        await this.writeComment.click();
        await this.writeComment.fill('test_comment');
        await this.PostComment.click();
    }

    GetComment() {
        return this.getComment;
    }
}