
$(document).ready(() => {
  console.log('loaded')
  // eslint-disable-next-line func-names
  $('.save').on('click', function () {
    const articleID = this.id
    console.log('Article Id to be saved', articleID)
    $.post(`/api/save/${articleID}`).then(() => {
      $(`.unsaved${articleID}`).hide(1000)
    })
  })

  $('.clearArticles').on('click', () => {
    $.get('/api/clear', (response) => {
      console.log(response)
      $('#modal-body').text('Articles Cleared!!')
      $('#scrapeModal').modal({ backdrop: false })
      $(document).on('click', () => {
        window.location.reload(true)
        $('#scrapeModal').modal({ backdrop: false })
      })
      console.log('articles cleared')
    })
  })

  $('.scrapeArticles').on('click', () => {
    $.get('/api/scrape', (response) => {
      console.log(response)
      $('#modal-body').text('Articles Scraped!!')
      $('#scrapeModal').modal({ backdrop: false })
      $(document).on('click', () => {
        window.location.reload(true)
        $('#scrapeModal').modal({ backdrop: false })
      })
      console.log('articles scraped')
      // when modal is closed, reset form
    })
  })
})
// =============================================================================
// Unsaved article
// =============================================================================
//
//
//
//
//
//
//
// =============================================================================
// Saved Modal Section
// =============================================================================
// eslint-disable-next-line func-names
$('.comment').on('click', function () {
  const articleID = this.value
  const commentID = `.addComment${articleID}`
  const targetID = `#comment${this.value}`
  $(targetID).modal({ backdrop: false, focus: true })
  // populate route
  $.get(`/api/comments/${articleID}`, (response) => {
    console.log(response)
  })
  $(commentID).on('click', () => {
    const title = $(`#title${articleID}`).val().trim()
    const body = $(`#message${articleID}`).val().trim()
    console.log(body, title)
    if (body && title) {
      $.post('/api/comments/', { articleID, body, title }, (data, status) => {
        console.log(data, status)
      })
    }
  })
})
