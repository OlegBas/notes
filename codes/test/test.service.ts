import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "../posts/posts.model";
import {FilesService} from "../files/files.service";
import {Section} from "./section.model";
import {Category} from "./category.model";
import * as xlsx from 'xlsx';
import * as path from 'path';


@Injectable()
export class TestService {

    constructor(@InjectModel(Section) private sectionRepository: typeof Section,
    @InjectModel(Category) private categoryRepository: typeof Category) {}

    async remove(id:number){
        return await this.sectionRepository.destroy({
            where:{
                id
            }
        })
    }

     importToExcel(){
         const filePath = './excel-from-js.xlsx';
         const workbook = xlsx.readFile(filePath);
         const worksheet = workbook.Sheets[workbook.SheetNames[0]];

         let posts = [];
         let post = {
             released: undefined,
             author: undefined,
             title: undefined
         };

         for (let cell in worksheet) {
             const cellAsString = cell.toString();

             // @ts-ignore
             if (cellAsString[1] !== 'r' && cellAsString[1] !== 'm' && cellAsString[1] > 1) {
                 if (cellAsString[0] === 'A') {
                     post.title = worksheet[cell].v;
                 }
                 if (cellAsString[0] === 'B') {
                     post.author = worksheet[cell].v;
                 }
                 if (cellAsString[0] === 'C') {
                     post.released = worksheet[cell].v;
                     posts.push(post);
                     // @ts-ignore
                     post = {};
                 }
             }
         }
        return posts;
    }

    async exportToExcel(){
        const users = [
            {
                id: 0,
                name: 'Peter',
                age: 31
            },
            {
                id: 1,
                name: 'John',
                age: 23
            }
        ];

        const workSheetColumnName = [
            "ID",
            "Name",
            "Age"
        ]

        const workSheetName = 'Users';
        const filePath = './excel-from-js.xlsx';

        this.exportUsersToExcel(users, workSheetColumnName, workSheetName, filePath);
    }


    private exportExcel(data, workSheetColumnNames, workSheetName, filePath){
        const workBook = xlsx.utils.book_new();
        const workSheetData = [
            workSheetColumnNames,
            ... data
        ];
        const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
        xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
        xlsx.writeFile(workBook, path.resolve(filePath));
    }

    private exportUsersToExcel(users, workSheetColumnNames, workSheetName, filePath){
        const data = users.map(user => {
            return [user.id, user.name, user.age];
        });
        this.exportExcel(data, workSheetColumnNames, workSheetName, filePath);
    }
}
