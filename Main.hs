{-# LANGUAGE DeriveDataTypeable #-}
module Main where

import Happstack.Server
import Text.JSON.Generic
import Control.Monad
import Service.URIMapper
import Health.Data

main :: IO ()
main = do
    let services = ["foo", "bar", "baz"]
    let urls = asBaseUrls (demoBase) services

    let conf = nullConf{ port = 8080, timeout = 5 }
    simpleHTTP conf $ msum
                          [ dir "list" $ dir "all" $ ok $ toResponse (encodeJSON urls)
                          , dir "health" $ dir "all" $ ok $ toResponse (encodeJSON services)
                          , dir "demo" $ msum [demoFoo, demoBar, demoBaz]
                          , dir "hello" $ path $ \s -> ok (toResponse ("Hello " ++ s))
                          , seeOther "/hello" (toResponse "/hello")
                          ]
    simpleHTTP conf $ ok (toResponse "Hello, World!")

demoSVC :: (Data a) => String -> a -> ServerPart Response
demoSVC n r = dir n $ dir "health" $ ok $ toResponse (encodeJSON r)

-- Some demo data to allow the service to use itself for test purposes.
demoBase :: String
demoBase = "http://localhost/demo/{}/health"

foo :: ServiceHealth
foo = ServiceHealth "Foo" Up "1.0.0" "alpha-host" 1257894000 []

bar :: ServiceHealth
bar = ServiceHealth "Bar" Down "1.0.0" "beta-host" 1234789400 []

demoFoo :: ServerPart Response
demoFoo = demoSVC "foo" foo

demoBar :: ServerPart Response
demoBar = demoSVC "bar" bar

demoBaz :: ServerPart Response
demoBaz = demoSVC "baz" (ServiceHealth "Baz" Up "2.0.0" "gamma-host" 1234789400 [foo, bar])
