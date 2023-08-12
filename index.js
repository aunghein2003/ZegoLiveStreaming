import {Navigation} from 'react-native-navigation';
import App from './App';
import VideoConference from './components/VideoConference';
import VideoConferenceTwo from './components/VideoConferenceTwo';
import CustomizedConference from './components/customized/CustomizedConference';
import JoinMeeting from './components/customized/JoinMeeting';

Navigation.registerComponent('App', () => App);
Navigation.registerComponent('VideoConference', () => VideoConference);
Navigation.registerComponent('VideoConferenceTwo', () => VideoConferenceTwo);
Navigation.registerComponent(
  'CustomizedConference',
  () => CustomizedConference,
);
Navigation.registerComponent('JoinMeeting', () => JoinMeeting);

Navigation.setDefaultOptions({
  topBar: {
    visible: false,
  },
});

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'App',
            },
          },
        ],
      },
    },
  });
});
