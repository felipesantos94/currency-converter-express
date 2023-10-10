import mongoose from 'mongoose';

export async function startMongo(host: string, username: string, password: string, port: string) {
  try {
    await mongoose.connect(`mongodb+srv://${username}:${password}@${host}`, { retryWrites: true, w: 'majority' });
    console.info(`Connected to mongoDB at port ${port} and host ${host}.`);

  } catch (error) {
    console.error('Unable to connect.', error);
    throw new Error(error);
  }
}