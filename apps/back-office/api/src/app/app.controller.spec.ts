import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { BackOfficeApiAppService } from '@vnm/domain';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [BackOfficeApiAppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to back-office/api!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({
        message: 'Welcome to back-office/api!',
      });
    });
  });
});
