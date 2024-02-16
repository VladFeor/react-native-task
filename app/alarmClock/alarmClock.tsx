// import React, { useEffect, useState } from 'react';
// import { View, Button, Text, Platform } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import PushNotification from 'react-native-push-notification';

// const AlarmClock = () => {
//   const [alarmTime, setAlarmTime] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);

//   const handleTimeChange = (event: any, selectedTime: React.SetStateAction<Date>) => {
//     if (selectedTime) {
//       setAlarmTime(selectedTime);
//     }
//     setShowPicker(Platform.OS === 'ios');
//   };

//   const showTimePicker = () => {
//     setShowPicker(true);
//   };

//   const setAlarm = () => {
//     const notificationTime = alarmTime.getTime() - Date.now();

//     if (notificationTime > 0) {
//       PushNotification.localNotificationSchedule({
//         message: 'Time to wake up!',
//         date: new Date(Date.now() + notificationTime),
//       });

//       console.log('Alarm set for:', alarmTime);
//     } else {
//       console.log('Invalid alarm time');
//     }
//   };

//   useEffect(() => {
//     PushNotification.configure({
//       onNotification: function (notification: any) {
//         console.log('Notification:', notification);
//       },
//       requestPermissions: Platform.OS === 'ios',
//     });
//   }, []);

//   return (
//     <View>
//       <Text>Set Alarm Time:</Text>
//       <Button title="Pick Time" onPress={showTimePicker} />

//       {showPicker && (
//         <DateTimePicker
//           value={alarmTime}
//           mode="time"
//           is24Hour={true}
//           display="default"
//           onChange={() => handleTimeChange}
//         />
//       )}

//       <Button title="Set Alarm" onPress={setAlarm} />
//     </View>
//   );
// };

// export default AlarmClock;