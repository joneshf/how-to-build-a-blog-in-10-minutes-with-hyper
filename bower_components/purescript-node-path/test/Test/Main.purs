module Test.Main where

import Prelude
import Control.Monad.Eff (Eff)
import Node.Path (parse, delimiter, normalize, sep, extname, basenameWithoutExt, basename, dirname, relative, concat)
import Test.Assert (ASSERT, assert)

main  :: forall eff. Eff ( assert :: ASSERT | eff ) Unit
main = do
  assert $ normalize "/foo/bar//baz/asdf/quux/.." == normalize "/foo/bar/baz/asdf"
  assert $ concat ["/foo", "bar"] == normalize "/foo/bar"
  assert $ relative "/data/orandea/test/aaa" "/data/orandea/impl/bbb" == normalize "../../impl/bbb"
  assert $ dirname "/foo/bar/baz/asdf/quux" == normalize "/foo/bar/baz/asdf"
  assert $ basename "/foo/bar/baz/asdf/quux.html" == "quux.html"
  assert $ basenameWithoutExt "/foo/bar/baz/asdf/quux.html" ".html" == "quux"
  assert $ basenameWithoutExt "/foo/bar/baz/asdf/quux.txt" ".html" == "quux.txt"
  assert $ extname "index.html" == ".html"
  assert $ extname "index.coffee.md" == ".md"
  assert $ extname "index." == "."
  assert $ extname "index" == ""
  assert $ sep == normalize "/"
  assert $ delimiter == ";" || delimiter == ":"

  let path = parse "/home/user/file.js"
  assert $ path.root == "/"
  assert $ path.dir == "/home/user"
  assert $ path.base == "file.js"
  assert $ path.ext == ".js"
  assert $ path.name == "file"
