/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete
} from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDto } from './dtos';

// handle incoming requests and return responses to the client
@ApiTags('Employees Endpoints')
@Controller('employees')
export class AppController {
  constructor(private service: AppService) { }

  @Get()
  getEmployees() {
    return this.service.getEmployees();
  }

  @Get('highest-salary')
  getHighestPaid(){
    return this.service.getHighestPaid();
  }  

  @Get(':id')
  getEmployeeById(@Param('id') id: number) {
    return this.service.getEmployeeById(Number(id));
  }

  @Post()
  addEmployee(@Body() data: CreateEmployeeDto) {
    return this.service.addEmployee(data);
  }

   @Put(':id')
  updateEmployee(@Param('id') id: number, @Body() updateData: CreateEmployeeDto) {
    return this.service.updateEmployee(Number(id), updateData);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id: number) {
    console.log(`${id} is deleted`)
    return this.service.deleteEmployee(Number(id));
  }
}
