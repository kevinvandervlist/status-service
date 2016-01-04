all: server webapp

server:
	cd server; npm install;	tsd install; gulp; cd ..

webapp:
	cd webapp; tsd install; npm install; gulp build.prod --env prod; cd ..

.PHONY: server webapp
