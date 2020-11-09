let cannedAdapters = [
  {"id": "5a4f79aa-7c3a-4f23-afc2-27cef2bf14b8",
   "name": "MIT EECS Course Catalog",
   "url": "https://eecs.scripts.mit.edu/eduportal/who_is_teaching_what/F/2020/",
   "code": `{
    name: "MIT EECS Course Catalog",
    contains: "https://eecs.scripts.mit.edu/eduportal/who_is_teaching_what/F/2020/",
    attributes: [
      { name: "id", type: "text", hidden: true },
      { name: "number", type: "text" },
      { name: "title", type: "text" },
      { name: "mode", type: "text" },
      { name: "lecturers", type: "text" },
      { name: "recitation instructors", type: "text" }
    ],
    scrapePage: () => {
      return Array.from(document.querySelectorAll('tr[id]')).map(el => {
        let courseData = el.getElementsByTagName('td')
        let courseNumber = el.id
        let courseName = courseData[0].innerText
  
        return {
          id: courseNumber,
          rowElements: [el],
          dataValues: {
            number: courseNumber,
            title: courseName.substring(courseNumber.length + 1),
            mode: courseData[1].innerText,
            lecturers: courseData[2].innerText,
            "recitation instructors": courseData[3].innerText
          }
        }
      })
    },
    onRowSelected: (row) => {
      row.rowElements.forEach(el => {
        if (el.style) {
          el.style['background-color'] = '#c9ebff'
        }
      });
      row.rowElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' })
    },
    onRowUnselected: (row) => {
      row.rowElements.forEach(el => {
        if (el.style) {
          el.style['background-color'] = ''
        }
      })
    }
  }
  `,
  "description": "<h2>MIT EECS Course Catalog Info</h2><p>Description content</p>"
},
{"id": "68fed7c1-fd40-4fb7-9d8f-1c6f34a3f2cb",
  "name": "Hacker News",
  "url": "https://news.ycombinator.com/",
  "code": `{
    name: "Hacker News",
    contains: "https://news.ycombinator.com/",
  //   enabled () {
  //     return urlContains("news.ycombinator.com/") ||
  //           urlContains("news.ycombinator.com/news") ||
  //           urlContains("news.ycombinator.com/newest")
  //   },
    attributes: [
      { name: "id", type: "text", hidden: true },
      { name: "rank", type: "numeric" },
      { name: "title", type: "text" },
      { name: "link", type: "text" },
      { name: "points", type: "numeric" },
      { name: "user", type: "text" },
      // { name: "comments", type: "numeric" }
    ],
    scrapePage() {
      return Array.from(document.querySelectorAll('tr.athing')).map(el => {
        let detailsRow = el.nextElementSibling
        let spacerRow = detailsRow.nextElementSibling
  
        return {
          id: String(el.getAttribute('id')),
          rowElements: [el, detailsRow, spacerRow],
            // todo: Both of these steps should be handled by the framework...
            // .filter(e => e) // Only include if the element is really there
            // .map(e => (e)), // Convert to HTMLElement type
          dataValues: {
            rank: el.querySelector('span.rank'),
            title: el.querySelector('a.storylink'),
            link: el.querySelector('a.storylink').getAttribute('href'),
            // These elements contain text like "162 points";
            // Wildcard takes care of extracting a number automatically.
            points: detailsRow.querySelector('span.score'),
            user: detailsRow.querySelector('a.hnuser'),
          //   comments: extractNumber(Array.from(detailsRow.querySelectorAll('a'))
          //     .find(e => e.textContent.indexOf('comment') !== -1), 0)
          },
          // annotationContainer: detailsRow.querySelector('td.subtext') as HTMLElement,
          // annotationTemplate: '| <span style="color: #f60;">$annotation</span>'
        }
      })
    },
    onRowSelected: (row) => {
        row.rowElements.forEach(el => {
            if (el.style) {
                el.style['background-color'] = '#def3ff'
            }
        });
        row.rowElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' })
    },
    onRowUnselected: (row) => {
        row.rowElements.forEach(el => {
            if(el.style) {
                el.style['background-color'] = ''
            }
        })
    },
  }
  `,
  "description": `<h2>Hacker News Info</h2>
  <p>Hackernews is a website that is popular among 
    developers and entrepreneurs. Anybody can create an account and add content which is presented in a timeline format (most recent first).
  </p>
  <image src="https://geoffreylitt.github.io/wildcard/examples/_images/hackernews/wildcard_open.png"></image>"
  `
}
]

module.exports = cannedAdapters;