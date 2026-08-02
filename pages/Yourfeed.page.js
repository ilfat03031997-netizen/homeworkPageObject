// todo
const URL = 'https://realworld.qa.guru/';
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
