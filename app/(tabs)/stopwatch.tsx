import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, AppState } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


const Stopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [appState, setAppState] = useState<any>(AppState.currentState); // Оголошуємо локальний стан для appState

  const startStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current!);
    } else {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 30);
    }
    setIsRunning(!isRunning);
  };
  const recordLap = () => {
    setLaps([...laps, formatTime(elapsedTime)]);
  };

  const reset = () => {
    clearInterval(intervalRef.current!);
    setElapsedTime(0);
    setIsRunning(false);
    setLaps([]);
  };
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(2);
    const secondsWithZero = (+seconds < 10 ? '0' : '') + seconds;
    return `${minutes}:${secondsWithZero}`;
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState: string) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
      } else if (nextAppState.match(/inactive|background/)) {
        await scheduleNotification();
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState, elapsedTime]);

  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Секундомір у фоні',
        body: `Актуальний час: ${formatTime(elapsedTime)}`,
        data: { time: formatTime(elapsedTime) },
      },
      trigger: { seconds: 1 }, // Delay for demonstration purposes; adjust or remove as needed
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.greenBtn]} onPress={startStop}>
          <Text style={[styles.buttonText, styles.greenText]}>{isRunning ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={recordLap}>
          <Text style={[styles.buttonText]}>Lap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.redBtn]} onPress={reset}>
          <Text style={[styles.buttonText, styles.redText]}>Reset</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.lapsContainer} contentContainerStyle={styles.lapsContentContainer}>
        {laps.map((lap, index) => (
          <Text key={index} style={styles.lapText}>{`Lap ${index + 1}: ${lap}`}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    marginBottom: 20,
  },
  timerText: {
    marginTop: 150,
    fontSize: 72,
    color: '#ffff'
  },
  greenBtn: {
    backgroundColor: '#29d653'
  },
  greenText: {
    color: '#28813c'
  },
  redBtn: {
    backgroundColor: '#d22e2d'
  },
  redText: {
    color: '#851d23'
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '700'
  },
  button: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    borderRadius: 50,
  },
  lapsContainer: {
    // alignItems: 'flex-start',
    paddingHorizontal: 70,
    // textAlign:'center',
    maxHeight: 350,
    overflow: 'scroll'
  },
  lapsContentContainer: {
    alignItems: 'flex-start',
  },
  lapText: {
    fontSize: 32,
    marginBottom: 5,
    color: '#ffff'

  },
});

export default Stopwatch;
