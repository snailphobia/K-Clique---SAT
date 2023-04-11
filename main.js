#!/usr/bin/env node

const iodev = require('readline');
const rl = iodev.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

const V = [];
let nV = 0; // number of vertices
let K = 0; // number of vertices to be found in K-clique

function read() {
	return new Promise((resolve) => {
		let i = 0;
		const liner = (line) => {
			if (i === 0) {
				[nV, K] = line.split(' ')
							.map(n => parseInt(n))
							.filter(n => !isNaN(n));
			} else {
				let lt = [];
				lt = line.split(' ')
						.map(n => parseInt(n))
						.filter(n => !isNaN(n));
				V.push(lt);
				if (i >= nV - 1) {
					rl.removeListener('line', liner);
					rl.close();
					resolve();
				}
			}
			i++;
		};
		rl.on('line', liner);
	});
}

read().then(() => {
	V.push([]); // for the last vertex
	for (let i = nV - 2; i >= 0; i--) {
		V[i].forEach((item) => {
			V[item - 1].push(i + 1); // add some duplicates to have them both ways
			return;
		});
	}
	V.forEach((item) => { item.sort(); });

	let total_clauses = 0;
	V.forEach((item) => {
		let aux = nV - 1 - item.length;
		if (aux < 0) aux = 0; // betrayal by your most prized friend
		total_clauses += K * (K - 1) * aux;
	});
	total_clauses /= 2; total_clauses += nV + K * nV * (nV - 1) / 2 + nV * K * (K - 1) / 2; // it just works!

	rl.output.write(`p cnf ${nV * K} ${total_clauses}\n`);

	const idx = (i, j) => { return (i - 1) * nV + j; };


	for (let i = 1; i <= K; i++) {
		for (let j = 1; j <= nV; j++) {
			rl.output.write(`${idx(i, j)} `);
		}
		rl.output.write('0\n');
	}

	for (let i = 1; i <= K; i++) {
		for (let j = 1; j <= nV; j++) {
			for (let tmp = j + 1; tmp <= nV; tmp++)
				rl.output.write(`-${idx(i, j)} -${idx(i, tmp)} 0\n`);
		}
	}

	for (let i = 1; i <= nV; i++) {
		for (let j = 1; j <= K; j++) {
			for (let tmp = j + 1; tmp <= K; tmp++)
				rl.output.write(`-${idx(j, i)} -${idx(tmp, i)} 0\n`);
		}
	}

	for (let v = 1; v <= nV; v++) {
		for (let u = v + 1; u <= nV; u++) {
			if (!V[v - 1].includes(u)) {
				for (let i = 1; i <= K; i++) {
					for (let j = 1; j <= K; j++) {
						if (i !== j)
							rl.output.write(`-${idx(i, v)} -${idx(j, u)} 0\n`);
					}
				}
			}
		}
	}
	// console.log(V);
});