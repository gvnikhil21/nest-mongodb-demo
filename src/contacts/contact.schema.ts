/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Contact {
    @Prop()
    @IsNotEmpty()
    @Length(3, 25)
    name: string;

    @Prop({ unique: true })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Prop({ unique: true })
    @IsNotEmpty()
    @IsPhoneNumber('IN')
    phone: string;

    @Prop()
    city: string;

    @Prop()
    state: string;

    @Prop()
    country: string;

}

export const ContactSchema = SchemaFactory.createForClass(Contact);