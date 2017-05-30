module Hyper.Node.Test where

import Control.Applicative (pure)
import Control.Monad (class Monad)
import Data.Array (singleton)
import Data.Function ((<<<))
import Data.Monoid (class Monoid)
import Data.Semigroup ((<>), class Semigroup)
import Hyper.Response (class ResponseWritable)
import Node.Buffer (Buffer)

newtype TestResponseBody = TestResponseBody (Array Buffer)

instance bufferTestResponseBody :: Monad m => ResponseWritable TestResponseBody m Buffer where
  toResponse = pure <<< TestResponseBody <<< singleton

instance semigroupBufferResponse :: Semigroup TestResponseBody where
  append (TestResponseBody chunks) (TestResponseBody chunks') =
    TestResponseBody (chunks <> chunks')

instance monoidBufferResponse :: Monoid TestResponseBody where
  mempty = TestResponseBody []
