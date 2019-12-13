
$(document).ready(() => {
  console.log('loaded')
  $('.save').on('click', function () {
    const articleID = this.id
    console.log('Article Id to be saved', articleID)
    $.ajax(`/api/save/${articleID}`, {
      type: 'PUT'
    }).then(() => {
      $(`#${articleID}`).addClass('fadeOut')
    })
  })

  $('.clear').on('click', () => {
    window.event.preventDefault()
    console.log(this.id)
    $.ajax(`/api/clear`, {
      type: 'DELETE'
    }).then(() => {
      window.location.reload()
    })
  })

})
