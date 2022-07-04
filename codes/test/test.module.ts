import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Category} from "./category.model";
import {Section} from "./section.model";

@Module({
  providers: [TestService],
  controllers: [TestController],
  imports:[
    SequelizeModule.forFeature([Category, Section])
  ],
  exports:[
      TestService
  ]
})
export class TestModule {}
