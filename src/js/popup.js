document.readyState !== 'loading' ? init() : document.addEventListener('DOMContentLoaded', init);
function $_(element) {return document.querySelector(element)}

function init(){

	let modal = $_('.wrapper .modal');

	$_('header button').addEventListener('click', event => {
		modal.style.display = 'block'
	})
	

	$_('.modal span.close').addEventListener('click', event => {
		modal.style.display = 'none'
	})

	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}


	/* отправка формы */

	let path = '/php/callback.php'
	//let path = 'http://api.local/callback.php';

	modal.querySelector('form').addEventListener('submit', event => {
		
		event.preventDefault();

		let data = {
			phone: modal.querySelector('input[type="text"]').value
		}

		fetch(path, {
			method: 'POST',
			mode: 'cors',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(data)
		})
		.then(response => response.text())
		.then(text => drawResult(text))	

	})
}

function drawResult(text) {
	let string = ``;

	if(text == 'success'){
		string = `
			<p style="font-size: 2rem; text-align: center; margin: 1rem">🤩</p>
			<p>Успешно отправлено, ожидайте звонка менеджера</p>
		`
	} else {
		string = `Ошибка отправки, пожалуйста, сообщите нам об этом по телефону +375 29 611 39 03`
	}
		$_('.modal-content form').innerHTML = string;
}