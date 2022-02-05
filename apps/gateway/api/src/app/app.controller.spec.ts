import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { GatewayApiAppService } from '@vnm/domain';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [GatewayApiAppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to gateway/api!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({
        message: 'Welcome to gateway/api!',
      });
    });
  });
});
