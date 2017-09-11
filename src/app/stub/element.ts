import { elementI } from '../interfaces/element';

export class element implements elementI{
    public id;
    public title;
    public color;
    public text;
    public sort;

    constructor(id, title, color, text, sort = 999999999){
        this.id = id;
        this.title = title;
        this.color = color;
        this.text = text;
        this.sort = sort;
    }
}