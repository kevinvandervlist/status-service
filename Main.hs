{-# LANGUAGE DeriveDataTypeable #-}
module Main where

import Happstack.Server
import Text.JSON.Generic
import Control.Monad

main :: IO ()

data Service = Service {
    name :: String,
    url :: String,
    healthy :: Bool
} deriving (Show, Data, Typeable)

main = do
    let a = "http://echo.jsontest.com/healthy/true"
    let b = "http://echo.jsontest.com/false/true"
    let services = [Service "Foo" a False, Service "Foo" b True]

    let conf = nullConf{ port = 8080, timeout = 5 }
    simpleHTTP conf $ msum
                          [ dir "health"  $ ok $ toResponse (encodeJSON services)
                          , dir "hello" $ path $ \s -> ok (toResponse ("Hello " ++ s))
                          , seeOther "/hello" (toResponse "/hello")
                          ]
    simpleHTTP conf $ ok (toResponse "Hello, World!")
