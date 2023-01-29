/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:mongodb@cluster0.vf0jlbi.mongodb.net/phonebook?retryWrites=true&w=majority'),
    ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
