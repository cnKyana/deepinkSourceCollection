/**
 * 搜索
 * @params {string} key
 * @returns {[{name, author, cover, detail}]}
 */
const search = (key) => {
    let response = GET(`https://www.qidian.com/soushu/${encodeURI(key)}.html`)
    let array = []
    let $ = HTML.parse(response)
    $('li.res-book-item').forEach((child) => {
        let $ = HTML.parse(child);
        let bid = $('li').attr('data-bid');
        array.push({
            name: $('.book-mid-info .book-info-title a').text(),
            author: $('.book-mid-info .author .name').text(),
            cover: `https://bookcover.yuewen.com/qdbimg/349573/${bid}/180`,
            detail: `https://book.qidian.com/info/${bid}/`
        })
    })
    console.log(JSON.stringify(array))
    return JSON.stringify(array)
}


/**
 * 详情
 * @params {string} url
 * @returns {[{summary, status, category, words, update, lastChapter, catalog}]}
 */
const detail = (url) => {
    let response = GET(url)
    let id = url.match('\/info\\\/(\\d+)\/')[1]
    let $ = HTML.parse(response)
    let book = {
        summary: $('.book-intro').text(),
        catalog: `https://book.qidian.com/info/${id}/#Catalog`
    }
    return JSON.stringify(book)
}


/**
 * 目录
 * @params {string} url
 * @returns {[{name, url, vip}]}
 */
const catalog = (url) => {
    let response = GET(url)
    let $ = HTML.parse(response)
    let array = []
    $('.volume-wrap li').forEach((booklet)=>{
        let $ = HTML.parse(booklet)
        let href = $("h2.book_name a").attr('href');
        href = href.startsWith('//')?"https:"+href:href;
        array.push({
            name: $("h2.book_name a").text(),
            url: href,
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
    return $(".read-content")
}


/**
 * 个人
 * @returns {[{url, nickname, recharge, balance[{name, coin}], sign}]}
 */
const profile = () => {
}

var bookSource = JSON.stringify({
    name: "起点",
    url: "www.qidian.com",
    version: 100
})