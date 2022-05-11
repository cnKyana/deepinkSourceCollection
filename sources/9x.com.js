const baseurl = "https://www.9x.com"
/**
 * 搜索
 * @params {string} key
 * @returns {[{name, author, cover, detail}]}
 */
const search = (key) => {
    let response = GET(`${baseurl}/h5/search?word=${encodeURI(key)}`)
    let array = []
    let $ = HTML.parse(response)
    $('.books-list li').forEach((child) => {
        let $ = HTML.parse(child)
        array.push({
            name: $('h3.weui-flex__item').text(),
            author: $('.type span').text(),
            cover: $('img').attr('src'),
            detail: `${baseurl}${$('a').attr('href')}`,
        })
    })
    return JSON.stringify(array)
}

/**
 * 详情
 * @params {string} url
 * @returns {[{summary, status, category, words, update, lastChapter, catalog}]}
 */
const detail = (url) => {
    let response = GET(url, {
        headers: ["User-Agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.92 Safari/537.36"]
    })
    let $ = HTML.parse(response)
    let book = {
        summary: $('meta[property=og:description]').attr("content"),
        catalog: `${baseurl}${$('.chapter a').attr('href')}`,
        category: $(".book-info span:nth-child(1)").text(),
        status: $(".book-info span:nth-child(2)").text()
    }
    return JSON.stringify(book)
}


/**
 * 目录
 * @params {string} url
 * @returns {[{name, url, vip}]}
 */
const catalog = (url) => {
    let response = GET(url, {
        headers: ["User-Agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.92 Safari/537.36"]
    })
    let $ = HTML.parse(response)
    let array = []
    $('.child-title li').forEach((booklet) => {
        let $ = HTML.parse(booklet)
        array.push({
            name: $("a").text(),
            url: `${baseurl}${$('a').attr('href')}`,
            vip: false
        })
    })
    return JSON.stringify(array)
}


/**
 * 章节
 * @params {string} url
 * @returns {string}
 */
const chapter = (url) => {
    let response = GET(url)
    let $ = HTML.parse(response)
    return $(".weui_article")
}

var bookSource = JSON.stringify({
    name: "笔趣阁9x",
    url: "www.9x.com",
    version: 100
})