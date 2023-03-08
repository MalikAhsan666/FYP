import { StyleSheet, Dimensions } from 'react-native';
const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles=StyleSheet.create(
    {
        container: {
            flex: 1,
            marginTop:40
        },
        logos: {
            width: height_logo,
            height: height_logo,
            alignSelf:'center'
        },
        postStyle:{
            backgroundColor:'#87cefa',
            borderRadius:7,
            borderWidth:3,
            borderColor:'#87cefa',
            marginTop: 5
        },

        btn:{
            elevation: 10, backgroundColor: "#2196F3", borderRadius: 30, paddingVertical: 10, width: 100,
             alignContent:'center'
        },
        btnText:{
            textAlign:'center'
        },
        postText:{
            fontSize:14,
            fontWeight:'bold'
        },
        
        title: {
    
        },
        logo: {
            flex: 1,
            height: 120,
            width: 90,
            alignSelf: "center",
            margin: 30
        },
        input: {
            height: 48,
            borderRadius: 5,
            overflow: 'hidden',
            backgroundColor: 'white',
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 30,
            marginRight: 30,
            paddingLeft: 16
        },
        button: {
            backgroundColor: '#788eec',
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
            height: 48,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: 'center'
        },
        postsBtn:{
            backgroundColor: '#2196F3', width:150, justifyContent:'center', alignItems:'center', borderRadius:45, height:60
        },
        postsStyle:{
            elevation:2, borderBottomColor:'grey',flexDirection:'row', height:90
        },
        postHeading:{
            fontSize:22
        },
        card: {  
            backgroundColor: 'white',  
            borderRadius: 8,  
            paddingVertical: 45,  
            paddingHorizontal: 25,  
            width: '100%',  
            marginVertical: 10,  
          },
          elevation: {  
            shadowColor: '#52006A',  
            elevation: 20,  
          }, 
        postSubheading:{
            fontWeight:'bold',
            fontSize:15
        },  
        buttonTitle: {
            color: 'white',
            fontSize: 16,
            fontWeight: "bold"
        },
        footerView: {
            flex: 1,
            alignItems: "center",
            marginTop: 20
        },
        footerText: {
            fontSize: 16,
            color: '#2e2e2d'
        },
        footerLink: {
            color: "#788eec",
            fontWeight: "bold",
            fontSize: 16
        }
    }
)

export {styles};