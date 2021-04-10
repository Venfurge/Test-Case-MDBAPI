// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//The Movie Database API Url and Key
const apiUrl = "https://api.themoviedb.org/3/";
const apiKey = "9c6ec8ea78c140907538e9eb3eb20c1e";

export const environment = {
  production: false,
  apiUrl: apiUrl,
  apiKey: apiKey,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
