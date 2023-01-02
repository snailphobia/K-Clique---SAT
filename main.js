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
				console.log(lt);
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
	// can't wait to jsfuck this
	
});