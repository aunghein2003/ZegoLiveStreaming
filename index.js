import {Navigation} from 'react-native-navigation';
import App from './App';
import VideoConference from './VideoConference';

Navigation.registerComponent('App', () => App);
Navigation.registerComponent('VideoConference', () => VideoConference);

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
