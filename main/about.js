import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity, SafeAreaView, Pressable, TouchableHighlight } from 'react-native';
import { DataTable } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider, Card, Title } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import Modal from 'modal-react-native-web';


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


const About = ({ route, navigation }) => {
   console.log(route, navigation);
   const itemId = route.params.itemId;
   const [tableData, setTableData] = useState([]);
   const [state, setState] = useState([])
   const [mainData, setMainData] = useState([]);
   const [text, setText] = React.useState('');
   const [selected, setSelected] = React.useState('name');
   const [modalTitle, setModalTitle] = React.useState('');
   const [modalBody, setModalBody] = React.useState('');
   const [modalVisible, setModalVisible] = useState(false);

   useEffect(() => {
      function fetchData() {
         return fetch('https://jsonplaceholder.typicode.com/comments?postId=' + itemId)
            .then((response) => response.json())
            .then((responseData) => {
               // console.log("responseData", responseData);
               setState(responseData);
               setMainData(responseData)
               return responseData;
            })
      }
      function fetchPrevData() {

         return fetch('https://jsonplaceholder.typicode.com/posts/' + itemId)
            .then((response) => response.json())
            .then((responseData) => {
               // console.log("responseData", responseData);
               setTableData(responseData);
               return responseData;
            })
      }
      fetchData();
      fetchPrevData();
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
         var data = state.filter(item => {
            console.log("item[selected]",selected,item[selected]);
            return item[selected].includes(text)
         });
         setState(data);
      }
      setText(text);
   }

   const onValueChange = (item, i) => {
      console.log(item, i);
      setSelected(item);
   }

   const showEmail = (value) => {
      setModalBody(value)
      setModalTitle("Email");
      setModalVisible(true);
   }

   const showBody = (value) => {
      setModalBody(value)
      setModalTitle("Body");
      setModalVisible(true);
   }
   console.log("tableData", tableData);

   return (
      <View>
         <View style={{ borderColor:"grey",borderWidth: 1,marginLeft:"1%",width:"fit-content", padding:5}}>
            <Text> Id : {tableData.id} </Text>
            <Text> userId : {tableData.userId} </Text>
            <Text> title : {tableData.title} </Text>
            <Text> body : {tableData.body} </Text>
         </View>
         <SafeAreaView style={{ flexDirection: 'row' }}>
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
         </SafeAreaView>
         <PaperProvider theme={theme}>
            <DataTable style={{
               borderColor: '#000000',
               borderWidth: 1,
            }}>
               <DataTable.Header>
                  <DataTable.Title>Id</DataTable.Title>
                  <DataTable.Title>Name</DataTable.Title>
                  <DataTable.Title>Email</DataTable.Title>
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
                              <DataTable.Cell style={styles.innerText} onPress={() => {
                                 setModalBody(item.name)
                                 setModalTitle("Name");
                                 setModalVisible(true);
                              }}>
                                 {item.name}
                              </DataTable.Cell>
                              <DataTable.Cell style={styles.innerText}>
                                 <Text onPress={() => {
                                    setModalBody(item.email)
                                    setModalTitle("Email");
                                    setModalVisible(true);
                                 }}>
                                    {item.email}
                                 </Text>
                              </DataTable.Cell >
                              <DataTable.Cell style={styles.innerText} onPress={() => {
                                 setModalBody(item.body)
                                 setModalTitle("Body");
                                 setModalVisible(true);
                              }}>
                                 {item.body}
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
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: "auto"
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

export default About