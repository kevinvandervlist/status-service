{-# LANGUAGE OverloadedStrings #-}
module Service.URIMapper_test where

import Test.Tasty
import Test.Tasty.HUnit
import Service.URIMapper

urimapper_tests = testGroup "URIMapper Unit tests"
    [ testCase "Map a service to its base uri" $ assertEqual
       "" "foo.bar/myservice/health" (asBaseUrl "foo.bar/{}/health" "myservice")
    , testCase "Map a list of services to its base uri" $ assertEqual
       ""
       ["foo.bar/myservice/health", "foo.bar/other/health"]
       (asBaseUrls "foo.bar/{}/health" ["myservice", "other"])
    ]
