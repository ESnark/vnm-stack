import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { DashboardApiAppService } from '@vnm/domain';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [DashboardApiAppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to dashboard/api!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({
        message: 'Welcome to dashboard/api!',
      });
    });
  });
});
