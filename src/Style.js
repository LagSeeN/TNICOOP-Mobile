import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  //#region Global Style
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    color: '#3366FF',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Prompt-Bold'
  },
  //#endregion

  //#region pages/SearchCompany.js
  textInput: {
    height: 40,
    fontFamily: 'Prompt-Regular',
    width: 150
  },
  ImageIconStyle: {
    fontSize: 20,
    color: 'grey',
  },
  inputIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#3366FF',
    borderWidth: 2,
    borderRadius: 50,
    paddingLeft: 15,
    marginVertical: 10,
    flex: 1,
    marginHorizontal: 10,
    marginTop: 15,
  },
  searchBtn: {
    color: 'white',
    backgroundColor: '#3366FF',
    padding: 10,
    textAlign: 'center',
    height: 40,
    width: 180,
    borderRadius: 20,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 30,
    marginVertical: 10,
    marginHorizontal: 10,
    fontFamily: 'Prompt-Regular'
  },
  searchBtnLeft: {
    color: 'white',
    backgroundColor: '#3366FF',
    padding: 10,
    textAlign: 'center',
    height: 40,
    width: 180,
    borderRadius: 20,
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 30,
    marginVertical: 10,
    marginHorizontal: 10,
    fontFamily: 'Prompt-Regular'
  },
  searchBtnLeftandRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listHeader: {
    color: '#3366FF',
    fontSize: 18,
  },
  listItem: {
    color: 'cornflowerblue',
    fontSize: 15,
    marginTop: 5,
    marginBottom: 30,
  },
  footer: {
    height: 60,
    width: '100%',
    backgroundColor: '#3366FF',
    flexDirection: 'row',
  },
  //#endregion
  //#region pages/Login.js
  button: {
    color: '#FFFFFF',
    backgroundColor: '#3366FF',
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 10,
    width: 120,
  },
  inputUser: {
    borderColor: '#3366FF',
    borderWidth: 2,
    borderRadius: 15,
    width: 300,
    marginVertical: 10,
    paddingLeft: 25,
    fontSize: 20,
    fontFamily: 'Prompt-Regular'
  },
  //#endregion
  //#region pages/StudentProfile.js
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateStyle: {
    color: 'black',
    textAlign: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: 150,
    height: 50,
    textAlignVertical: 'center',
    fontFamily: 'Prompt-Regular'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  titleText: {
    fontFamily: 'Prompt-Bold',
    fontSize: 16,
    color: '#3366FF',
    marginBottom: 5,
    textAlign: 'left',
    marginLeft: 30,
    flex: 1,
  },
  dataText:{
    fontFamily: 'Prompt-Bold', 
    fontSize: 16,
    color: 'black', 
    flex: 1
  },
  modalButton: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: '#3366FF',
    borderColor: '#3366FF',
    borderWidth: 1,
    borderRadius: 5,
    width: 100,
    padding: 10,
    fontFamily: 'Prompt-Regular'
  },
  itemStyle: {
    marginVertical: 5,
  },
  //#endregion
});
