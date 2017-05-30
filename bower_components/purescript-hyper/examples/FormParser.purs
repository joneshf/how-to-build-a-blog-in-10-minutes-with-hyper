module Examples.FormParser where

import Prelude
import Text.Smolder.HTML.Attributes as A
import Control.IxMonad ((:>>=), (:*>))
import Control.Monad.Aff.AVar (AVAR)
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Class (liftEff)
import Control.Monad.Eff.Console (log, CONSOLE)
import Control.Monad.Eff.Exception (EXCEPTION)
import Data.Either (Either(Right, Left))
import Data.HTTP.Method (Method(..))
import Data.Maybe (Maybe(Nothing, Just))
import Data.MediaType.Common (textHTML)
import Data.String (length)
import Hyper.Form (parseForm, required)
import Hyper.Node.Server (defaultOptionsWithLogging, runServer)
import Hyper.Request (getRequestData)
import Hyper.Response (closeHeaders, contentType, respond, writeStatus)
import Hyper.Status (statusBadRequest, statusMethodNotAllowed, statusOK)
import Node.HTTP (HTTP)
import Text.Smolder.HTML (button, form, input, label, p)
import Text.Smolder.Markup (text, (!))
import Text.Smolder.Renderer.String (render)

main :: forall e. Eff (http :: HTTP, console :: CONSOLE, exception :: EXCEPTION, avar :: AVAR | e) Unit
main =
  let
    -- A view function that renders the name form.
    renderNameForm err = do
      form ! A.method "post" $ do
        formattedError
        formElements
      where
        formElements = do
          label ! A.for "firstName" $ text "Your Name:"
          p (input ! A.name "firstName" ! A.id "firstName")
          p (button (text "Send"))

        formattedError =
          case err of
            Just s -> p ! A.style "color: red;" $ text s
            Nothing -> pure unit

    htmlWithStatus status x =
      writeStatus status
      :*> contentType textHTML
      :*> closeHeaders
      :*> respond (render x)

    handlePost =
      parseForm :>>=
      case _ of
        Left err -> do
          liftEff (log err)
          :*> htmlWithStatus
              statusBadRequest
              (p (text "Bad request, invalid form."))
        Right form ->
          case required "firstName" form of
            Right name
              | length name > 0 ->
                htmlWithStatus
                statusOK
                (p (text ("Hi " <> name <> "!")))
              | otherwise ->
                htmlWithStatus
                statusBadRequest
                (renderNameForm (Just "Name cannot be empty."))
            Left err ->
              htmlWithStatus
              statusBadRequest
              (renderNameForm (Just err))

    -- Our (rather primitive) router.
    router =
      _.method <$> getRequestData :>>=
      case _ of
        Left GET ->
          htmlWithStatus
          statusOK
          (renderNameForm Nothing)
        Left POST ->
          handlePost
        method ->
          htmlWithStatus
          statusMethodNotAllowed
          (text ("Method not supported: " <> show method))

  -- Let's run it.
  in runServer defaultOptionsWithLogging {} router
