// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //dev
  firebase: {
    apiKey: "AIzaSyALka-K-dxDyAfPpJPcmIh0ezX0lQYVrwQ",
    authDomain: "ocitv-dev.firebaseapp.com",
    databaseURL: "https://ocitv-dev.firebaseio.com",
    projectId: "ocitv-dev",
    storageBucket: "ocitv-dev.appspot.com",
    messagingSenderId: "709455507086"
  },
  //prod
  /*firebase: {
    apiKey: "AIzaSyAMoVCjNT323p6BJS11o6qiqbJOwH9IXck",
    authDomain: "ocitv-complutense.firebaseapp.com",
    databaseURL: "https://ocitv-complutense.firebaseio.com",
    projectId: "ocitv-complutense",
    storageBucket: "",
    messagingSenderId: "319794440492"
  }*/
};
