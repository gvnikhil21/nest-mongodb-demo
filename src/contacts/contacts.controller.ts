/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { BadRequestException, Controller, DefaultValuePipe, HttpException, HttpStatus, NotFoundException, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { Body, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, UsePipes } from '@nestjs/common/decorators';
import { Contact } from './contact.schema';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {

    constructor(private service: ContactsService) { }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    createContact(@Body() body: Contact) {
        return this.service.addOneContact(body);
    }

    @Get()
    getAll(@Query('_page', new DefaultValuePipe(1), ParseIntPipe) page: number, @Query('_limit', new DefaultValuePipe(10), ParseIntPipe) limit: number) {
        return this.service.getAllContacts(page, limit);
    }

    @Get('/:id')
    async getContactById(@Param('id') id: string) {
        const c = await this.service.getContactById(id);
        if (!c) {
            throw new NotFoundException();
        }
        return c;
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateContact(@Param('id') id: string, @Body() body: Contact) {
        try {
            await this.service.updateContact(id, body);
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteContact(@Param('id') id: string) {
        const ret = await this.service.deleteContact(id);
        if (ret.deletedCount === 0) {
            throw new NotFoundException();
        }
    }

    @Patch('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async partialUpdateContact(@Param('id') id: string, @Body() props) {
        try {
            await this.service.partialUpdateContact(id, props);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
