FROM haskell:7.10.2
MAINTAINER kvdvlist@sogyo.nl

RUN apt-get update && apt-get install -y build-essential libstdc++-4.9-dev

WORKDIR /source/

ADD . /source/

CMD cabal update && cabal install --only-dependencies --enable-tests -j4 && cabal configure --enable-tests && cabal build && cabal test && cp dist/build/status-service/status-service /build/.
