import Test.Tasty
import Test.Tasty.QuickCheck
import Test.Tasty.HUnit

import Data.List
import Data.Ord

import Health.Data_test

main = defaultMain tests

tests :: TestTree
tests = testGroup "Tests"
    [ properties
    , health_tests
    ]

properties :: TestTree
properties = testGroup "Properties" [qcProps]

qcProps = testGroup "(checked by QuickCheck)"
  [ testProperty "sort == sort . reverse" $
      \list -> sort (list :: [Int]) == sort (reverse list)
  ]