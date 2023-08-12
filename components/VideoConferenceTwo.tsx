import {
  Box,
  Button,
  HStack,
  Heading,
  NativeBaseProvider,
  ScrollView,
  View,
} from 'native-base';
import React from 'react';
import {findNodeHandle} from 'react-native';
import {Navigation, NavigationComponent} from 'react-native-navigation';
import ZegoExpressEngine, {
  ZegoPublishChannel,
  ZegoRoomConfig,
  ZegoTextureView,
  ZegoVideoSourceType,
} from 'zego-express-engine-reactnative';
import {profile} from '../profile';

interface VideoConferenceTwoProps {
  userId: string;
  username: string;
  conferenceId: string;
}

export default class VideoConferenceTwo extends NavigationComponent<VideoConferenceTwo> {
  constructor(props: VideoConferenceTwoProps) {
    super(props);
  }

  roomConfig = new ZegoRoomConfig(5, true, '');

  componentDidMount(): void {
    ZegoExpressEngine.createEngineWithProfile(profile).then(_ => {
      console.log('Create Engine');
    });
  }

  componentWillUnmount(): void {
    if (ZegoExpressEngine.instance()) {
      ZegoExpressEngine.destroyEngine();
      console.log('Destroy Engine');
    }
  }

  startMeeting() {
    // ZegoExpressEngine.instance().loginRoom(
    //   this.props.conferenceId,
    //   {userID: this.props.userId, userName: this.props.username},
    //   this.roomConfig,
    // );
    ZegoExpressEngine.instance().startPreview({
      reactTag: findNodeHandle(this.refs.zego_preview_view),
      viewMode: 0,
      backgroundColor: 0,
    });
    // ZegoExpressEngine.instance().on(
    //   'roomStateUpdate',
    //   (roomID, state, errorCode, extendedData) => {
    //     console.log(
    //       'JS onRoomStateUpdate: ' +
    //         state +
    //         ' roomID: ' +
    //         roomID +
    //         ' err: ' +
    //         errorCode +
    //         ' extendData: ' +
    //         extendedData,
    //     );
    //   },
    // );
    // ZegoExpressEngine.instance().on(
    //   'roomUserUpdate',
    //   (roomID, updateType, userList) => {
    //     console.log(
    //       'JS onRoomUserUpdate: ' +
    //         ' roomID: ' +
    //         roomID +
    //         ' updateType: ' +
    //         updateType +
    //         ' userList: ' +
    //         userList,
    //     );
    //   },
    // );
  }

  startStreaming() {
    // Stop the local preview.
    ZegoExpressEngine.instance().stopPreview();

    ZegoExpressEngine.instance().loginRoom(
      this.props.conferenceId,
      {userID: this.props.userId, userName: this.props.username},
      this.roomConfig,
    );

    ZegoExpressEngine.instance().startPublishingStream('333');
    ZegoExpressEngine.instance().startPlayingStream('333', {
      reactTag: findNodeHandle(this.refs.zego_play_view),
      viewMode: 0,
      backgroundColor: 0,
    });
  }

  stopStreaming() {
    // Stop the local preview.
    ZegoExpressEngine.instance().stopPreview();
    /** Stop publishing streams. */
    ZegoExpressEngine.instance().stopPublishingStream();
    // Stop playing streams.
    ZegoExpressEngine.instance().stopPlayingStream('333');
    ZegoExpressEngine.instance().stopPlayingStream('444');
    // Log out of a room.
    ZegoExpressEngine.instance().logoutRoom(this.props.conferenceID);
    Navigation.push(this.props.componentId, {
      component: {
        name: 'App',
      },
    });
  }

  startScreenShare() {
    ZegoExpressEngine.instance().stopPlayingStream('333');
    ZegoExpressEngine.instance().setVideoSource(
      ZegoVideoSourceType.ScreenCapture,
      ZegoPublishChannel.Aux,
    );
    ZegoExpressEngine.instance().startScreenCapture();
    ZegoExpressEngine.instance().startPublishingStream(
      '444',
      ZegoPublishChannel.Aux,
    );
    // To play streams, the streamID used by the user who initiated the Screen Sharing needs to be passed in when publishing streams.
    ZegoExpressEngine.instance().startPlayingStream('444', {
      reactTag: findNodeHandle(this.refs.zego_screen_share),
      viewMode: 0,
      backgroundColor: 0,
    });
  }

  render(): React.ReactNode {
    return (
      <NativeBaseProvider>
        <Box safeArea h={'full'} bgColor={'white'}>
          <ScrollView>
            <Heading>Video Conference</Heading>
            <HStack space={5}>
              <Button onPress={this.startMeeting.bind(this)}>
                Start Meeting
              </Button>
              <Button onPress={this.startStreaming.bind(this)}>Go Live</Button>
              <Button onPress={this.stopStreaming.bind(this)}>
                Stop Meeting
              </Button>
              <Button onPress={this.startScreenShare.bind(this)}>
                Start Screenshare
              </Button>
            </HStack>

            <View style={{height: 200}}>
              {/* <ZegoTextureView ref={`zego_preview_view`} /> */}
              <ZegoTextureView ref="zego_preview_view" style={{height: 200}} />
            </View>

            <View style={{height: 200}}>
              {/* <ZegoTextureView ref={`zego_preview_view`} /> */}
              <ZegoTextureView ref="zego_play_view" style={{height: 200}} />
            </View>
            <View style={{height: 200}}>
              {/* <ZegoTextureView ref={`zego_preview_view`} /> */}
              <ZegoTextureView ref="zego_screen_share" style={{height: 200}} />
            </View>
          </ScrollView>
        </Box>
      </NativeBaseProvider>
    );
  }
}
