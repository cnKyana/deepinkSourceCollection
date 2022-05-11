const baseurl = "https://m.aixdzs.com"
/**
 * 搜索
 * @params {string} key
 * @returns {[{name, author, cover, detail}]}
 */
const search = (key) => {
    let response = GET(`${baseurl}/search?k=${encodeURI(key)}`)
    let array = []
    let $ = HTML.parse(response)
    $('.ix-list li').forEach((child) => {
        let $ = HTML.parse(child)
        array.push({
            name: $('h3.nowrap').text(),
            author: $('.meta-l').text(),
            cover: $('img').attr('src'),
            detail: JSON.stringify({
                url: `${baseurl}${$('.ix-list-img-square a').attr('href')}`,
                status: $('.nowrap p.lz').text(),
                category: $('.meta-r em:nth-child(2)').text(),
                words: $('.meta-r em:nth-child(2)').text()
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
    let response = GET(args.url, {
        headers: ["User-Agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.92 Safari/537.36"]
    })
    let $ = HTML.parse(response)

    let array =[]
    $('ul.chapter li').forEach((booklet)=>{
        let $ = HTML.parse(booklet)
        if($('a').length > 0){
            array.push({
                name: $('a').text(),
                url: `${baseurl}${$('a').attr('href')}`,
                vip: false
            })
        }
    })

    let book = {
        summary: $('#intro').text(),
        catalog: JSON.stringify(array),
        category: args.category,
        status: args.status,
        words: args.words
    }
    return JSON.stringify(book)
}


/**
 * 目录
 * @params {string} url
 * @returns {[{name, url, vip}]}
 */
const catalog = (url) => {
    let array =JSON.parse(url)
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
    return $(".page-content")
}

var bookSource = JSON.stringify({
    name: "爱下电子书",
    url: "m.aixdzs.com",
    version: 100
})