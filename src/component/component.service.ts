import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComponentService {
  constructor(private prisma: PrismaService) {}

  async getReviewsById(id: string) {
    return await this.prisma.userReview.findMany({
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
      where: {
        componentId: id,
      },
      select: {
        createdAt: true,
        review: true,
        star: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}
