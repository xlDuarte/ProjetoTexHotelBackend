// Import das funcs do models
import { getLogin} from "../models/loginModel.js";
  
// lista um usuario
export const showLogin = (req, res) => {
    const data = req.body
    getLogin(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}