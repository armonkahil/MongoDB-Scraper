
$(document).ready(function () {
	var munch = new Audio('./assets/audio/munch-sound-effect.mp3')
	munch.autoplay = true
	var wrong = new Audio('./assets/audio/ball-origin-beep.mp3')
	$('#add').on('click', function () {
		event.preventDefault()
		const burger = $('#burgerName').val().trim()
		if (burger === '' || burger === undefined) {
			wrong.autoplay = true
			wrong.play()
			alert('Try Again')
		} else {
			munch.play()
			$.ajax('/api/burgers/' + burger, {
				type: 'POST'
			}).then(function () {
				// Reload the page to get the updated list
				location.reload()
			})
		}
	})

	$('.devour').on('click', function () {
		var eaten = this.id
		munch.play()
		console.log(eaten)
		$.ajax('/api/burgers/' + eaten, {
			type: 'PUT'
		}).then(function () {
			console.log('devouring burger')
			location.reload()
		})
	})
	$('.delete').on('click', function () {
		event.preventDefault()
		console.log(this.id)
		var burgerDelete = this.id
		burgerDelete = burgerDelete.slice(1, burgerDelete.length)
		console.log(burgerDelete)
		munch.play()
		$.ajax('/api/burgers/' + burgerDelete, {
			type: 'DELETE'
		}
		).then(() => {
			location.reload()
		})
	})

	$('.devoured-delete').on('click', function () {
		event.preventDefault()
		console.log(this.id)
		var burgerDelete = this.id
		burgerDelete = burgerDelete.slice(1, burgerDelete.length)
		console.log(burgerDelete)
		munch.play()
		$.ajax('/api/burgers/devoured/' + burgerDelete, {
			type: 'DELETE'
		}
		).then(() => {
			location.reload()
		})
	})
})
