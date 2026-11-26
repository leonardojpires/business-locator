

export interface BusinessData {
    readonly id: number;
    readonly url: string;
    readonly name: string;
    readonly city: string;
    readonly department: string;
}

export class Business {
    readonly id: number;
    readonly url: string;
    readonly name: string;
    readonly city: string;
    readonly department: string;

    constructor(data: BusinessData) {
        this.id = data.id;
        this.url = data.url;
        this.name = data.name;
        this.city = data.city;
        this.department = data.department;  
    }
}