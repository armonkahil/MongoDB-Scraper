
$(document).ready(() => {
  console.log('loaded')
  // ===========================================================================
  // save article
  // ===========================================================================
  // eslint-disable-next-line func-names
  $('.save').on('click', function () {
    const articleID = this.id
    console.log('Article Id to be saved', articleID)
    $.post(`/api/save/${articleID}`).then(() => {
      $(`.unsaved${articleID}`).hide(1000)
    })
  })

  // ===========================================================================
  // clear all articles and comments
  // ===========================================================================
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

  // ===========================================================================
  // scrape articles
  // ===========================================================================
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
  // ===========================================================================
  // delete comment from modal
  // ===========================================================================

  // eslint-disable-next-line func-names
  $('.deleteComment').on('click', function () {
    const deleteCommentId = this.value
    console.log('Comment to be deleted', deleteCommentId)
    $.get(`/api/comments/delete/${deleteCommentId}`, (response) => {
      console.log(response)
      $(`.deleteThis${deleteCommentId}`).hide(1000)
    })
  })
})
