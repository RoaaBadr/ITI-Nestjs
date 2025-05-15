import { AppService } from "./app.service";
import { CreateEmployeeDto } from './dtos';
export declare class AppController {
    private service;
    constructor(service: AppService);
    getEmployees(): {
        id: number;
        name: string;
        age: number;
        salary: number;
    }[];
    getHighestPaid(): {
        id: number;
        name: string;
        age: number;
        salary: number;
    } | null;
    getEmployeeById(id: number): {
        id: number;
        name: string;
        age: number;
        salary: number;
    } | undefined;
    addEmployee(data: CreateEmployeeDto): {
        id: number;
        name: string;
        age: number;
        salary: number;
    };
    updateEmployee(id: number, updateData: CreateEmployeeDto): {
        name: string;
        age: number;
        salary: number;
        id: number;
    } | null;
    deleteEmployee(id: number): {
        id: number;
        name: string;
        age: number;
        salary: number;
    }[] | null;
}
