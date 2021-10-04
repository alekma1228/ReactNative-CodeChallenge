# Clearbridge React Native coding challenge project

> TEST project by Alex Li

# Important Dependencies

styled components (https://styled-components.com) - UI styling library

react hooks (part of react/react-native, https://reactjs.org/docs/hooks-intro.html): 

redux (https://redux.js.org) - state management
redux toolkit (https://redux-toolkit.js.org; https://redux-toolkit.js.org/tutorials/quick-start is a good tutorial) - greatly simplifies working with redux
redux observable (https://redux-observable.js.org) - brings observables into the redux world. Redux only supports synchronous operations. We use redux-observable as a plugin to allow asynchronous operations like Rest API requests.

# Code Conventions

- Main screens should go in the src/ui directory.
- Separate screens (UI), styles (UI styling), and logic (hooks) for the screens.
- React components should be functional instead of class based and use hooks for their logic.

# App Event Architecture

Detailed flow:

user event, e.g. pulling down to refresh -> call a function provided by a hook -> dispatch redux action -> redux updates state from action (optional) -> trigger redux observable epic (optional) -> await on Rest API call (api.ts) -> dispatch result if any as a redux action

For example after search restaurant, main screen shows restaurant list.
This screen is declared in the src/ui/home/Home.screen.tsx. It gets the restaurant list from src/ui/home/Home.hooks.ts:

```
const {
    merchants,
    isRefreshingMerchants,
    refreshMerchants,
    address,
    setAddress,
    zipcode,
    setZipcode,
    onShare,
    onSearch,
  } = useHome()

```

refreshMerchants is declared in Home.hooks.ts:

```
  const getMerchants = useMerchantAction('get_merchants')
  const refreshMerchants = useCallback(() => {
    ...
    getMerchants({ address, zipcode })
    ...
  }, [address, zipcode]

```

These do the same thing by creating and dispatching a redux action which is a simple object with an event name and an optional "payload" which can be any data.

Redux declares this action and the structure of the payload in merchant.slice.ts:
```
    get_merchants: (state, { payload }: PayloadAction<{ address: string; zipcode: string }>) => {
      // handled in epic
      state.isRefreshingMerchants = true
      ...
    },
    set_merchants: (state, { payload }: PayloadAction<{ merchants: Merchant[] }>) => {
      state.merchants = payload.merchants
      ...
    },
```

This is part of a redux toolkit slice which controls a "slice" or section of the app's global state. It sets an restaurant array in the state. Note that the payload is declared as a restaurant array here. Restaurant array is reached from server. This triggers the screen to refresh and show the restaurant list because of this line in Home.hooks.ts:

```
const { merchants, isRefreshingMerchants, searchAddress, searchZipcode } = useASelector((state) => state.merchant)
```

useASelector gets a piece of the redux state and returns it. It is called automatically every time the state changes and returns a new value if the value you are selecting changes. That new value is then returned to the screen which triggers a re-render if you use this in your screen like so:

```
      <FlatList<Merchant>
        data={merchants}
        ...
      />
```

After this update happens redux will trigger any redux-observable Epics that are listening for the get_merchants action. Epics are used for asynchronous actions such as server calls. In this case in src/redux/epics/merchant.epic.ts:

```
e[e.length] = (action$, _state$, {}) =>
  action$.pipe(
    filter(merchantActions.get_merchants.match),
    switchMap(
      async ({ payload }): Promise<AnyAction[]> => {
        const res = await fetchMerchants(payload.address, payload.zipcode)
        if (res.isSuccess) {
          return [merchantActions.set_merchants({ merchants: res.result.merchants })]
        } else {
          return [merchantActions.set_merchants({ merchants: [] })]
        }
      },
    ),
    concatAll(),
  )

```

This is rxjs observable code. ```filter(merchantActions.get_merchants.match)``` causes this to filter out any actions that do not match the get_merchants type. Then body of the function after ```async ({ payload }): Promise<AnyAction[]> => {``` is called with the payload. The body then calls the rest api and, returns some more actions to set the results into the redux state. Note that any actions you return here are automatically dispatched in order and synchronously.

## Description

Clearbridge React Native coding challenge 

## Installation

Make sure your version of [yarn](https://www.yarnpkg.com/) is up to date, e.g. assuming you've installed [node](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm):

```
npm install -g yarn

```

Please copy react native project
Once the project is copied, you must open a terminal or console window, cd into the react native project directory, and run `yarn install`.

If you're uing MacOS you can build-and run for an iOS target using Xcode, even if you don't have an iOS device. First run `cd ios; pod install; cd ..` (requires that you've installed [cocoapods](https://cocoapods.org/). Then open the Xcode workspace (NOT the Xcode _project_) `ios/app.xcworkspace`. Select an iOS Simulator Target and Command-R will build and run.

On MacOS or Windows you can build and run on Android, even if you don't have an Android device. Install [Android Studio](https://developer.android.com/studio/install). Add an existing project and navigate to the `android` directory. Android Studio often prints scary warnings when opening react-native apps. Clicking the trash can icon to clear the Gradle console will erase these. Use the Android Virtual Device mangement tools to create a virtual android device, selecting the newest version of Android operating system to put on it. The first time you run Android studio it may need to update and install components. It's not uncommon to need to quit and re-run Android studio after an update to get it to work properly. Clicking the Bug button in the toolbar will build-and run.

## Run iOS application
```
yarn ios
```

## Run Android application
```
yarn android
```

## Check typescript error
```
yarn tsc
```

## Check lint error and fix
```
yarn lint
yarn lint --fix
```

## Common Issues

- After running from Xcode, if the app doesn't work

  1.) Try closing the Terminal window running the Metro bundler, and then re-run from Xcode.

  2.) Try doing a clean build in Xcode and then build-and run

  3.) Try running `yarn` again to install any new dependencies

