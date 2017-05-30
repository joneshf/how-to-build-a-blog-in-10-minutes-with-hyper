module Data.Date
  ( Date
  , canonicalDate
  , exactDate
  , year
  , month
  , day
  , weekday
  , diff
  , isLeapYear
  , module Data.Date.Component
  ) where

import Prelude

import Data.Date.Component (Day, Month(..), Weekday(..), Year)
import Data.Enum (toEnum, fromEnum)
import Data.Function.Uncurried (Fn3, runFn3, Fn4, runFn4, Fn6, runFn6)
import Data.Generic (class Generic)
import Data.Maybe (Maybe(..), fromJust)
import Data.Time.Duration (class Duration, toDuration, Milliseconds)

import Partial.Unsafe (unsafePartial)

-- | A date value in the Gregorian calendar.
data Date = Date Year Month Day

-- | Constructs a date from year, month, and day components. The resulting date
-- | components may not be identical to the input values, as the date will be
-- | canonicalised according to the Gregorian calendar. For example, date
-- | values for the invalid date 2016-02-31 will be corrected to 2016-03-02.
canonicalDate :: Year -> Month -> Day -> Date
canonicalDate y m d = runFn4 canonicalDateImpl mkDate y (fromEnum m) d
  where
  mkDate :: Year -> Int -> Day -> Date
  mkDate = unsafePartial \y' m' d' -> Date y' (fromJust (toEnum m')) d'

-- | Constructs a date from year, month, and day components. The result will be
-- | `Nothing` if the provided values result in an invalid date.
exactDate :: Year -> Month -> Day -> Maybe Date
exactDate y m d =
  let dt = Date y m d
  in if canonicalDate y m d == dt then Just dt else Nothing

derive instance eqDate :: Eq Date
derive instance ordDate :: Ord Date
derive instance genericDate :: Generic Date

instance boundedDate :: Bounded Date where
  bottom = Date bottom bottom bottom
  top = Date top top top

instance showDate :: Show Date where
  show (Date y m d) = "(Date " <> show y <> " " <> show m <> " " <> show d <> ")"

-- | The year component of a date value.
year :: Date -> Year
year (Date y _ _) = y

-- | The month component of a date value.
month :: Date -> Month
month (Date _ m _) = m

-- | The day component of a date value.
day :: Date -> Day
day (Date _ _ d) = d

-- | The weekday for a date value.
weekday :: Date -> Weekday
weekday = unsafePartial \(Date y m d) ->
  let n = runFn3 calcWeekday y (fromEnum m) d
  in if n == 0 then fromJust (toEnum 7) else fromJust (toEnum n)

-- | Calculates the difference between two dates, returning the result as a
-- | duration.
diff :: forall d. Duration d => Date -> Date -> d
diff (Date y1 m1 d1) (Date y2 m2 d2) =
  toDuration $ runFn6 calcDiff y1 (fromEnum m1) d1 y2 (fromEnum m2) d2

-- | Is this year a leap year according to the proleptic Gregorian calendar?
isLeapYear :: Year -> Boolean
isLeapYear y = (mod y' 4 == 0) && ((mod y' 400 == 0) || not (mod y' 100 == 0))
  where
  y' = fromEnum y

-- TODO: these could (and probably should) be implemented in PS
foreign import canonicalDateImpl :: Fn4 (Year -> Int -> Day -> Date) Year Int Day Date
foreign import calcWeekday :: Fn3 Year Int Day Int
foreign import calcDiff :: Fn6 Year Int Day Year Int Day Milliseconds
