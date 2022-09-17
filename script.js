const table = document.querySelector('table');
const cards = ['fa-cat', 'fa-dog', 'fa-xmark', 'fa-o', 'fa-code', 'fa-note-sticky', 'fa-baby', 'fa-computer'];
cards.push(...cards);
const tds = [];

let active = true;
let openCard = [];
let count = 0;

function checkCard() {
	active = false;
	count++;

	if (openCard[0].innerHTML === openCard[1].innerHTML) {
		openCard.forEach((e) => (e.style.backgroundColor = 'rgb(100, 255, 100)'));
		openCard.splice(0, openCard.length);

		active = true;

		if (tds.every((e) => e.style.backgroundColor === tds[0].style.backgroundColor)) {
			tds.forEach((e) => (e.style.backgroundColor = 'rgb(50, 200, 50)'));

			setTimeout(() => {
				table.style.display = 'none';

				const message = document.createElement('div');
				message.innerHTML = `<strong>COMPLETED!</strong><br />You tried ${count} times.<br /><button onclick="location.reload()">Restart</button>`;
				message.style.textAlign = 'center';

				document.body.appendChild(message);
			}, 1000);
		}

		return;
	}

	openCard.forEach((e) => (e.style.backgroundColor = 'rgb(255, 0, 0)'));

	setTimeout(() => {
		openCard.forEach((e) => {
			e.style.backgroundColor = 'transparent';
			e.innerHTML = '';
		});
		openCard.splice(0, openCard.length);

		active = true;
	}, 1000);
}

for (let i = 0; i < 4; i++) {
	const tr = document.createElement('tr');

	for (let j = 0; j < 4; j++) {
		const td = document.createElement('td');
		let card = cards.splice(Math.floor(Math.random() * cards.length), 1);
		td.addEventListener('click', () => {
			if (!active || td.innerHTML) return;

			td.innerHTML = `<i class="fas ${card}"></i>`;
			td.style.backgroundColor = 'rgb(240, 240, 240)';

			openCard.push(td);
			if (openCard.length === 2) checkCard();
		});

		tr.appendChild(td);
		tds.push(td);
	}

	table.appendChild(tr);
}
