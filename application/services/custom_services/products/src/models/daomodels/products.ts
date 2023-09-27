
import * as mongoose from 'mongoose';
import { Ienum } from '../entitymodels/ticket';

const Schema = mongoose.Schema;

export const productsSchema = new Schema({
   created_date: { type: Date, default: Date.now },
   created_by: { type: String },
   last_modified_by: { type: String },
   last_modified_date: { type: Date, default: Date.now },
   name: { type: String },
   modules: { type: Schema.Types.String, ref: 'modules' },
   ienum: { type: String, enum: Ienum }
})

const productsModel = mongoose.model('products', productsSchema, 'products');
export default productsModel;
