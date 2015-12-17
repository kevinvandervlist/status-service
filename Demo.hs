{-# LANGUAGE DeriveDataTypeable #-}
module Demo where

import Happstack.Server
import Text.JSON.Generic
import Control.Monad
import Health.Data
import Data.ByteString.Char8 as C
import Data.ByteString.Lazy.Char8 as L

demo_endpoints = msum [demoFoo, demoBar, demoBaz]

-- /demo endpoint with demo data.
demoSVC :: (Data a) => String -> a -> ServerPart Response
demoSVC n r = dir n $ dir "health" $ ok $ toResponseBS (C.pack "application/json") (L.pack $ encodeJSON r)

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
