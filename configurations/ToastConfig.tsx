import { BaseToast, ErrorToast, InfoToast, ToastConfig } from "react-native-toast-message";

const myToastConfig : ToastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ 
        backgroundColor: "#0f0D23",
        borderLeftColor: 'green' ,

      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        color:"white",
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),

  error: (props : any) => (
    <ErrorToast
      {...props}
      style={{ 
        backgroundColor: "#0f0D23",
        borderLeftColor: 'red' ,

      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        color:"white",
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),

  info: (props : any) => (
    <InfoToast
      {...props}
      style={{ 
        backgroundColor: "#0f0D23",
        borderLeftColor: 'blue' ,

      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        color:"white",
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),

};

export default myToastConfig;