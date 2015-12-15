module Health.Data_test where

import Test.Tasty
import Test.Tasty.HUnit
import Health.Data

health_tests = testGroup "Health Unit tests"
    [ testCase "Should be able to parse a 'down' service state" $ assertEqual
       "" Down (parseServiceState "down")
    , testCase "Should be able to parse a 'up' service state" $ assertEqual
       "" Up (parseServiceState "up")
    , testCase "Should be able to parse an 'unknown' service state" $ assertEqual
       "" Unknown (parseServiceState "xyz")
    , testCase "Should be able to parse a singular service up" $ assertEqual
      ""
      (Just $ ServiceHealth "Foo" Up "1.0.0" "myhostname" 1257894000 [])
      (serviceHealthFromJSON serviceUp)
    , testCase "Should be able to parse a singular service down" $ assertEqual
      ""
      (Just $ ServiceHealth "Bar" Down "1.0.0" "myhostname" 1257894001 [])
      (serviceHealthFromJSON serviceDown)
    , testCase "Should be able to parse a recursive service definition" $ assertEqual
      ""
      (Just $ ServiceHealth "Foo" Up "1.0.0" "myhostname" 1257894001 [
        ServiceHealth "Bar" Down "1.0.0" "theirhostname" 1257894000 []
      ])
      (serviceHealthFromJSON recursiveServiceDefinition)
    ]

serviceUp :: String
serviceUp = "{ \
     \ \"servicename\":\"Foo\", \
     \ \"state\":\"up\", \
     \ \"version\":\"1.0.0\", \
     \ \"hostname\":\"myhostname\", \
     \ \"timestamp\":1257894000, \
     \ \"dependencies\":[] \
     \}"

serviceDown :: String
serviceDown = "{ \
     \ \"servicename\":\"Bar\", \
     \ \"state\":\"down\", \
     \ \"version\":\"1.0.0\", \
     \ \"hostname\":\"myhostname\", \
     \ \"timestamp\":1257894001, \
     \ \"dependencies\":[] \
     \}"

recursiveServiceDefinition :: String
recursiveServiceDefinition = "{ \
     \ \"servicename\":\"Foo\", \
     \ \"state\":\"up\", \
     \ \"version\":\"1.0.0\", \
     \ \"hostname\":\"myhostname\", \
     \ \"timestamp\":1257894001, \
     \ \"dependencies\":[{ \
          \ \"servicename\":\"Bar\", \
          \ \"state\":\"down\", \
          \ \"version\":\"1.0.0\", \
          \ \"hostname\":\"theirhostname\", \
          \ \"timestamp\":1257894000, \
          \ \"dependencies\":[] \
     \ }]}"

--
--  {
--     "servicename":"MyMicroService",
--     "state": "up",
--     "version":"MyVersion",
--     "hostname":"myhostname",
--     "timestamp":1257894000,
--     "dependencies":[{
--        "servicename":"MyMicroService",
--        "state": "down",
--        "version":"MyVersion",
--        "hostname":"myhostname",
--        "timestamp":1257894000,
--        "dependencies":[]
--     }]
--  }
