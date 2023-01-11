build:
	@chmod +x ./checkutils.sh
	@chmod +x ./main.js
	@chmod +x ./main
	@npm install > /dev/null 2>&1
	@g++ -Wall -Wno-unused-variable -O2 main.cpp -o exec
run: main.js
	@./main

clean:
	rm -f *.log
