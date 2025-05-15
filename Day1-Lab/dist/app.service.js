"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    EMPLOYEES_DATA = [
        { id: 1, name: 'Omar', age: 18, salary: 5300 },
        { id: 2, name: 'Sara', age: 19, salary: 6100 },
        { id: 3, name: 'Mohamed', age: 21, salary: 7910 },
        { id: 4, name: 'Yara', age: 22, salary: 3200 },
        { id: 5, name: 'Nour', age: 25, salary: 9400 },
    ];
    getEmployees() {
        return this.EMPLOYEES_DATA;
    }
    getEmployeeById(id) {
        return this.EMPLOYEES_DATA.find((employee) => employee.id === id);
    }
    addEmployee(data) {
        const newId = this.EMPLOYEES_DATA.length + 1;
        const newEmployee = { ...data, id: newId };
        this.EMPLOYEES_DATA.push(newEmployee);
        return newEmployee;
    }
    updateEmployee(id, updateData) {
        const index = this.EMPLOYEES_DATA.findIndex(e => e.id === id);
        if (index !== -1) {
            const updatedEmployee = { ...this.EMPLOYEES_DATA[index], ...updateData };
            return updatedEmployee;
        }
        return null;
    }
    deleteEmployee(id) {
        const index = this.EMPLOYEES_DATA.findIndex(e => e.id === id);
        if (index !== -1) {
            return this.EMPLOYEES_DATA.splice(index, 1);
        }
        return null;
    }
    getHighestPaid() {
        if (this.EMPLOYEES_DATA.length === 0)
            return null;
        let highest = this.EMPLOYEES_DATA[0];
        for (const employee of this.EMPLOYEES_DATA) {
            if (employee.salary > highest.salary) {
                highest = employee;
            }
        }
        return highest;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map