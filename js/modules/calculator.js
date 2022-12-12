function calculator() {
	const result = document.querySelector('.calculating__result span');

	let sex, weight, height, age, activity;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}

	if (localStorage.getItem('activity')) {
		activity = localStorage.getItem('activity');
	} else {
		activity = '1.375';
		localStorage.setItem('activity', '1.375');
	}

	function saveProperties(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.classList.remove(activeClass);
			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(activeClass);
			}
			if (elem.getAttribute('data-activity') === localStorage.getItem('activity')) {
				elem.classList.add(activeClass);
			}
		});


	}

	saveProperties('#gender div', 'calculating__choose-item_active');
	saveProperties('.calculating__choose_big div', 'calculating__choose-item_active');

	function calculating() {
		if (!sex || !height || !weight || !age || !activity) {
			result.textContent = '?';
			return;
		}
		let forMen = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity,
			forWomen = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity;
		if (sex === 'female') {
			result.textContent = Math.round(forWomen);
		} else {
			result.textContent = Math.round(forMen);
		}


	}
	calculating();

	function getStaticInformation(parentSelector, activeClass) {
		const elements = document.querySelectorAll(`${parentSelector} div`);

		elements.forEach(elem => {
			elem.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-activity')) {
					activity = +e.target.getAttribute('data-activity');
					localStorage.setItem('activity', +e.target.getAttribute('data-activity'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}

				elements.forEach(elem => {
					elem.classList.remove(activeClass);
				});

				e.target.classList.add(activeClass);

				calculating();
			});
		});


	}

	getStaticInformation('#gender', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {

			if (input.value.match(/\D/g)) {
				input.style.boxShadow = '0 0px 20px rgb(255 0 0 / 50%)';
			} else {
				input.style.boxShadow = '0 4px 15px rgb(0 0 0 / 20%)';
			}

			switch (input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}
			calculating();
		});
	}

	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');
}

export default calculator;