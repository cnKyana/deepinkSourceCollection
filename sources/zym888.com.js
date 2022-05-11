const baseurl = "http://www.zym888.com"
/**
 * 搜索
 * @params {string} key
 * @returns {[{name, author, cover, detail}]}
 */
const search = (key) => {
    let response = GET(`${baseurl}/api/search?q=${encodeURI(key)}`)
    let array = []
    let $ = JSON.parse(response)
    $.data.search.map(book => {
        array.push({
            name: book.book_name.replace(/<\/?.+?\/?>/g,''),
            author: book.author.replace(/<\/?.+?\/?>/g,''),
            cover: `${baseurl}${book.cover}`,
            detail: JSON.stringify({
                url: `${baseurl}${book.book_detail_url}`,
                summary: book.intro,
                status: book.status_str,
                category: book.cate_name,
                catalog: `${baseurl}${book.book_list_url}`
            })
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
    let args = JSON.parse(url)
    let book = {
        summary: args.summary,
        catalog: args.catalog,
        category: args.category,
        status: args.status
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
    $('.L').forEach((booklet) => {
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
    return $("#htmlContent")
}

var bookSource = JSON.stringify({
    name: "七猫小说👿",
    url: "www.zym888.com",
    version: 100
})