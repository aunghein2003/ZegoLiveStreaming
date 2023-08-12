import React, {useEffect, useState} from 'react';
import {
  NativeBaseProvider,
  Box,
  VStack,
  Text,
  Stack,
  Input,
  Button,
  Center,
  Heading,
} from 'native-base';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';

interface AppProps {}

const App: NavigationFunctionComponent<AppProps> = ({componentId}) => {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [conferenceID, setConferenceID] = useState('');

  useEffect(() => {
    setUserId(String(Math.floor(Math.random() * 10000)));
  }, []);

  const joinOrCreateMeeting = () => {
    console.log({
      userId: userId,
      username: username,
      conferenceId: conferenceID,
    });

    Navigation.push(componentId, {
      component: {
        name: 'VideoConference',
        passProps: {
          userId: userId,
          username: username,
          conferenceId: conferenceID,
        },
      },
    });
  };

  return (
    <NativeBaseProvider>
      <Box safeArea p={5} mt={7} h={'full'} bg={'white'}>
        <Center mb={5}>
          <Heading>Zego Conferencing</Heading>
        </Center>
        <VStack space={7}>
          <Stack flexDirection={'column'} space={3}>
            <Text fontSize={'md'}>Your Name:</Text>
            <Input
              type="text"
              placeholder="Enter your name in meeting"
              rounded={'md'}
              value={username}
              onChangeText={text => setUsername(text)}
            />
          </Stack>
          <Stack flexDirection={'column'} space={3}>
            <Text fontSize={'md'}>Conference ID:</Text>
            <Input
              type="text"
              placeholder="Enter the conference ID"
              rounded={'md'}
              value={conferenceID}
              onChangeText={text => setConferenceID(text)}
            />
          </Stack>
          <Button
            rounded={'md'}
            mt={3}
            disabled={conferenceID.length === 0 || username.length === 0}
            bg={
              conferenceID.length === 0 || username.length === 0
                ? 'blue.400'
                : 'blue.600'
            }
            onPress={() => {
              joinOrCreateMeeting();
            }}>
            Join a meeting
          </Button>
          <Button
            rounded={'md'}
            mt={3}
            disabled={conferenceID.length === 0 || username.length === 0}
            bg={
              conferenceID.length === 0 || username.length === 0
                ? 'blue.400'
                : 'blue.600'
            }
            onPress={() => {
              Navigation.push(componentId, {
                component: {
                  name: 'VideoConferenceTwo',
                  passProps: {
                    userId: userId,
                    username: username,
                    conferenceId: conferenceID,
                  },
                },
              });
            }}>
            Join a meeting 2
          </Button>
          <Button
            rounded={'md'}
            mt={3}
            disabled={conferenceID.length === 0 || username.length === 0}
            bg={
              conferenceID.length === 0 || username.length === 0
                ? 'blue.400'
                : 'blue.600'
            }
            onPress={() => {
              Navigation.push(componentId, {
                component: {
                  name: 'CustomizedConference',
                  passProps: {
                    userId: userId,
                    username: username,
                    conferenceId: conferenceID,
                  },
                },
              });
            }}>
            Join Customized Meeting
          </Button>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default App;
