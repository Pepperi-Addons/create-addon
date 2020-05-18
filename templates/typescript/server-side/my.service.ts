class MyService {
    constructor(private client: any) {
    }

    doSomething() {
        console.log("doesn't really do anything....");
    }

    getAddons() {
       
        const headers = { authorization: 'Bearer ' + this.client.OAuthAccessToken }
        const options = {
            uri: this.client.BaseURL+ '/addons/installed_addons',
            method: 'GET',
            headers: headers,
            json: true
        }
        return this.client.Module.rp(options)
    }
}

export default MyService;