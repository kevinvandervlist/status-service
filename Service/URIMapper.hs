module Service.URIMapper where

import Data.Text.Format
import Data.String (fromString)
import Data.Text (unpack)
import Data.Text.Lazy (toStrict)

--
toFormat :: String -> Format
toFormat str = fromString str

asBaseUrl :: Format -> String -> String
asBaseUrl baseurl service = unpack . toStrict $ format baseurl [service]

asBaseUrls :: String -> [String] -> [String]
asBaseUrls baseurl services = map (asBaseUrl $ toFormat baseurl) services
