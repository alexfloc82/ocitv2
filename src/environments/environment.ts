// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDvvL3Rfn81De5T7mkDiVBi_nnJCRVvNwk",
    authDomain: "gipar-dev.firebaseapp.com",
    databaseURL: "https://gipar-dev.firebaseio.com",
    projectId: "gipar-dev",
    storageBucket: "gipar-dev.appspot.com",
    messagingSenderId: "167161467012"
  }
};
