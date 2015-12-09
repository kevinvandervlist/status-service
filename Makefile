default: build

run:
	runhaskell Main.hs

test:
	runhaskell test.hs

build:
	ghc -tmpdir dist/ -outputdir dist/ -threaded -O2 -fwarn-missing-signatures -Wall -Werror main.hs -o status-service
