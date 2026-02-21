import { Schema } from "mongoose";
import mongoose from "mongoose";
import {model,models} from "mongoose";
interface IBusiness {
    ownerId:string ,
    businessName:string,
    supportEmail:string,
    knowledgeBase:string,
    
}

const businessSchema = new Schema<IBusiness>({
    ownerId:{type:String,
        required:true,
    unique:true},

    businessName:{type:String,
      },
    supportEmail:{type:String,
        },
    knowledgeBase:{type:String,
        },
  
}, {timestamps:true});

export const Business = mongoose.models.Business || mongoose.model<IBusiness>("Business",businessSchema);
export default Business;