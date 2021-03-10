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
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'blue',
    marginTop: 20,
    marginBottom: 10,
  },
  //#endregion

  //#region pages/SearchCompany.js
  textInput: {
    height: 40,
  },
  ImageIconStyle: {
    fontSize: 20,
    color: 'gray',
  },
  inputIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 50,
    paddingLeft: 15,
    marginVertical: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  searchBtn: {
    color: 'white',
    backgroundColor: 'blue',
    padding: 10,
    textAlign: 'center',
    height: 40,
    width: 200,
    borderRadius: 20,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 30,
  },
  searchBtnLeft: {
    color: 'white',
    backgroundColor: 'blue',
    padding: 10,
    textAlign: 'center',
    height: 40,
    width: 200,
    borderRadius: 20,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 30,
  },
  searchBtnLeftandRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listHeader: {
    color: 'blue',
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
    backgroundColor: 'blue',
    flexDirection: 'row',
  },
  //#endregion

  //#region pages/Login.js
  button: {
    color: '#FFFFFF',
    backgroundColor: 'blue',
    padding: 10,
    textAlign: 'center',
    borderRadius: 20,
  },
  //#endregion

   //#region pages/StudentProfile.js
   centeredView: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
    width:0,
    height:2,
  },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation:5
  },
  dateStyle: {
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius:5,
    width:150,
    height:50,
    textAlignVertical:'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  titleText:{
    fontWeight: 'bold',
    fontSize: 16,
    color: 'blue',
    marginBottom:5,
    textAlign: 'left',
    marginLeft:30,
    flex: 1
  },
  modalButton:{
    color:'blue',
    textAlign:'center',
    marginTop:20,
    borderColor:'blue',
    borderWidth: 1,
    borderRadius:5,
    width:100,
    padding:10
  }
  //#endregion
});
