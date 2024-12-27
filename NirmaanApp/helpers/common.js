//Snippet for dimension fetching ~Deb
import { Dimensions } from "react-native";

//get the window dimensions for ensuring proper rendering/responsiveness

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

//height percentage
export const hp = percentage =>{
    return (percentage*deviceHeight) / 100;
}

//width percentage
export const wp = percentage =>{
    return (percentage*deviceWidth) / 100;
}