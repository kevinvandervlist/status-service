module Service.Request_test where

import Test.Tasty
import Test.Tasty.HUnit
import Service.Request

request_tests = testGroup "Request Unit tests"
    [ testCase "Do a request" $ assertEqual
       "" "abc" (doGetRequest "http://localhost:8080/demo/bar/health")
    ]
