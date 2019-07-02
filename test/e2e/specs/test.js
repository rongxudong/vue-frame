// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
    'default e2e tests': function (browser) {
        // automatically uses dev Server port from /config.index.js
        // default: http://localhost:8080
        // see nightwatch.conf.js
        const devServer = browser.globals.devServerURL

        browser
            .url('http://www.baidu.com')   // 打开地址
            .waitForElementVisible('body', 1000) // 等待界面显示
            .assert.title('百度一下，你就知道') // 断言title为baidu
            .assert.visible('input[id=kw]') // 断言输入框显示
            .setValue('input[id=kw]', 'rembrandt van rijn')  // 设置输入框的值
            .waitForElementVisible('input[type=submit]', 1000) // 等待按钮显示
            .click('input[type=submit]')  // 点击按钮
            .pause(5000) // 暂停等待请求
            .assert.containsText('h3', '伦勃朗·哈尔曼松·凡·莱因_百度百科') // 断言包含字符串
            .end()
    }
}
