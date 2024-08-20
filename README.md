# Press and Hold "w" to change the background - React + TypeScript + Tailwind


### `usePressAndHold` hook
- Accepts a keyboard `key`, `holdDuration`, and set of callbacks
- Returns `status` and `progress`
- When the key is pressed, it sets the status to `pressed` and fires `onKeyDown` callback
- When the key is lifted, it sets the status back to `idle` and fires `onKeyUp` callback
- When max hold duration is reached, it sets the status to `completed` and fires `onComplete` callback

### `App`
- Using `usePressAndHold` hook to listen to "w" key event
- Show a progress bar while holding "w"
- Change background color once progress reaches the end

