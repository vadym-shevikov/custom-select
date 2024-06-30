export const config = {
  apiUrl: "https://parseapi.back4app.com/classes",
  applicationId: "zsSkPsDYTc2hmphLjjs9hz2Q3EXmnSxUyXnouj1I",
  masterKey: "4LuCXgPPXXO2sU5cXm6WwpwzaKyZpo3Wpj4G4xXK",
  gitHubUrl: "https://github.com/vadym-shevikov/ensuria-test",

  get defaultHeaders() {
    return {
      "X-Parse-Application-Id": this.applicationId, // This is the fake app's application id
      "X-Parse-Master-Key": this.masterKey, // This is the fake app's readonly master key
    };
  },
};
