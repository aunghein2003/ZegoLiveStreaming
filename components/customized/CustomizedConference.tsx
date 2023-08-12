import React, {useEffect, useRef} from 'react';
import {Box, Button, Heading, NativeBaseProvider, View} from 'native-base';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import ZegoExpressEngine, {
  ZegoTextureView,
} from 'zego-express-engine-reactnative';
import {profile} from '../../profile';
import {findNodeHandle} from 'react-native';

interface CustomizedConferenceProps {
  userId: string;
  username: string;
  conferenceId: string;
}

const CustomizedConference: NavigationFunctionComponent<
  CustomizedConferenceProps
> = ({userId, username, conferenceId, componentId}) => {
  const localPreview = useRef(null);

  useEffect(() => {
    ZegoExpressEngine.createEngineWithProfile(profile).then(_ => {
      console.log('Create Engine');
      ZegoExpressEngine.instance().startPreview({
        reactTag: findNodeHandle(localPreview.current),
        viewMode: 0,
        backgroundColor: 0,
      });
    });

    return () => {
      if (ZegoExpressEngine.instance()) {
        ZegoExpressEngine.destroyEngine().then(() => {
          console.log('Destroy Engine');
        });
      }
    };
  }, []);

  return (
    <NativeBaseProvider>
      <Box safeArea h={'full'} p={3} bg={'white'}>
        <Heading alignSelf={'center'} mb={5}>
          Preview
        </Heading>
        <View h={'3/4'}>
          <ZegoTextureView ref={localPreview} style={{height: '100%'}} />
        </View>
        <Button
          mt={5}
          maxW={'1/2'}
          alignSelf={'center'}
          bg={'blue.600'}
          onPress={() => {
            ZegoExpressEngine.instance().stopPreview();
            Navigation.push(componentId, {
              component: {
                name: 'JoinMeeting',
                passProps: {
                  userId,
                  username,
                  conferenceId,
                },
              },
            });
          }}>
          Join Meeting
        </Button>
      </Box>
    </NativeBaseProvider>
  );
};
export default CustomizedConference;
