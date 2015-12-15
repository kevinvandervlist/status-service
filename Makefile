default: build-and-test

build-and-test:
	cabal configure --enable-tests && cabal install --only-dependencies --enable-tests && cabal build && cabal test

run:
	runhaskell Main.hs

test:
	runhaskell test.hs

copy-here:
	cp dist/build/status-service/status-service status-service

manual-build:
	ghc -tmpdir dist/ -outputdir dist/ -threaded -O2 -fwarn-missing-signatures -Wall -Werror Main.hs -o status-service
