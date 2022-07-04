import {Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {TestService} from "./test.service";


@Controller('tests')
export class TestController {


    constructor(private testService: TestService) {}

    @Delete('/remove/:id')
    remove(@Param("id") id:number){
         return this.testService.remove(id);
    }


    @Get('')
    exportExcel(){
        return this.testService.exportToExcel();
    }
    @Get('import')
    importExcel(){
        return this.testService.importToExcel();
    }
}
