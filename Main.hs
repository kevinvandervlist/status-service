{-# LANGUAGE DeriveDataTypeable #-}
module Main where

import Happstack.Server
import Text.JSON.Generic
import Control.Monad
import Service.URIMapper

main :: IO ()
main = do
    let services = ["foo", "bar"]
    let base = "http://localhost/api/{}/health"
    let urls = asBaseUrls (base) services

    let conf = nullConf{ port = 8080, timeout = 5 }
    simpleHTTP conf $ msum
                          [ dir "list" $ dir "all" $ ok $ toResponse (encodeJSON urls)
                          , dir "health" $ dir "all" $ ok $ toResponse (encodeJSON services)
                          , dir "hello" $ path $ \s -> ok (toResponse ("Hello " ++ s))
                          , seeOther "/hello" (toResponse "/hello")
                          ]
    simpleHTTP conf $ ok (toResponse "Hello, World!")
