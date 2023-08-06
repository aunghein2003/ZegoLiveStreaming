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

  const joinOrCreateMeeting = (conf_id: string) => {
    console.log({
      userId: userId,
      username: username,
      conferenceId: conf_id,
    });

    Navigation.push(componentId, {
      component: {
        name: 'VideoConference',
        passProps: {
          userId: userId,
          username: username,
          conferenceId: conf_id,
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
              joinOrCreateMeeting(conferenceID);
            }}>
            Join a meeting
          </Button>
          {/* <Center my={'3'}>
            <Text fontSize={'md'} color={'coolGray.500'}>
              - - - - - - - - - - OR- - - - - - - - - -
            </Text>
          </Center>

          <Button
            disabled={username.length === 0}
            bg={username.length === 0 ? 'blue.400' : 'blue.600'}
            rounded={'md'}
            onPress={() =>
              joinOrCreateMeeting(String(Math.floor(Math.random() * 10000)))
            }>
            Start a conference
          </Button> */}
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default App;
