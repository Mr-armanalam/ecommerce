import {Schema, model, models} from 'mongoose';

const AdminUserSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  image: {type:String },
  totalRevenue: {type: Number, default: 0 },
  role: {type: String, enum: ['admin', 'user'], default: 'admin'},
});

export const AdminUser = models.AdminUser || model('AdminUser', AdminUserSchema);

