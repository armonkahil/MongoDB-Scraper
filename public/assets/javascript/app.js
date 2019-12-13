
$(document).ready(() => {
  console.log('loaded')
  // eslint-disable-next-line func-names
  $('.save').on('click', function () {
    const articleID = this.id
    console.log('Article Id to be saved', articleID)
    $.ajax(`/api/save/${articleID}`, {
      type: 'PUT'
    }).then(() => {
      $(`#${articleID}`).addClass('fadeOut')
    })
  })

  $('.clearArticles').on('click', () => {
    $.get('/api/clear', (response) => {
      console.log(response)
      $('#modal-body').text('Articles Cleared!!')
      $('#scrapeModal').modal('toggle')
      $(document).on('click', () => {
        window.location.reload(true)
        $('#scrapeModal').modal('toggle')
      })
      console.log('articles cleared')
    })
  })

  $('.scrapeArticles').on('click', () => {
    $.get('/api/scrape', (response) => {
      console.log(response)
      $('#modal-body').text('Articles Scraped!!')
      $('#scrapeModal').modal('toggle')
      $(document).on('click', () => {
        window.location.reload(true)
        $('#scrapeModal').modal('toggle')
      })
      console.log('articles scraped')
      // when modal is closed, reset form
    })
  })
})
// =============================================================================
// Saved Modal Section
// =============================================================================
// eslint-disable-next-line func-names
$('.comment').on('click', function () {
  const targetID = `#${this.value}`
  $(targetID).modal({
    backdrop: false
  })
})
