import React, {useEffect, useRef, useState} from 'react';
import {
  Badge,
  Box,
  HStack,
  NativeBaseProvider,
  Pressable,
  Text,
  View,
  ZStack,
} from 'native-base';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import ZegoExpressEngine, {
  ZegoAudioSourceType,
  ZegoPublishChannel,
  ZegoRoomConfig,
  ZegoTextureView,
  ZegoVideoSourceType,
} from 'zego-express-engine-reactnative';
import {findNodeHandle} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPhone,
  faVideo,
  faVideoSlash,
  faCameraRotate,
  faArrowUpFromBracket,
  faStop,
  faMicrophone,
  faMicrophoneSlash,
} from '@fortawesome/free-solid-svg-icons';

interface JoinMeetingProps {
  userId: string;
  username: string;
  conferenceId: string;
}

const JoinMeeting: NavigationFunctionComponent<JoinMeetingProps> = ({
  userId,
  username,
  conferenceId,
  componentId,
}) => {
  const playView = useRef(null);
  const screenShareView = useRef(null);

  const [view, setView] = useState<'play' | 'screen-share'>('play');
  const [frontCam, setFrontCam] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [openMicrophone, setOpenMicrophone] = useState(true);

  useEffect(() => {
    const roomConfig = new ZegoRoomConfig(5, true, '');
    ZegoExpressEngine.instance().loginRoom(
      conferenceId,
      {
        userID: userId,
        userName: username,
      },
      roomConfig,
    );
    ZegoExpressEngine.instance().startPublishingStream(
      '333',
      ZegoPublishChannel.Main,
    );
    ZegoExpressEngine.instance().startPlayingStream('333', {
      reactTag: findNodeHandle(playView.current),
      viewMode: 0,
      backgroundColor: 0,
    });
  }, [userId, username, conferenceId]);

  const hangUpCall = () => {
    ZegoExpressEngine.instance().logoutRoom(conferenceId);
    if (ZegoExpressEngine.instance()) {
      ZegoExpressEngine.destroyEngine();
    }
    Navigation.push(componentId, {
      component: {
        name: 'App',
      },
    });
  };

  const screenSharing = () => {
    ZegoExpressEngine.instance().stopPublishingStream(ZegoPublishChannel.Main);
    ZegoExpressEngine.instance().stopPlayingStream('333');
    setView('screen-share');
    ZegoExpressEngine.instance().setVideoSource(
      ZegoVideoSourceType.ScreenCapture,
      ZegoPublishChannel.Aux,
    );
    // ZegoExpressEngine.instance().setAudioSource(
    //   ZegoAudioSourceType.ScreenCapture,
    //   ZegoPublishChannel.Aux,
    // );
    ZegoExpressEngine.instance().startScreenCapture();
    ZegoExpressEngine.instance().startPublishingStream(
      '444',
      ZegoPublishChannel.Aux,
    );
    // To play streams, the streamID used by the user who initiated the Screen Sharing needs to be passed in when publishing streams.
    ZegoExpressEngine.instance().startPlayingStream('444', {
      reactTag: findNodeHandle(screenShareView.current),
      viewMode: 0,
      backgroundColor: 0,
    });
  };

  const stopScreenSharing = () => {
    ZegoExpressEngine.instance().stopScreenCapture();
    ZegoExpressEngine.instance().stopPublishingStream(ZegoPublishChannel.Aux);
    ZegoExpressEngine.instance().stopPlayingStream('444');
    setView('play');
    ZegoExpressEngine.instance().startPublishingStream('333');
    ZegoExpressEngine.instance().startPlayingStream('333', {
      reactTag: findNodeHandle(playView.current),
      viewMode: 0,
      backgroundColor: 0,
    });
  };

  const toggleCamera = () => {
    console.log('You toggled camera');

    setFrontCam(!frontCam);
    ZegoExpressEngine.instance().useFrontCamera(
      frontCam,
      ZegoPublishChannel.Main,
    );
  };

  const cameraOnOff = () => {
    setOpenCamera(!openCamera);
    ZegoExpressEngine.instance().enableCamera(
      openCamera,
      ZegoPublishChannel.Main,
    );
  };

  const muteMicrophone = () => {
    setOpenMicrophone(!openMicrophone);
    ZegoExpressEngine.instance().muteMicrophone(openMicrophone);
  };

  return (
    <NativeBaseProvider>
      <Box safeArea w={'full'} h={'full'} bg={'white'}>
        <ZStack w={'full'} h={'full'} alignItems={'center'} bg={'white'}>
          <View w={'full'} h={'full'}>
            <ZegoTextureView
              ref={playView}
              style={{width: '100%', height: view === 'play' ? '100%' : '0'}}
            />
            <ZegoTextureView
              ref={screenShareView}
              style={{
                width: '100%',
                height: view === 'screen-share' ? '100%' : '0',
              }}
            />
          </View>

          <HStack
            w={'full'}
            h={'20'}
            px={2}
            space={3}
            bottom={'10'}
            justifyContent={'space-between'}>
            {openCamera ? (
              <Pressable onPress={cameraOnOff}>
                <Badge rounded={'full'} w={'16'} h={'16'} variant={'solid'}>
                  <FontAwesomeIcon icon={faVideoSlash} color="white" />
                </Badge>
              </Pressable>
            ) : (
              <Pressable onPress={cameraOnOff}>
                <Badge rounded={'full'} w={'16'} h={'16'} variant={'solid'}>
                  <FontAwesomeIcon icon={faVideo} color="white" />
                </Badge>
              </Pressable>
            )}
            <Pressable onPress={toggleCamera}>
              <Badge rounded={'full'} w={'16'} h={'16'} variant={'solid'}>
                <FontAwesomeIcon icon={faCameraRotate} color="white" />
              </Badge>
            </Pressable>
            <Pressable onPress={hangUpCall}>
              <Badge
                w={'16'}
                h={'16'}
                rounded={'full'}
                variant={'solid'}
                colorScheme={'error'}>
                <FontAwesomeIcon icon={faPhone} color="white" />
              </Badge>
            </Pressable>
            {view === 'play' ? (
              <Pressable onPress={screenSharing}>
                <Badge rounded={'full'} w={'16'} h={'16'} variant={'solid'}>
                  <FontAwesomeIcon icon={faArrowUpFromBracket} color="white" />
                </Badge>
              </Pressable>
            ) : (
              <Pressable onPress={stopScreenSharing}>
                <Badge rounded={'full'} w={'16'} h={'16'} variant={'solid'}>
                  <FontAwesomeIcon icon={faStop} color="white" />
                </Badge>
              </Pressable>
            )}
            {openMicrophone ? (
              <Pressable onPress={muteMicrophone}>
                <Badge rounded={'full'} w={'16'} h={'16'} variant={'solid'}>
                  <FontAwesomeIcon icon={faMicrophone} color="white" />
                </Badge>
              </Pressable>
            ) : (
              <Pressable onPress={muteMicrophone}>
                <Badge rounded={'full'} w={'16'} h={'16'} variant={'solid'}>
                  <FontAwesomeIcon icon={faMicrophoneSlash} color="white" />
                </Badge>
              </Pressable>
            )}
          </HStack>
        </ZStack>
      </Box>
    </NativeBaseProvider>
  );
};
export default JoinMeeting;
