import {Schema, Types, model, models} from 'mongoose';

const AdminUserSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  image: {type:String },
  role: {type: String, enum: ['admin', 'user', 'customer'], default: 'admin'},
});

export const AdminUser = models.AdminUser || model('AdminUser', AdminUserSchema);

// role: {type: String, enum: ['admin', 'manager', 'customer'], default: 'customer'},


