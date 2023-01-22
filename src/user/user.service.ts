import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserReviewDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async review(body: UserReviewDto) {
    const userReview = await this.prisma.userReview.findFirst({
      where: {
        userId: body.userId,
        componentId: body.componentId,
      },
    });

    if (userReview)
      throw new HttpException(
        'USER.ALREADY_HAS_REVIEWED',
        HttpStatus.FORBIDDEN,
      );

    if (body.star < 1 || body.star > 5)
      throw new HttpException('USER.BAD_STAR', HttpStatus.FORBIDDEN);

    try {
      return await this.prisma.userReview.create({
        data: {
          userId: body.userId,
          componentId: body.componentId,
          review: body.review,
          star: body.star,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
