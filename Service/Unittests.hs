{-# LANGUAGE OverloadedStrings #-}
module Service.Unittests where

import Test.Tasty
import Test.Tasty.HUnit
import Service.URIMapper_test
import Service.Request_test

service_tests :: TestTree
service_tests = testGroup "Service tests"
    [ request_tests
    , urimapper_tests
    ]
