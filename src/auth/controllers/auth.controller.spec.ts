import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from '../auth.service';
import { Test } from '@nestjs/testing';
import { BadgeService } from '../../badge/badge.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy';
import { StatisticsService } from '../../statistics/statistics.service';
import { VoteService } from '../../vote/vote.service';

describe('CatsController', () => {
  let prisma: PrismaService;
  let config: ConfigService;
  let badgeService: BadgeService;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          useFactory: async (config: ConfigService) => ({
            secret: config.get('jwt.secretOrKey'),
            expiresIn: config.get('jwt.expiresIn'),
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [
        AuthService,
        JwtStrategy,
        BadgeService,
        StatisticsService,
        VoteService,
        ConfigService,
        PrismaService,
      ],
      controllers: [AuthController],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);

    config = new ConfigService({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
    prisma = new PrismaService(config);
    badgeService = new BadgeService(prisma);
  });

  describe('AuthController', () => {
    it('should assign pioneer badge to new user on signup', async () => {
      //jest.spyOn(authService, 'signup').mockImplementation(() => result);

      const randNumber = Math.random() * 10000;

      const createUserDto = {
        name: `test${randNumber}`,
        email: `test${randNumber}@email.com`,
        password: 'test123!',
      };

      const newUser: any = await authService.signup(createUserDto);

      const pioneerBadge = await badgeService.getBadgeByName('Pioneer Badge');

      const userBadge = await badgeService.getUserBadge(
        newUser.id,
        pioneerBadge.id,
      );

      expect(userBadge).toBeTruthy();
    });

    it('should assign login to new user on signin', async () => {
      //jest.spyOn(authService, 'signup').mockImplementation(() => result);

      const randNumber = Math.random() * 10000;

      const createUserDto = {
        name: `test${randNumber}`,
        email: `test${randNumber}@email.com`,
        password: 'test123!',
      };

      const newUser: any = await authService.signup(createUserDto);

      const signInDto = {
        name: 'test',
        email: 'test@email.com',
        password: 'test123!',
      };

      await authService.signin(signInDto);

      const loginBadge = await badgeService.getBadgeByName('Login Badge');

      const userBadge = await badgeService.getUserBadge(
        newUser.id,
        loginBadge.id,
      );

      expect(userBadge).toBeTruthy();
    });
  });
});
