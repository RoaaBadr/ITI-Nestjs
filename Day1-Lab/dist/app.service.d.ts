import { CreateEmployeeDto } from './dtos';
export declare class AppService {
    private EMPLOYEES_DATA;
    getEmployees(): {
        id: number;
        name: string;
        age: number;
        salary: number;
    }[];
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
    getHighestPaid(): {
        id: number;
        name: string;
        age: number;
        salary: number;
    } | null;
}
