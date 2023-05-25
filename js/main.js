let arrLeft = document.querySelector('.fa-arrow-left')
let arrRight = document.querySelector('.fa-arrow-right')
arrLeft.addEventListener('click', function (e) {
  let nowval = parseInt(document.querySelector('.container').getAttribute('name'))
  let weekList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  for (let i = 0; i < 7; i++) {
    let calender = document.querySelector('.contain-bottom')
    let target = calender.querySelector(`.week-${i}`)
    target.innerHTML = `<div>${weekList[i]}</div>`
  }
  mainjs(nowval - 1)
})
arrRight.addEventListener('click', function (e) {
  let nowval = parseInt(document.querySelector('.container').getAttribute('name'))
  let weekList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  for (let i = 0; i < 7; i++) {
    let calender = document.querySelector('.contain-bottom')
    let target = calender.querySelector(`.week-${i}`)
    target.innerHTML = `<div>${weekList[i]}</div>`
  }
  mainjs(nowval + 1)
})
function mainjs(adder) {
  let date = new Date()
  let startDay = new Date(date.getFullYear(), date.getMonth() + adder, 0)
  let prevDate = startDay.getDate(); // 몇일
  let prevDay = startDay.getDay(); // 요일
  let endDay = new Date(date.getFullYear(), date.getMonth() + 1 + adder, 0)
  let nextDate = endDay.getDate()
  let nextDay = endDay.getDay()
  let todayYear = endDay.getFullYear().toString()
  let todayMonth = (endDay.getMonth() < 9 ? '0' : '') + (endDay.getMonth() + 1).toString()
  let todayDate = date.getDate().toString()
  let calender = document.querySelector('.contain-bottom')
  document.querySelector('.container').setAttribute('name', adder)
  for (let i = prevDate - prevDay; i <= prevDate; i++) {
    target = calender.querySelector(`.week-${i - (prevDate - prevDay)}`)
    target.innerHTML += '<div class="btn disabled col-12">' + i + '</div>'
  }
  for (let i = 1; i <= nextDate; i++) {
    target = calender.querySelector(`.week-${(prevDay + i) % 7}`)
    target.innerHTML += '<div class="btn current col-12 day-' + i + '" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">' + i + '</div>'

  }
  for (let i = 1; i < (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
    target = calender.querySelector(`.week-${nextDay + i}`)
    target.innerHTML += '<div class="btn disabled col-12">' + i + '</div>'
  }
  let allowedListBOJ = [];
  let allowedListSWEA = [];
  let allowedListPGM = [];
  let calList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  document.querySelector('.monthYearText').innerHTML = `${calList[endDay.getMonth()]} ${endDay.getFullYear()}`
  axios({
    method: 'get',
    url: `https://api.github.com/repos/potato3641/algo/contents/BOJ`,
  })
    .then((response) => {
      for (fileorfold of response.data) {
        if (fileorfold.type == 'dir') {
          allowedListBOJ.push(fileorfold.name)
        }
      }
    })
    .then((response) => {
      axios({
        method: 'get',
        url: `https://api.github.com/repos/potato3641/algo/contents/SWEA`,
      })
        .then((response) => {
          for (fileorfold of response.data) {
            if (fileorfold.type == 'dir') {
              allowedListSWEA.push(fileorfold.name)
            }
          }
        })
        .then((response) => {
          axios({
            method: 'get',
            url: `https://api.github.com/repos/potato3641/algo/contents/PGM`,
          })
            .then((response) => {
              for (fileorfold of response.data) {
                if (fileorfold.type == 'dir') {
                  allowedListPGM.push(fileorfold.name)
                }
              }
            })
            .then((response) => {
              let axiosGenerators = document.querySelectorAll('.current')
              axiosGenerators.forEach((axiosGenerator) => {
                let clickedDay = parseInt(axiosGenerator.innerHTML)
                let formatDay = (clickedDay < 10 ? '0' : '') + clickedDay.toString()
                let foldName = todayYear.slice(-2) + todayMonth + formatDay
                if (!allowedListBOJ.includes(foldName) && !allowedListSWEA.includes(foldName) && !allowedListPGM.includes(foldName)) {
                  target = document.querySelector('.day-' + clickedDay.toString())
                  target.classList.remove('current')
                  target.classList.add('disabled')
                  target.classList.add('nostudy')
                }
                axiosGenerator.addEventListener('click', function (e) {
                  let todos = 1;
                  document.querySelector('.boj-body').innerHTML = ""
                  document.querySelector('.swea-body').innerHTML = ""
                  document.querySelector('.pgm-body').innerHTML = ""
                  if (allowedListBOJ.includes(foldName)) {
                    todos *= -1;
                    axios({
                      method: 'get',
                      url: `https://api.github.com/repos/potato3641/algo/contents/BOJ/${foldName}`,
                    })
                      .then((response) => {
                        let target = document.querySelector('.boj-body')
                        target.innerHTML = `BOJ : ${response.data.length}<br>`
                        let urlSkull = `https://raw.githubusercontent.com/potato3641/algo/master/BOJ/${foldName}/`
                        for (pyfile of response.data) {
                          let sweaSkull = `https://www.acmicpc.net/problem/${pyfile.name.split('.')[0]}`
                          target.innerHTML += `<a class="btn btn-default" target="_blank" href="${urlSkull + pyfile.name}">${pyfile.name}</a>`
                          target.innerHTML += `<a class="btn text-primary pblink" target="_blank" href="${sweaSkull}">problem link</a><br>`
                        }
                      })
                      .catch((error) => {
                        console.log(error.response)
                      })
                  }
                  todos = 1;
                  if (allowedListSWEA.includes(foldName)) {
                    todos *= -1;
                    axios({
                      method: 'get',
                      url: `https://api.github.com/repos/potato3641/algo/contents/SWEA/${foldName}`,
                    })
                      .then((response) => {
                        let target = document.querySelector('.swea-body')
                        target.innerHTML = `SWEA : ${response.data.length}<br>`
                        let urlSkull = `https://raw.githubusercontent.com/potato3641/algo/master/SWEA/${foldName}/`

                        for (pyfile of response.data) {
                          let sweaSkull = `https://swexpertacademy.com/main/code/problem/problemList.do?contestProbId=&problemTitle=${pyfile.name.split('.')[0]}`
                          target.innerHTML += `<a class="btn btn-default" target="_blank" href="${urlSkull + pyfile.name}">${pyfile.name}</a>`
                          target.innerHTML += `<a class="btn text-primary pblink" target="_blank" href="${sweaSkull}">problem link</a><br>`
                        }
                      })
                      .catch((error) => {
                        console.log(error.response)
                      })
                  }
                  todos = 1;
                  if (allowedListPGM.includes(foldName)) {
                    todos *= -1;
                    axios({
                      method: 'get',
                      url: `https://api.github.com/repos/potato3641/algo/contents/PGM/${foldName}`,
                    })
                      .then((response) => {
                        let target = document.querySelector('.pgm-body')
                        target.innerHTML = `PGM : ${response.data.length}<br>`
                        let urlSkull = `https://raw.githubusercontent.com/potato3641/algo/master/PGM/${foldName}/`

                        for (pyfile of response.data) {
                          let sweaSkull = `https://school.programmers.co.kr/learn/courses/30/lessons/${pyfile.name.split('.')[0]}`
                          target.innerHTML += `<a class="btn btn-default" target="_blank" href="${urlSkull + pyfile.name}">${pyfile.name}</a>`
                          target.innerHTML += `<a class="btn text-primary pblink" target="_blank" href="${sweaSkull}">problem link</a><br>`
                        }
                      })
                      .catch((error) => {
                        console.log(error.response)
                      })
                  }
                })
              })
            })
        })
    })
}
mainjs(0)