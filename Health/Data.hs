{-# LANGUAGE DeriveDataTypeable #-}
{-# LANGUAGE OverloadedStrings #-}
module Health.Data where

import Data.Data
import Data.Char
import Data.Aeson ((.:), decode, FromJSON(..), Value(..))
import Control.Monad (liftM, mzero)
import qualified Data.ByteString.Lazy.Char8 as BS

data ServiceState = Up | Down | Unknown deriving (Show, Eq, Data)

data ServiceHealth = ServiceHealth {
    servicename :: String,
    state :: ServiceState,
    version :: String,
    hostname :: String,
    timestamp :: Int,
    dependencies :: [ServiceHealth]
} deriving (Show, Eq, Data)

instance FromJSON ServiceHealth where
  parseJSON (Object v) =
    ServiceHealth <$>
    (v .: "servicename")     <*>
    liftM parseServiceState (v .: "state") <*>
    (v .: "version")  <*>
    (v .: "hostname")  <*>
    (v .: "timestamp")   <*>
    (v .: "dependencies")
  parseJSON _ = mzero

parseServiceState :: String -> ServiceState
parseServiceState raw
    | "up" == l = Up
    | "down" == l = Down
    | otherwise   = Unknown
    where l = map toLower raw

serviceHealthFromJSON :: String -> Maybe ServiceHealth
serviceHealthFromJSON s = serviceHealthFromJSONBS $ BS.pack s

serviceHealthFromJSONBS :: BS.ByteString -> Maybe ServiceHealth
serviceHealthFromJSONBS s = decode s