/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dtos';

// used to handle business logic
@Injectable()
export class AppService {
  private EMPLOYEES_DATA = [
    { id: 1, name: 'Omar', age: 18, salary: 5300 },
    { id: 2, name: 'Sara', age: 19, salary: 6100 },
    { id: 3, name: 'Mohamed', age: 21, salary: 7910 },
    { id: 4, name: 'Yara', age: 22, salary: 3200 },
    { id: 5, name: 'Nour', age: 25, salary: 9400 },
  ];

  // 1. List employees
  getEmployees() {
    return this.EMPLOYEES_DATA;
  }

  // 2. Get employee by id
  getEmployeeById(id: number) {
    return this.EMPLOYEES_DATA.find((employee) => employee.id === id);
  }
  // 3. Add employee
  addEmployee(data: CreateEmployeeDto) {
    const newId = this.EMPLOYEES_DATA.length + 1;
    const newEmployee = { ...data, id: newId };
    this.EMPLOYEES_DATA.push(newEmployee);

    return newEmployee;
  }

  // 4. Update employee
  updateEmployee(id: number, updateData: CreateEmployeeDto) {
    const index = this.EMPLOYEES_DATA.findIndex(e => e.id === id);
    if (index !== -1) {
      const updatedEmployee = { ...this.EMPLOYEES_DATA[index], ...updateData };
      return updatedEmployee;
    }
    return null;
  }
  // 5. Delete employee 
  deleteEmployee(id: number) {
    const index = this.EMPLOYEES_DATA.findIndex(e => e.id === id);
    if (index !== -1) {
      return this.EMPLOYEES_DATA.splice(index, 1);
    }
    return null;
  }
  // 6. Get highest paid employee
  getHighestPaid() {
    if (this.EMPLOYEES_DATA.length === 0) return null;

    let highest = this.EMPLOYEES_DATA[0];
    for (const employee of this.EMPLOYEES_DATA) {
      if (employee.salary > highest.salary) {
        highest = employee;
      }
    }
    return highest;
  }
}
