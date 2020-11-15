let apiKey = '391315-CouchCom-QA4NGI4I'
let baseUrl = 'https://tastedive.com/api/similar?'

function formatQueryParams(params) {
  let queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&')
}

function display(responseJson) {

  // you need to loop through the items responseJson.Results and build a list of <li>'s
  //console.log(responseJson.Similar.Results);

  const uiList = responseJson.Similar.Results.map((item) => {
      console.log(item.Name);
      return item
  })
  $('.result-list').empty()
  for (let i = 0; i < uiList.length; i++) {
    $('.result-list').append(`
    <ul class="list-unstyled">
    <fieldset>
    <li><iframe width="auto" height="auto"
src="${uiList[i].yUrl}">
</iframe><br><a href="${uiList[i].wUrl}">${uiList[i].Name}</a><br>${uiList[i].wTeaser}</li>
</fieldset>
</ul>`)
  }
  
  $('.result-list').removeClass('hidden')

}

function getMovieRecs(query, info=1) {
  let params = {
    q: query,
    k: apiKey,
    info
  }
  let url = 'https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?' + formatQueryParams(params)  //k=391315-CouchCom-QA4NGI4I&info=1&q=' + query
  console.log(url)
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error(response.statusText)
    })
    .then(responseJson => display(responseJson))
  
  // .then(responseJson = console.log(responseJson))
    .catch(err => console.log(err))
}


  // let params = {
  //   info,
  //   q: query,
  //   k: apiKey
  // }
  // let queryString = formatQueryParams(params)
  // let url = baseUrl + queryString
  // // let url = 'https://tastedive.com/api/similar?info=1&q=Pulp%20Fiction&k=391315-CouchCom-QA4NGI4I'
  // console.log(url, 'url')
  // fetch(url)
  //   .then(response => {
  //     if(response.ok) {
  //       return response.json()
  //     } throw new Error(response.statusText)
  //   })
  //   .then(res => {
  //     console.log(res.body,'this is res')
  //     console.log(response.body)
  //   })
  //   .catch(err => {
  //     $('.js-search-results').text(`Something went wrong: ${err.message}`)
  //   })
// }

// function displayResults(res) {
//   console.log(res, 'this is responseJson from displayResults')

//   if(res > 0){
//     for(let i=0; i < res.length; i++) {
//       console.log(res[i].results, 'this is responseJson from for loop')
//       $('.result-list').append(`<p>${res[i]}</p>`)
//   }
// }
//   else {
//     $('.result-list').append('<p>Sorry, no results match your search</p>')
//   }
//   $('.js-search-results').removeClass('hidden')
// }

function handleSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault()
    let queryTarget = $(event.currentTarget).find('.js-query')
    let query = queryTarget.val()
    console.log(query, 'this is the query')
    queryTarget.val('') // clear form out
    getMovieRecs(query)
  })
}

$(function() {
  handleSubmit()
})