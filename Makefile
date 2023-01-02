build:
	@chmod +x ./checkutils.sh
	@chmod +x ./main.js
	@chmod +x ./main
	@npm install > /dev/null 2>&1

run: main.js
	@./main

clean:
	rm -f *.log
