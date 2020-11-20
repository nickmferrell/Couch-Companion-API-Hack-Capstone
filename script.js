let apiKey = '391315-CouchCom-QA4NGI4I'
let baseUrl = 'https://tastedive.com/api/similar?'
let movieName = ''

function formatQueryParams(params) {
  let queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&')
}

function display(responseJson) {
  let uiList = responseJson.Similar.Results.map((item) => {
      console.log(item.Name);
      return item
  })
  $('.result-list').empty()
  if (uiList.length === 0) {
    $('.result-list').append(`<p class="movie-name">No recommendations found for: ${movieName}</p>`)
  }else
  $('.result-list').append(`<p class="movie-name">Showing recommendations for: ${movieName}</p>`)
  for (let i = 0; i < uiList.length; i++) {
    $('.result-list').append(`
    <ul class="list-unstyled">
    <li><a href="${uiList[i].wUrl}" target="_blank">${uiList[i].Name}</a></li></ul>`)
  }
  $('.result-list').removeClass('hidden')
}

function getMovieRecs(query, info=1) {
  let params = {
    q: query,
    k: apiKey,
    info
  }
  let url = 'https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?' + formatQueryParams(params) 
  console.log(url)
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error(response.statusText)
    })
    .then(responseJson => display(responseJson))
    .catch(err => console.log(err))
}

function handleSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault()
    let queryTarget = $(event.currentTarget).find('.js-query')
    movieName = queryTarget.val()
    console.log(movieName, 'this is the query')
    queryTarget.val('')
    getMovieRecs(movieName)
  })
}

$(function() {
  handleSubmit()
})