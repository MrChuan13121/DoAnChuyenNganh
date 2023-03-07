echo export "JAVA_HOME=\$(/usr/libexec/java_home)" >> ~/.zshrc
sources ~/.zshrc

cd android/ && ./gradlew clean && cd ..


###
Fix Firebase Missing Keystore for React Native App
https://gist.github.com/cbedroid/277099b9ff2875108d34d03b76b089f6

Generate new keystore certificate

For more info, visit https://rnfirebase.io/

 # Open your terminal 
 # Enter the following to generate your missing key. (if fails, try elevating your privileges with `sudo`).
 
  keytool -genkey -v -keystore ~/.android/debug.keystore -storepass android -alias androiddebugkey -keypass android -dname "CN=Android Debug,O=Android,C=US"

# Navigate to your `android` directory inside your React Native app, and re-run `./gradlew signingReport`
  
  cd <your-project-name>/android/
  ./gradlew signingReport