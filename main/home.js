import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity, SafeAreaView, Pressable, TouchableHighlight } from 'react-native';
import { DataTable } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import Modal from 'modal-react-native-web';
// import Modal from 'modal-enhanced-react-native-web';

const numberOfItemsPerPageList = [2, 3, 4];

const theme = {
   ...DefaultTheme,
   dark: false,
   colors: {
      ...DefaultTheme.colors,
      backdrop: "#ffffff",

      background: "#ffffff",
      // text:"#ffffff",

   },
   // fonts: Fonts;
};

function HomeScreen({navigation}) {
   const [state, setState] = useState([])
   const [mainData, setMainData] = useState([]);
   const [text, setText] = React.useState('');
   const [selected, setSelected] = React.useState('');
   const [modalTitle, setModalTitle] = React.useState('');
   const [modalBody, setModalBody] = React.useState('');
   const [modalVisible, setModalVisible] = useState(false);

   useEffect(() => {
      function fetchData() {
         return fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((responseData) => {
               // console.log("responseData", responseData);
               setState(responseData);
               setMainData(responseData)
               return responseData;
            })
      }
      fetchData();
   }, []);

   const [page, setPage] = React.useState(0);
   const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
   const from = page * numberOfItemsPerPage;
   const to = Math.min((page + 1) * numberOfItemsPerPage, state.length);

   React.useEffect(() => {
      setPage(0);
   }, [numberOfItemsPerPage]);

   const onChangeText = text => {
      if (text == "") {
         setState(mainData);
      } else {
         var data = state.filter(item => item.title.includes(text));
         setState(data);
      }
      setText(text);
   }

   const clearHistory = () => {
      setState(mainData);
      setText('');
   }

   const onValueChange = (item, i) => {
      console.log(item, i);
      setSelected(item);
   }

   const showTitle = (value) => {
      setModalBody(value)
      setModalTitle("Title");
      setModalVisible(true);
   }

   const showBody = (value) => {
      setModalBody(value)
      setModalTitle("Body");
      setModalVisible(true);
   }

   const offModal = () => {
      setModalVisible(false);
   }

   const nextPage = () => {
      console.log("nextPage");
      navigation.navigate('About', {
         itemId: 86
      });
   }

   return (
      <View>
         {/* <SafeAreaView style={{ flexDirection: 'row' }}>
            <Picker
               selectedValue={selected}
               onValueChange={onValueChange}
               style={styles.picker}
            >
               <Picker.Item label="Name" value="name" />
               <Picker.Item label="Email" value="email" />
               <Picker.Item label="Title" value="js" />
            </Picker>
            <TextInput style={styles.input} value={text} onChangeText={onChangeText} placeholder="Search By Word" />
         </SafeAreaView> */}
         {/* <Button  onPress={clearHistory} title="Clear"> */}
         <PaperProvider theme={theme}>
            <DataTable style={{
               borderColor: '#000000',
               borderWidth: 1,
            }}>
               <DataTable.Header>
                  <DataTable.Title >Id</DataTable.Title>
                  <DataTable.Title>User Id</DataTable.Title>
                  <DataTable.Title>Title</DataTable.Title>
                  <DataTable.Title>Body</DataTable.Title>
               </DataTable.Header>

               {
                  state
                     .slice(from, to)
                     .map((item, i) => {
                        return (
                           <DataTable.Row key={i}>
                              <DataTable.Cell style={styles.innerText}>
                                 {item.id}
                              </DataTable.Cell>
                              <DataTable.Cell style={{...styles.innerText,marginLeft:80}}>
                                 {item.userId}
                              </DataTable.Cell>
                              <DataTable.Cell style={styles.innerText}>
                                 <Text onPress={() => showTitle(item.title)}>
                                    {item.title}
                                 </Text>
                              </DataTable.Cell >
                              <DataTable.Cell style={styles.innerText} onPress={() => showBody(item.body)}>
                                 {item.body}
                              </DataTable.Cell>
                              <DataTable.Cell >
                                 <Button
                                    onPress={nextPage}
                                    title="Next"
                                    color="grey"
                                    accessibilityLabel="Learn more about this purple button" />
                              </DataTable.Cell>
                           </DataTable.Row>
                        );
                     })}

               <DataTable.Pagination
                  page={page}
                  numberOfPages={Math.ceil(state.length / numberOfItemsPerPage)}
                  onPageChange={page => setPage(page)}
                  label={`${from + 1}-${to} of ${state.length}`}
                  showFastPaginationControls
                  numberOfItemsPerPageList={numberOfItemsPerPageList}
                  numberOfItemsPerPage={numberOfItemsPerPage}
                  onItemsPerPageChange={onItemsPerPageChange}
                  selectPageDropdownLabel={'Rows per page'}
               />
            </DataTable>
         </PaperProvider>
         <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
               Alert.alert("Modal has been closed.");
               setModalVisible(!modalVisible);
            }}
         >
            <TouchableOpacity
               // style={styles.container}
               activeOpacity={1}
               onPressOut={() => { setModalVisible(false) }}
            >
               <View style={styles.modalOverlay} />
               <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                     <View style={{
                        flexDirection: 'row'
                     }}>
                        <Text>{modalTitle}</Text>
                        <TouchableHighlight style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
                           <Text>X</Text>
                        </TouchableHighlight>
                     </View>
                     <Text style={{ ...styles.modalText, marginTop: "20px" }}>{modalBody}</Text>



                  </View>
               </View>
            </TouchableOpacity>
         </Modal >
      </View >
   )
}


const styles = StyleSheet.create({
   baseText: {
      fontWeight: 'bold'
   },
   innerText: {
      color: 'black',
      width: "auto"
   },
   input: {
      height: 40,
      margin: 12,
      // borderWidth: 1,
      padding: 10,
      width: "100%"
   },
   picker: {
      height: 40,
      margin: 12,
      borderColor: "grey",
      // borderWidth: 1,
      padding: 10
   },
   centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
   },
   modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
   },
   button: {
      marginLeft: "100%",
      marginBottom: "10px",
      borderBottomColor: 'grey',
      borderBottomWidth: 1,
   }
});

export default HomeScreen