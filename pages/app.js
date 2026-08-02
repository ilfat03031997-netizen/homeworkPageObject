import { AuthorizationPage, EditArticlePage, EditUserPage, LikeArticlePage, MainPage, newArticlePage, NewCommentPage, PostArticlePage, RegisterPage, YourfeedPage } from './index'

//Фасад

export class App {
    constructor(page)
    { 
        this.page = page,
        this.main = MainPage(page);
        this.register = RegisterPage(page);
        this.yourfeedpage = YourfeedPage(page); 
    }
  
}