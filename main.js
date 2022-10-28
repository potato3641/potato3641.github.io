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
  calList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
          let axiosGenerators = document.querySelectorAll('.current')
          axiosGenerators.forEach((axiosGenerator) => {
            let clickedDay = parseInt(axiosGenerator.innerHTML)
            let formatDay = (clickedDay < 10 ? '0' : '') + clickedDay.toString()
            let foldName = todayYear.slice(-2) + todayMonth + formatDay
            let todo = 1;
            axiosGenerator.addEventListener('click', function (e) {
              let todos = 1;
              document.querySelector('.boj-body').innerHTML = ""
              document.querySelector('.swea-body').innerHTML = ""
              if (allowedListBOJ.includes(foldName)) {
                todos *= -1;
                axios({
                  method: 'get',
                  url: `https://api.github.com/repos/potato3641/algo/contents/BOJ/${foldName}`,
                })
                  .then((response) => {
                    target = document.querySelector('.boj-body')
                    target.innerHTML = `BOJ : ${response.data.length}<br>`
                    for (pyfile of response.data) {
                      target.innerHTML += `${pyfile.name}<br>`
                    }
                  })
                  .catch((error) => {
                    console.log(error.response)
                  })
              }
              if (allowedListSWEA.includes(foldName)) {
                todos *= -1;
                axios({
                  method: 'get',
                  url: `https://api.github.com/repos/potato3641/algo/contents/SWEA/${foldName}`,
                })
                  .then((response) => {
                    target = document.querySelector('.swea-body')
                    target.innerHTML = `SWEA : ${response.data.length}<br>`
                    for (pyfile of response.data) {
                      target.innerHTML += `${pyfile.name}<br>`
                    }
                  })
                  .catch((error) => {
                    console.log(error.response)
                  })
              }
            })
            if (allowedListBOJ.includes(foldName)) {
              todo *= -1;
            }
            if (allowedListSWEA.includes(foldName)) {
              todo *= -1;
            }
            if (todo == 1) {
              // document.querySelector('.modal-body').innerHTML = ""
              target = document.querySelector('.day-' + clickedDay.toString())
              target.classList.remove('current')
              target.classList.add('disabled')
              target.style.color = 'white';
            }
          })
        })
    })
}
mainjs(0)