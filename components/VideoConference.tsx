import React from 'react';
import {Box, NativeBaseProvider} from 'native-base';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import ZegoUIKitPrebuiltVideoConference from '@zegocloud/zego-uikit-prebuilt-video-conference-rn';

interface VideoConferenceProps {
  userId: string;
  username: string;
  conferenceId: string;
}

const VideoConference: NavigationFunctionComponent<VideoConferenceProps> = ({
  userId,
  username,
  conferenceId,
  componentId,
}) => {
  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} alignItems={'center'} justifyContent={'center'}>
        <ZegoUIKitPrebuiltVideoConference
          appID={1912418570}
          appSign="358f2fafc90618d96d00a480b743b39e546105353df335ed03a49c4845f92e87"
          userID={userId}
          userName={username}
          conferenceID={conferenceId}
          config={{
            onLeave: () => {
              Navigation.push(componentId, {
                component: {
                  name: 'App',
                },
              });
            },
          }}
        />
      </Box>
    </NativeBaseProvider>
  );
};

export default VideoConference;
