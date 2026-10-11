class LoginPage {

    constructor(page) {
        this.page = page;
        this.userName = page.locator('[formcontrolname="userEmail"]');
        this.pwd = page.locator('input#userPassword');
        this.signUp = page.locator('input.btn');
    }

    async goto(){
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    }

    async validLogin(userName, pwd) {
        await this.userName.fill(userName)
        await this.pwd.fill(pwd)
        await this.signUp.click();
        await this.page.waitForLoadState('networkidle')
    }

}

module.exports = {LoginPage};