{-# LANGUAGE DeriveDataTypeable #-}
module Main where

import Happstack.Server
import Text.JSON.Generic
import Control.Monad

data Service = Service {
    name :: String,
    url :: String,
    healthy :: Bool
} deriving (Show, Data, Typeable)

main :: IO ()
main = do
    let services = ["foo", "bar"]
    let base = "http://localhost/api/{}/health"
--    let urls = map (asBaseUrl base) services
--    print $ asBaseUrl base "abc"
--    print urls
    let a = "http://echo.jsontest.com/healthy/true"
    let b = "http://echo.jsontest.com/false/true"
    let services = [Service "Foo" a False, Service "Foo" b True]

    let conf = nullConf{ port = 8080, timeout = 5 }
    simpleHTTP conf $ msum
                          [ dir "health" $ dir "all" $ ok $ toResponse (encodeJSON services)
                          , dir "hello" $ path $ \s -> ok (toResponse ("Hello " ++ s))
                          , seeOther "/hello" (toResponse "/hello")
                          ]
    simpleHTTP conf $ ok (toResponse "Hello, World!")
