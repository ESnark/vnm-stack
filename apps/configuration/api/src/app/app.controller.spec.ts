import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { ConfigurationApiAppService } from '@vnm/domain';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ConfigurationApiAppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to configuration/api!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({
        message: 'Welcome to configuration/api!',
      });
    });
  });
});
