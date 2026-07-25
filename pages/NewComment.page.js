export class NewCommentPage {
    constructor(page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы
        this.inputDropdownUser = page.locator('div.nav-link.dropdown-toggle.cursor-pointer:visible');
        this.Profile = page.getByText('Profile', { exact: true });
        this.Readmore = page.getByText('Read more...', { exact: true });


        this.writeComment = page.getByPlaceholder('Write a comment...');
        this.PostComment = page.getByRole('button', { name: 'Post Comment' });

        this.getComment = page.locator('p.card-text:visible');
    }

    // Бизнес-сценарии на страничке
    async myAllArticle() {
        await this.inputDropdownUser.click();
        await this.Profile.click();
    }
    async addComment(testComment) {
        const { comment } = testComment;

        await this.Readmore.click();
        await this.writeComment.click();
        await this.writeComment.fill(testComment.comment);
        await this.PostComment.click();
    }
    
    GetComment() {
        return this.getComment;
    }
}