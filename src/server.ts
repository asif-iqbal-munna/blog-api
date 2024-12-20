import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function main() {
  try {
    await mongoose.connect(
      'mongodb+srv://munna:munna@cluster0.bauja.mongodb.net/blog-api?retryWrites=true&w=majority&appName=Cluster0' as string,
    );
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(`error: Not able to connect DB ${error}`);
  }
}

main().catch((err) => console.log(err));
