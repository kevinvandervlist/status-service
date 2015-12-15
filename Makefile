default: build-and-test

build-and-test:
	cabal configure --enable-tests && cabal build && cabal test

build-and-test-container:
	docker build -t status-service
	docker run --rm -v $(shell pwd):/source/ status-service

run:
	runhaskell Main.hs

test:
	runhaskell test.hs

copy-here:
	cp dist/build/status-service/status-service status-service

manual-build:
	ghc -tmpdir dist/ -outputdir dist/ -threaded -O2 -fwarn-missing-signatures -Wall -Werror Main.hs -o status-service
