import axios from "axios";
import config from "../config";

class NumberRepository {
    public async getMagicFor(num){
        const res = await axios.get(`${config.urls.NUMBER_API}/${num}`)
        return res.data;
    } 
}


export default new NumberRepository();