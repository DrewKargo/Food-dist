
import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calculator from './modules/calculator';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
	const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 15000);

	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	timer('.timer', '2023-01-01');
	modal('.modal', '[data-modal]');
	cards();
	forms('form', modalTimerId);
	slider({
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner'
	});
	calculator();


	// _____________________Sign-in__________________________


	const signIn = document.querySelector('#sign-in'),
		modalLogin = document.querySelector('modal-login');

	function openLoginModal() {
		modalLogin.classList.add('show');
		modalLogin.classList.remove('hiden');
		document.body.style.overflow = 'hidden';

		// class User {
		// 	constructor(login, password) {
		// 		this.login = login;
		// 		this._password = password;
		// 	}
		// 	#number = '';

		// 	get UserInformation() {
		// 		return this.login,
		// 			this.password;
		// 	}
		// }

	}
	signIn.addEventListener('click', (openLoginModal));
});


