/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './contact.schema';

@Injectable()
export class ContactsService {

    constructor(@InjectModel('Contact') private ContactModel: Model<Contact>) { }

    addOneContact(contact: Contact) {
        const c = new this.ContactModel({ ...contact });
        c.save();
        return c;
    }

    getAllContacts(page: number, limit: number) {
        return this.ContactModel.find().limit(limit).skip((page - 1) * limit);
    }

    getContactById(id: string) {
        return this.ContactModel.findById(id);
    }

    updateContact(id: string, contact: Contact) {
        return this.ContactModel.updateOne({ _id: id }, contact);
    }

    deleteContact(id: string) {
        return this.ContactModel.deleteOne({ _id: id });
    }

    partialUpdateContact(id: string, props: any) {
        return this.ContactModel.updateOne({ _id: id }, { $set: props });
    }
}
