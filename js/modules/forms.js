import { closeModal, openModal } from './modal';
import { postData } from '../services/services';

function forms(formSelector, modalTimerId) {
	const forms = document.querySelectorAll(formSelector);

	const message = {
		loading: '/icons/forms/spinner.svg',
		success: 'Мы скоро с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	forms.forEach(item => {
		bindPostData(item);
	});


	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: inline-flex;	
			`;
			form.append(statusMessage);
			//================= Создание запроса на XML HTTP методе =================
			// const request = new XMLHttpRequest();
			// request.open('POST', 'server.php');


			//================= Создание запроса на Json методе ==================
			// request.setRequestHeader('Content-type', 'application/json');
			const formData = new FormData(form);

			//================= Перезапись данных на Json методе ==================
			// const object = {};
			// formData.forEach(function (value, key) {
			// 	object[key] = value;
			// });
			const json = JSON.stringify(Object.fromEntries(formData.entries()));
			//const json = JSON.stringify(object);

			//request.send(json);

			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				});

			// request.addEventListener('load', () => {
			// 	if (request.status === 200) {
			// 		console.log(request.response);
			// 		showThanksModal(message.success);
			// 		form.reset();
			// 		statusMessage.remove();

			// 	} else {
			// 		showThanksModal(message.failure);
			// 	}
			// });
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal('.modal', modalTimerId);

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>x</div>
				<div class="modal__title">${message}</div>
			</div>
			`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal('.modal');
		}, 4000);
	}
}

export default forms;