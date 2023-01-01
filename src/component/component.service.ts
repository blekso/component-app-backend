import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComponentService {
  constructor(private prisma: PrismaService) {}

  async getReviewsById(id: number) {
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
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}