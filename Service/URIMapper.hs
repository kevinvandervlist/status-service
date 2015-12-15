module Service.URIMapper where

import Data.Text.Format
import Data.Text (unpack)
import Data.Text.Lazy (toStrict)

asBaseUrl :: Format -> String -> String
asBaseUrl baseurl service = unpack . toStrict $ format baseurl [service]

asBaseUrls :: Format -> [String] -> [String]
asBaseUrls baseurl services = map (asBaseUrl baseurl) services
